**Versão atualizada do relatório**

<h3> **Descrição prévia da Arquitetura da solução atualizada** </h3>

Para explicar o fluxo desta arquitetura devemos primeiro compreender que componentes fazem parte dela. 

- Um Deployment Kubernetes que possui 2 replicas/pods da API 

- Um deployment Kubernetes que possui 2 réplicas/pods da WEB App. 

- Cada deployment possui um serviço NodePort para expor o pod api e o pod web App para fora do cluster e para que os pedidos cheguem aos respectivos deployments/pods pelas suas respectivas nodeports. Funciona como um load balancer, não utilizamos serviço do tipo load balancer devido ao facto de que o Kubernetes para serviços do tipo load balancer trabalha apenas com provedores externos como ( aws, GCE). Tentamos minimizar a quantidade de provideres a serem utilizados para reduzir a carga de trabalho e o custo de ler várias documentações. 

- Um Reverse Proxy da Nginx que suporta os ficheiros estáticos do web site, e que encaminha os pedidos do client  para o Backend, utilizando a nodePort do backend. 

- Bases de dados provenientes do serviço RDS da aws do tipo postgresql, dentro da aws configuramos a base de estados para sua replicação no estado read and write. Configuramos também a base de dados para que ela permita o acesso a uma rede específica que é a rede 192.168.64.6 (rede do cluster), após isso ela está disponível para ser manuseada através do Pg admin bastando apenas colocar credenciais e host fornecidos pela Amazon. Portanto as bases de dados se encontram fora do cluster Kubernetes. 

Agora explicando o fluxo actual da nossa aplicação até ao momento. 

1 - O Web site tem os ficheiros estáticos em um reverse Proxy nginx. Portanto quando o cliente acede a aplicação o reverse Proxy está autorizado a permitir o acesso aos ficheiros estáticos apenas por via da rede do cluster acompanhada pela nodeport do pod da web app dentro do cluster que permite a conexão com o Proxy, para que o site possa ser acedido pelos clientes. 

2 - Quando o cliente faz o request( login ou registro), este request passa pelo reverse Proxy que o encaminha para o nodePort do Pod da API(backend). 

3 - Em seguida o Pod da api, encaminha o pedido para base de dados da Aws, utilizando as credencias de segurança configuradas na aws para o acesso da rede 192.168.64.6. 

4 - A base de dados principal recebe o pedido e o actualiza imediatamente para a base de dados replica. Tendo as duas exatamente os mesmos dados em tempo real. Apenas a base de dados principal envia selects e inserts. E a base de dados replica envia selects e inserts apenas quando a principal está embaixo.

![image](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/da2a469b-487c-4c50-b5dc-9f569c4f71b0)



<h3>**Api de pagamento atualizado**</h3>

A Api de pagamento escolhida é o **Stripe**, vamos explicar sobre o Stripe:

O Stripe é um conjunto de APIs que permite aceitar pagamentos online e pessoalmente, enviar pagamentos, automatizar processos financeiros e aumentar a receita. Escolhemos porque possui várias ferramentas para desenvolvedores reduzindo o nosso tempo de desenvolvimento, pela fácil integração e por não ter nenhum custo para o uso da api, a Stripe apenas fica com uma comissão de todas as compras e transações que são feitas através dos seus serviços. 

Integramos com a nossa web app usando a documentação e as APIs intuitivas da ferramenta Stripe Checkout, um formulário de pagamento pré-construído e otimizado que permite que os comerciantes aceitem pagamentos on-line com facilidade e segurança. Ele suporta mais de 40 métodos de pagamento, nós incorporamos o Checkout para direcionar os clientes para uma página de pagamento hospedada no Stripe. É possível personalizar o Checkout e acessar funcionalidades adicionais com a API da Sessão de Checkout e o Dashboard Stripe.

Ou seja acontece da seguinte forma: 
1.Quando os clientes estão prontos para concluir sua compra, seu aplicativo cria uma nova Sessão de Checkout.

2.A Sessão de Checkout fornece um URL que redireciona os clientes para uma página de pagamento hospedada no Stripe.

3.Os clientes inserem seus detalhes de pagamento na página de pagamento e concluem a transação.

4.Após a transação, se for concluída com sucesso volta para o nosso site na página compra concluída com sucesso 
E se não for concluída com sucesso volta para a página do carrinho

