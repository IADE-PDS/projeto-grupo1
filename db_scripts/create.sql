-- Create the database with the name: myproj
-- Then run the create table bellow

CREATE TABLE localizacoes (
	id SERIAL PRIMARY KEY,
	geom geography(Point, 4326),
 	created_at timestamp without time zone,
  	updated_at timestamp without time zone
);

create table appuser
(
	usr_id SERIAL not null,
	usr_name VARCHAR(60),       	--nome do user
	usr_email VARCHAR(30),  		--email do user
	usr_pass VARCHAR(80),     		--palavra passe do user 
	usr_telefone char(12),    		--telefone do cliente
	usr_token VARCHAR (200),
	localizacao int REFERENCES localizacoes(id) not null,
	primary key (usr_id)
);

create table shoplist (
    shl_id serial not null,
    shl_usr_id int REFERENCES appuser(usr_id) not null,
    shl_created date not null default CURRENT_DATE,
    shl_due date,
    primary key (shl_id));



create table produto
(
	prod_id Integer not null,
	prod_nome VARCHAR(60), 		 --nome do produto
	descricao character varying,  	 --descrição do produto 
	img_url character varying,
	primary key (prod_id)
);

create table loja
(
	loja_id Integer not null,
	loja_nome VARCHAR(60),			--nome da loja 
	loja_endereco VARCHAR(60),		--endereço da loja (cidade e rua)
	loja_cpostal char(9),	--código postal da loja 
	loja_telefone char(9),			--telefone da loja
	loja_pass CHAR(40),  
	loja_token VARCHAR (200),    --token da loja
	loja_email VARCHAR,
	img_url character varying,
    localizacao int REFERENCES localizacoes(id) not null,
	primary key (loja_id)
);


create table item (
    it_id serial,
    it_shl_id int REFERENCES shoplist(shl_id) not null,
    it_prd_id int REFERENCES produto(prod_id) not null,
	it_loja_id int REFERENCES loja(loja_id) not null,
	it_quant decimal(6,3),
    primary key (it_id));

create table lojaproduto
(
	loja_id_lp int not null, 		 --fk para loja
	prod_id_lp int not null, 	 --fk para produto
	prod_preco float not null,
	prod_quantidade int not null,
	primary key (loja_id_lp, prod_id_lp)
);


create table compra
(
	compra_id SERIAL not null, 
	compra_shl_id int REFERENCES shoplist(shl_id) not null,			--fk para shoplist
	compra_data date,					--data de compra
	primary key (compra_id)
);


-- Foreign Keys

alter table lojaproduto 
add constraint lojaproduto_fk_loja
foreign key (loja_id_lp) references loja(loja_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;

alter table lojaproduto
add constraint lojaproduto_fk_produto
foreign key (prod_id_lp) references produto(prod_id)
ON DELETE NO ACTION ON UPDATE NO ACTION;



