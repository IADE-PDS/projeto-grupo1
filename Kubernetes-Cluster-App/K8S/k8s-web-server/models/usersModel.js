const bcrypt = require('bcrypt');
const pool = require("../config/database");
const auth = require("../config/utils");
const saltRounds = 10; 

function dbUserToUser(dbUser)  {
    let user = new User();
    user.id = dbUser.usr_id;
    user.name = dbUser.usr_name;
    user.email= dbUser.usr_email;
    return user;
}

class User {
    constructor( id, name, pass, token, email, localizacao) {
        this.id = id;
        this.name = name;
        this.pass = pass;
        this.token = token;
        this.email = email;
        this.localizacao = localizacao;
    }
    export() {
        let user=new User();
        user.name = this.name;
        return user; 
    }


    static async getById(id) {
        try {
            let dbResult = await pool.query("Select * from appuser where usr_id=$1", [id]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length) 
                return { status: 404, result:{msg: "No user found for that id."} } ;
            let dbUser = dbUsers[0];
            return { status: 200, result: 
                dbUserToUser(dbUser)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async getByName(name) {
        try {
            let dbResult = await pool.query("Select * from appuser where usr_name=$1", [name]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length) 
                return { status: 404, result:{msg: "No user found for that name."} } ;
            let dbUser = dbUsers[0];
            return { status: 200, result: 
                dbUserToUser(dbUser)} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }  
    }

    static async register(user) {
        try {
            console.log(user);
            let dbResult =
                await pool.query("Select * from appuser where usr_email=$1 or usr_name=$2", [user.email, user.name]);
            let dbUsers = dbResult.rows;
            if (dbUsers.length)
                return {
                    status: 400, result: {
                        location: "body", param: "name",
                        msg: "That name already exists"
                    }
                };
            let encpass = await bcrypt.hash(user.pass,saltRounds);  
              
            const query_loc = `INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(`+user.localizacao+`)'), now(), now())`;
            dbResult = await pool.query(query_loc);
            dbResult = await pool.query("SELECT id FROM localizacoes WHERE id = (SELECT MAX(id) FROM localizacoes)");
            if(!dbResult.rows.length){
                return {
                    status: 400, result: {
                        msg: "Error inserting location."
                    }
                };
            }
            let location_id = parseInt(dbResult.rows[0].id);

            dbResult = await pool.query(`Insert into appuser (usr_name, usr_pass ,usr_email, localizacao) values ($1,$2,$3,$4)`, [user.name, encpass,user.email, location_id]);
            return { status: 200, result: {msg:"Registered! You can now log in."}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }


 

    static async checkLogin(user) {
        try {
            let dbResult =
                await pool.query("Select * from appuser where usr_email=$1", [user.name]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 401, result: { msg: "Wrong username or password!"}};
            let dbUser = dbUsers[0]; 
            let isPass = await bcrypt.compare(user.pass, dbUser.usr_pass);
            //let isPass = bcrypt.compare(user.pass, hash);

            if (!isPass) 
                return { status: 401, result: { msg: "Wrong username or password!"}};
            return { status: 200, result: dbUserToUser(dbUser) } ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    // No verifications. Only to use internally
    static async saveToken(user) {
        try {
            let dbResult =
                await pool.query(`Update appuser set usr_token=$1 where usr_id = $2`,
                [user.token,user.id]);
            return { status: 200, result: {msg:"Token saved!"}} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }

    static async getUserByToken(token) {
        try {
            let dbResult =
                await pool.query(`Select * from appuser where usr_token = $1`,[token]);
            let dbUsers = dbResult.rows;
            if (!dbUsers.length)
                return { status: 403, result: {msg:"Invalid authentication!"}} ;
            let user = dbUserToUser(dbUsers[0]);
            return { status: 200, result: user} ;
        } catch (err) {
            console.log(err);
            return { status: 500, result: err };
        }
    }
}

module.exports = User;