![Captura de Ecrã (158)](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/e10f33c8-aaf9-4940-90c4-978672b69631)
Créditos da foto: Stripe

Cada chamada para uma API do Stripe deve incluir uma chave secreta da API. Depois de criar uma conta do Stripe, geram dois pares de chaves de API para nós — uma chave do lado do cliente publicável e uma chave secreta do lado do servidor — para os modos de teste e ao vivo. Para começar a movimentar dinheiro real com suas chaves de modo ao vivo, você precisa ativar sua conta.


<h3> **Definição final dos guiões** </h3>

1º Caso: Utilizador registado:

1. O cliente vai para a aba de pesquisa e procura pelo produto;
2. Clicando no produto aparecem-lhe as lojas mais próximas;
3. O cliente escolhe a loja pelo preço ou pela distância;
4. Adiciona produtos ao carrinho;
5. Encomenda o produto preenchendo com seus dados (endereço, número de telefone, etc.);
6. Prossegue para o pagamento utilizando a API de pagamentos;
7. Finaliza a compra e verifica se recebeu uma confirmação.

2º Caso: Utilizador não registado:

1. Abre a aplicação.
2. Visualize a lista de lojas disponíveis e seus endereços.
3. Vai até uma loja
4. Faz a compra pessoalmente

3º Caso: Utilizador com utilização de botão IoT:

1. Adiciona automaticamente produtos ao carrinho através do botão IoT.
2. Navega para a página do carrinho.
3. Verifica se os produtos pré-definidos foram adicionados corretamente ao carrinho.
4. Prossigue para o pagamento utilizando a API de pagamentos.
5. Finaliza a compra e verifique se recebeu uma confirmação.

<h3> **Definição final das personas** </h3>

1.	Utilizador ocasional:
o	Nome: Juliana Mendez
o	Idade: 40 anos
o	Profissão: Engenheira Civil
o	Objetivo: Procura uma aplicação que facilite a compra de ingredientes para fazer pratos típicos angolanos sem precisar de visitar várias lojas físicas.

2.	Utilizador frequente:
o	Nome: Weza Ferreira
o	Idade: 25 anos
o	Profissão: Estudante de gastronomia
o	Objetivo: Gosta de cozinhar pratos típicos angolanos e procura uma aplicação que facilite a compra dos ingredientes necessários de forma rápida e prática.

3.	Lojista:
o	Nome: João Pereira
o	Idade: 40 anos
o	Profissão: Empresário
o	Objetivo: Deseja vender produtos para ganhar algum dinheiro extra e aumentar a visibilidade da sua loja e atrair mais clientes interessados em produtos para confecção de pratos típicos angolanos.

<h3> **Diagrama de dominio** </h3>
![WhatsApp Image 2023-11-19 at 23 54 56](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/509bf055-afc1-4d10-bda8-89efee61c524)


<h3> **Primeira versão da documentação da API REST** </h3>

DOCUMENTAÇÃO REST API VERSÃO 1

<h4> **1 - Recurso Produtos (os métodos do recurso “Produtos”, engloba os Produtos disponíveis. 
(nome, imagem, descrição, etc. ))** </h4>

Objetivo: Exibir todos os Produtos

Descrição: Devolve uma lista de todos os Produtos listados. 

URL: /api/produtos?search (GET – Produtos)

Dados:

