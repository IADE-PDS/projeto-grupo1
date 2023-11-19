-- None at the moment,users must be created using the API because of the bcrypt

INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.1772067 38.7075539)'), now(), now());
INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.1672367 38.7294069)'), now(), now());
INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.1979492 38.7081112)'), now(), now());
INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.2770938 38.7540639)'), now(), now());
INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.1445531 38.7458185)'), now(), now());
INSERT INTO localizacoes (geom, created_at, updated_at) VALUES (ST_GeographyFromText('SRID=4326;POINT(-9.1274365 38.7364937)'), now(), now());


insert into produto (prod_id,prod_nome, descricao, img_url) values (1,'Moamba 250g', 'Ginguba/Amendoim torrada moída', 'https://i.imgur.com/16Rdnw0.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (2,'Fuba de bombó 3kg', 'Farinha de mandioca, 1Kg', 'https://i.imgur.com/kRldh9l.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (3,'Oleo de palma 1L', 'Azeite de dendê, 1L', 'https://i.imgur.com/g58gTBF.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (4,'Farinha musseque 1kg', 'Farinha de mandioca torrada', 'https://i.imgur.com/pLU8F1Y.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (5,'Mucua 2kg', 'Fruto do embondeiro', 'https://i.imgur.com/yDiWeUx.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (6,'Muteta 300g', 'Semente de abobora moída', 'https://i.imgur.com/Rnn552Z.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (7,'Bagre fumado 1kg', 'Bagre seco defumado', 'https://i.imgur.com/EOHSiX5.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (8,'Carne seca 1kg', 'Carne de vaca com gordura seca', 'https://i.imgur.com/DBUP0k9.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (9,'Gimboa 500g', ' Folha da gimboa', 'https://i.imgur.com/TqyxYp9.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (10,'Kizaca 3kg', 'Folha de mandioca triturada', 'https://i.imgur.com/Y8XOkE1.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (11,'Rama de batata 400g', 'Folha da batata doce', 'https://i.imgur.com/kBnQXLo.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (12,'Fuba de milho 3kg', 'Farinha de milho', 'https://i.imgur.com/OYCbywI.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (13,'Banana pão 1kg', 'Variedade de banana de cerca 30cm', 'https://i.imgur.com/OYCbywI.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (14,'Catato 500g', 'Largata que vive no topo das palmeiras', 'https://i.imgur.com/4PxuRnq.jpg');
insert into produto (prod_id,prod_nome, descricao, img_url) values (15,'Dendem 500g', 'Fruto do dendezeiro', 'https://i.imgur.com/P6GN4Jg.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (16,'Ginguba 1kg', 'Ginguba/Amendoim ', 'https://i.imgur.com/YojOFTY.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (17,'Paracuca 500g', 'Ginguba/Amendoim torrado enrolado em açucar', 'https://i.imgur.com/pTZxRpe.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (18,'Sape-Sape 1kg', 'Fruto que pertence a familia das anonáceas', 'https://i.imgur.com/n9Z9MI3.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (19,'Carambola 1kg', 'Fruto da caramboleira', 'https://i.imgur.com/aul8Eym.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (20,'Tamarindo 400g', 'Fruto da tamarineira', 'https://i.imgur.com/OgpKb40.jpg');
insert into produto (prod_id,prod_nome, descricao, img_url) values (21,'Maboque 1kg', 'Fruto do maboqueiro', 'https://i.imgur.com/jHDdlnP.jpg');
insert into produto (prod_id,prod_nome, descricao, img_url) values (22,'Loengo 1kg', 'Fruto roxo proximo ao preto', 'https://i.imgur.com/zCxcC6V.jpg');
insert into produto (prod_id,prod_nome, descricao, img_url) values (23,'Cana de Açucar 2kg', 'Fruto roxo proximo ao preto', 'https://i.imgur.com/YLVdYeu.png');
insert into produto (prod_id,prod_nome, descricao, img_url) values (24,'Ginguba 1kg', 'Fruto roxo proximo ao preto', 'https://i.imgur.com/aasiY0X.png');


								
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (1, 1, 'tudo_aqui@gmail.com', 'Tudo Aqui', '935678932', 'Lisboa Rua da cascalheira', '1300-122', 'imagens/loja.png');
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (2, 2, 'angolan_foods@gmail.com', 'Angolan Foods', '933458960', 'Lisboa Rua 10', '1300-174', 'imagens/loja.png');
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (3, 3, 'cozinha_angolana@gmail.com', 'Cozinha Angolana','933332109', 'Lisboa Travessa da Ajuda', '1300-021', 'imagens/loja.png');
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (4, 4, 'sabores_da_banda@gmail.com', 'Sabores da Banda','965300594', 'Queluz Avenida 1º de Maio', '2745-832', 'imagens/loja.png');
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (5, 5, 'comida_do_mangope@gmail.com', 'Comida do Mangope','963617504', 'Lisboa Travessa Henrique Cardoso', '1700-227', 'imagens/loja.png');
insert into loja (loja_id, localizacao, loja_email, loja_nome, loja_telefone, loja_endereco, loja_cpostal, img_url) values (6, 6, 'angolana@gmail.com', 'Angolana', '963617504', 'Rua João do Nascimento Costa', '1900-269', 'imagens/loja.png');


insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 1, 4.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 3, 2.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 24, 7.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 23, 4.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 22, 3.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 20, 2.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (1, 19, 4.5, 20);


insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 2, 8.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 3, 3.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 4, 6.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 5, 1.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 6, 1.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 7, 3.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 8, 7.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 9, 4.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 10, 5.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 11, 2.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 12, 8.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 13, 8.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 14, 9.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 15, 6.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 16, 8.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 17, 6.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 18, 2, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 19, 6, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 20, 9, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 21, 2.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 22, 5.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (2, 23, 7.5, 20);

insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 16, 10, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 17, 6, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 18, 4, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 19, 6, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 20, 9, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (3, 21, 2, 20);

insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (4, 12, 4, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (4, 13, 8, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (4, 14, 8, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (4, 15, 10, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (4, 16, 12, 20);

insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 2, 5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 3, 9, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 4, 7, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 5, 3, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 6, 3, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (5, 7, 12, 20);

insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 15, 4.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 16, 8.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 17, 3.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 18, 9.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 19, 4.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 20, 7.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 21, 3.5, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 22, 6, 20);
insert into lojaproduto (loja_id_lp, prod_id_lp, prod_preco, prod_quantidade) values (6, 24, 10, 20);