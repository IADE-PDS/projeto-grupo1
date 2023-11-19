async function register(gpslocation) {
    //alert("Entrei - registo");
    let msgDOM = document.getElementById("msg");
    msgDOM.textContent = "";
    try {
        let email = document.getElementById("email").value; 
        let name = document.getElementById("nome").value;
        let pass = document.getElementById("palavraPasse").value;


        
        //alert(gpslocation);
        let res = await requestRegister(email,name,pass, gpslocation);
        
    } catch (err) {
        console.log(err);
        msgDOM.textContent = "Ocorreu um erro ao criar a conta";   
    }
}