Resultado: 
[
 {
 "id": 1,
 "name": "Moamba 250g",
 "imgUrl": "imagens/moamba_16_11zon.png",
 "descricao": "Ginguba/Amendoim torrada moída",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 2,
 "name": "Fuba de bombó 3kg",
 "imgUrl": "imagens/FubaDeBombo.png",
 "descricao": "Farinha de mandioca, 1Kg",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 3,
 "name": "Oleo de palma 1L",
 "imgUrl": "imagens/OleoDePalma.png",
 "descricao": "Azeite de dendê, 1L",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 4,
 "name": "Farinha musseque 1kg",
 "imgUrl": "imagens/FarinhaMusseque.png",
 "descricao": "Farinha de mandioca torrada",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 5,
 "name": "Mucua 2kg",
 "imgUrl": "imagens/mukua_15_11zon.png",
 "descricao": "Fruto do embondeiro",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 6,
 "name": "Muteta 300g",
 "imgUrl": "imagens/muteta_14_11zon.png",
 "descricao": "Semente de abobora moída",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 7,
 "name": "Bagre fumado 1kg",
 "imgUrl": "imagens/bagreFumado_13_11zon.png",
 "descricao": "Bagre seco defumado",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 8,
 "name": "Carne seca 1kg",
 "imgUrl": "imagens/carneSeca_12_11zon.png",
 "descricao": "Carne de vaca com gordura seca",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 9,
 "name": "Gimboa 500g",
 "imgUrl": "imagens/gimboa_11_11zon.png",
 "descricao": " Folha da gimboa",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 10,
 "name": "Kizaca 3kg",
 "imgUrl": "imagens/kizacaMonte.png",
 "descricao": "Folha de mandioca triturada",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 11,
 "name": "Rama de batata 400g",
 "imgUrl": "imagens/ramaDeBatata_10_11zon.png",
 "descricao": "Folha da batata doce",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 12,
 "name": "Fuba de milho 3kg",
 "imgUrl": "imagens/FubaDeMilho.png",
 "descricao": "Farinha de milho",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 13,
 "name": "Banana pão 1kg",
 "imgUrl": "imagens/bananaPao_9_11zon.png",
 "descricao": "Variedade de banana de cerca 30cm",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 14,
 "name": "Catato 500g",
 "imgUrl": "imagens/catato.png.jpg",
 "descricao": "Largata que vive no topo das palmeiras",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 15,
 "name": "Dendem 500g",
 "imgUrl": "imagens/Dendem.png",
 "descricao": "Fruto do dendezeiro",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 16,
 "name": "Ginguba 1kg",
 "imgUrl": "imagens/ginguba_8_11zon.png",
 "descricao": "Ginguba/Amendoim ",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 17,
 "name": "Paracuca 500g",
 "imgUrl": "imagens/paracuca_7_11zon.png",
 "descricao": "Ginguba/Amendoim torrado enrolado em açucar",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 18,
 "name": "Sape-Sape 1kg",
 "imgUrl": "imagens/SapeSape_6_11zon.png",
 "descricao": "Fruto que pertence a familia das anonáceas",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 19,
 "name": "Carambola 1kg",
 "imgUrl": "imagens/carambola_5_11zon.png",
 "descricao": "Fruto da caramboleira",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 20,
 "name": "Tamarindo 400g",
 "imgUrl": "imagens/moamba_16_11zon.png",
 "descricao": "Fruto da tamarineira",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 21,
 "name": "Maboque 1kg",
 "imgUrl": "imagens/moamba_16_11zon.png",
 "descricao": "Fruto do maboqueiro",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 22,
 "name": "Loengo 1kg",
 "imgUrl": "imagens/moamba_16_11zon.png",
 "descricao": "Fruto roxo proximo ao preto",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 23,
 "name": "Cana de Açucar 2kg",
 "imgUrl": "imagens/CanaDeAcucar.png",
 "descricao": "Fruto roxo proximo ao preto",
 "preco": null,
 "quantidade": null
 },
 {
 "id": 24,
 "name": "Ginguba 1kg",
 "imgUrl": "imagens/ginguba_8_11zon.png",
 "descricao": "Fruto roxo proximo ao preto",
 "preco": null,
 "quantidade": null
 }
]


**Objetivo: Listar todas as lojas disponíveis** 

Descrição: Devolver todas as lojas apresentadas no website. 

URL: /api/lojas (GET – Lojas)

Dados: 

Resultado:
[
 {
 "id": 1,
 "nome": "Tudo Aqui",
 "email": "tudo_aqui@gmail.com",
 "endereco": "Lisboa Rua da cascalheira",
 "contacto": "935678932",
 "cpostal": "1300-122 ",
 "img_url": "imagens/loja.png",
 "products": []
 },
 {
 "id": 2,
 "nome": "Angolan Foods",
 "email": "angolan_foods@gmail.com",
 "endereco": "Lisboa Rua 10",
 "contacto": "933458960",
 "cpostal": "1300-174 ",
 "img_url": "imagens/loja.png",
 "products": []
 },
 {
 "id": 3,
 "nome": "Cozinha Angolana",
 "email": "cozinha_angolana@gmail.com",
 "endereco": "Lisboa Travessa da Ajuda",
 "contacto": "933332109",
 "cpostal": "1300-021 ",
 "img_url": "imagens/loja.png",
 "products": []
 },
 {
 "id": 4,
 "nome": "Sabores da Banda",
 "email": "sabores_da_banda@gmail.com",
 "endereco": "Queluz Avenida 1º de Maio",
 "contacto": "965300594",
 "cpostal": "2745-832 ",
 "img_url": "imagens/loja.png",
 "products": []
 },
 {
 "id": 5,
 "nome": "Comida do Mangope",
 "email": "comida_do_mangope@gmail.com",
 "endereco": "Lisboa Travessa Henrique Cardoso",
 "contacto": "963617504",
 "cpostal": "1700-227 ",
 "img_url": "imagens/loja.png",
 "products": []
 },
 {
 "id": 6,
 "nome": "Angolana",
 "email": "angolana@gmail.com",
 "endereco": "Rua João do Nascimento Costa",
 "contacto": "963617504",
 "cpostal": "1900-269 ",
 "img_url": "imagens/loja.png",
 "products": []
 }
]


**Objetivo: Obter um determinado produto ao pesquisar** 

Descrição: Obter o nome do produto, descrição, imagem de um produto após a pesquisa 
por nome. 

URL: /api/produtos?search={place product name} (GET – Produto)

Parâmetros: id - Devolve as informações de um produto selecionado através do nome. 

Dados:

Resultado, com o product “moamba”:
[
 {
 "id": 1,
 "name": "Moamba 250g",
 "imgUrl": "imagens/moamba_16_11zon.png",
 "descricao": "Ginguba/Amendoim torrada moída",
 "preco": null,
 "quantidade": null
 }
]


**Objetivo: Apresentar as lojas em que um produto está disponível.** 

Descrição: Obter as lojas em que um determinado produto esta disponível, a sua 
localização, nome, endereço da loja, código postal. Assim como nome do produto, 
descrição de um produto, imagem de um produto, preço e quantidade em loja.

URL: /api/lojas/prod/2 (GET – Produto/Loja)

Parâmetros: name - Devolve as informações de um produto selecionado através do 
nome. 

Resultado, com o produto “Fuba de Bombó 3kg”: 
[
 {
"loja_id": 2,
"loja_nome": "Angolan Foods"
"loja_telefone": "933458960"
"loja_endereco": "Lisboa Rua 10",
"loja_cpostal": "1300-174 ",
"loja_img_url": "imagens/loja.png"
"loja_localizacao" : "0101000020E6100000C6617A0CA05522C0067D8E345D5D4340"
"prod_id": 2,
"prod_nome": "Fuba de bombó 3kg",
"descricao": "Farinha de mandioca, 1Kg",
"produto_img_url": "https://i.imgur.com/kRldh91.png",
"prod_preco" : 8.5,
"prod_quantidade": 20
]


**Objetivo: Autenticação do usuário** 

Descrição: Autenticar um determinado usuário. 

URL: /api/users/auth (POST – LOGIN). 

Parâmetros: 

{
 "username": "seu_nome_de_usuário",
 "password": "sua_senha"
}

Exemplo de requisição: 
'{"username": "seu_nome_de_usuário", "password": "sua_senha"}'


**Objetivo: Registar o usuário** 

Descrição: Regista um novo usuário na plataforma.

URL: /api/users/ (POST-REGISTO)

Exemplo de requisição: {
 "email": "seu_email",
 "password": "sua_password",
 "username": "seu_nome_de_usuário",
 "location": "localização_em_que_se_encontra"
}


**Objetivo: Abrir a páginade pagamento stripe.** 

Descrição: Abrir a página de pagamento stripe para que o usuário possa finalizar a sua 
compra.

URL: /api/stripe/create-checkout-session (POST - CHECK_OUT)

Resultado Stripe:

![Imagem_PNG](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/0f5f28d6-e8de-42ae-a751-1d4ca8bb9877)


<h3> **Um esboço da estrutura dos dados** </h3>

![WhatsApp Image 2023-11-19 at 16 59 40](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/f88e0e1d-39d4-4ff9-9dfa-a10449183208)

<h3> **Outros artefactos a definir pela UC de Engenharia de Software, de acordo com o projeto** </h3>

UML 

![UML3-2](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/f0c7ef6a-f2cd-41a8-b637-bea1f8fa716f)








