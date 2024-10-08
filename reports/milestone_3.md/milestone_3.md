**Versão atualizada do relatório (documento único para todas as unidades curriculares)**

<h3> **Versão atualizada dos casos de utilização** </h3>

1º Caso: Utilizador registado:

1. O cliente vai para a aba de pesquisa e procura pelo produto;
2. Clicando no produto aparecem-lhe as lojas mais próximas;
3. O cliente escolhe a loja pelo preço ou pela distância;
4. Adiciona produtos ao carrinho;
5. Vai para a aba carrinho e faz o checkout;
6. Prossegue para o pagamento utilizando a API de pagamentos Stripe;
7. Finaliza a compra e recebe uma confirmação no nosso site.

2º Caso: Utilizador não registado:

1. Abre a aplicação.
2. Visualize a lista de lojas disponíveis e seus endereços.
3. Vai até uma loja
4. Faz a compra pessoalmente

3º Caso: Utilizador com utilização de botão IoT:

1. Adiciona automaticamente produtos ao carrinho através do botão IoT.
2. Navega para a página do carrinho.
3. Verifica se os produtos pré-definidos foram adicionados corretamente ao carrinho.
4. Prossegue para o pagamento utilizando a API de pagamentos.
5. Finaliza a compra e verifique se recebeu uma confirmação.

<h3> **Versão atualizada de todos os diagramas relevantes para o projeto, de acordo com a indicação da UC de Engenharia de Software** </h3>

UML 

![UML3-2](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/f0c7ef6a-f2cd-41a8-b637-bea1f8fa716f)

Diagrama de domínio

![image](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/62691b8a-febe-4577-b301-11da7a46a952)

Um esboço da estrutura dos dados

![WhatsApp Image 2023-11-19 at 16 59 40](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/f88e0e1d-39d4-4ff9-9dfa-a10449183208)

<h3> **Versão atualizada da documentação da API REST** </h3>

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


**Objetivo: Abrir a páginade pagamento stripe. ** 

Descrição: Abrir a página de pagamento stripe para que o usuário possa finalizar a sua 
compra.

URL: /api/stripe/create-checkout-session (POST - CHECK_OUT)

Resultado Stripe:

![Imagem_PNG](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/0f5f28d6-e8de-42ae-a751-1d4ca8bb9877)

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

![image](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/faf066de-b4d1-4e84-9cdc-a2d916c032d0)


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

<h3>**Manual do utilizador**</h3>

Bem-vindo ao "Mambos da Banda"! O seu destino para encontrar todos os ingredientes necessários para preparar pratos típicos angolanos de forma rápida e conveniente. Este manual irá guiá-lo através do processo de utilização da nossa aplicação web. Certifique-se de seguir cada passo para uma experiência sem complicações.

**1. Registo: Utilizador Registado**

Se já possui uma conta, inicie sessão no Mambos da Banda. Se não tiver uma conta, registe-se com o seu e-mail.

**2. Pesquisa de Produtos:**

1. Clique na aba de pesquisa localizada na barra de navegação.
2. Insira o nome do produto que deseja encontrar na barra de pesquisa.
3. Ao clicar no produto desejado, será apresentada uma lista de lojas que oferecem esse produto.

**3. Escolha da Loja:**

1. Veja a lista de lojas disponíveis com mapas onde se encontram localizadas e as informações sobre preços, quantidades e distâncias.
2. Escolha a loja com base no preço ou na proximidade.


**4. Adicionar ao Carrinho:**

1. Selecione a quantidade desejada do produto.
2. Adicione o produto ao carrinho.
3. Repita o processo para outros produtos, se necessário.

**5. Checkout:**

1. Vá para a aba "Carrinho" quando estiver pronto para finalizar a compra.
2. Verifique os itens no seu carrinho.
3. Clique em "Proceed to Checkout" para iniciar o processo de pagamento.

**6. Pagamento:**

1. Será redirecionado para a página de pagamento, hospedada pela API de pagamentos Stripe.
2. Preencha os seus dados como e-mail, detalhes bancários e nome do titular.
3. Clique em "Pagar" para concluir a transação.

**7. Confirmação e Regresso ao Site:**

1. Após um pagamento bem-sucedido, será redirecionado de volta ao Mambos da Banda.
2. O site confirmará que a transação foi concluída com sucesso.
3. Um botão permitirá que você retorne à página inicial para explorar mais ou fazer novas compras.

Agora, você está pronto para começar a sua jornada culinária com o Mambos da Banda! Se tiver alguma dúvida ou encontrar algum problema, entre em contacto com o nosso suporte. Agradecemos por escolher a nossa aplicação para as suas necessidades culinárias. Bom apetite!

<h3>**Descrição das componentes de segurança implementadas e/ou planeadas**</h3>

+ Palavras passe criptografadas
  
A autenticação por meio de palavras-passe é uma das formas mais comuns de garantir a identidade dos utilizadores no nosso website. No entanto, a simples escolha de palavras-passe complexas não é suficiente. A criptografia desempenha um papel crucial na proteção dessas informações confidenciais, garantindo que, mesmo se um conjunto de credenciais seja comprometido, os dados permaneçam inacessíveis para invasores. 

O uso de palavras passe criptografadas permite-nos: 

Resistir a ataques de força bruta e ataques de dicionário: Tornam quase impossível para os atacantes realizar ataques de força bruta em que são feitas inúmeras tentativas de descobrir a palavra passe e o uso de algoritmos de hashing é eficaz em proteger contra ataques baseados em dicionário. 

Confidencialidade dos dados do utilizador: Garantimos que mesmo em caso de comprometimento da base de dados, os dados continuam confidencias, visto que as palavras-passe permanecem irreversíveis sem os hashes correspondentes. 

+ Certificado SSL 

Secure Sockets Layer, um tipo de segurança digital que permite a comunicação criptografada entre um domínio de site e um browser. O HTTPS é uma extensão segura do HTTP. Os sites que configurarem um certificado SSL/TLS podem utilizar o protocolo HTTPS para estabelecer uma comunicação segura com o servidor. Tem como objetivo tornar segura a transmissão de informações sensíveis como dados pessoais, de pagamento ou de login e garantir que apenas a pessoa ou instituição para quem os dados estão a ser transmitidos possa ter acesso a informações. Torna mais difícil a interceptação de dados por atacantes.  

Benefícios: 
Quando é preciso autenticação: Permite que se comprove a identidade do servidor para que os utilizadores saibam que é autêntico. 

Garantir confiabilidade: É importante criar um senso de segurança para que as pessoas se sintam confortáveis em fornecer seus dados. Um certificado SSL/TLS é uma maneira visível de dizer aos utilizadores que os seus dados vão estar seguros. 

O SSL/TLS funciona através de chaves públicas e privadas, além de chaves de sessão para cada conexão segura. Quando o visitante coloca uma URL com SSL no browser e navega pela página segura, o browser e o servidor fazem uma conexão. 

Durante a conexão inicial as chaves públicas e privadas são utilizadas para criar uma chave de sessão, que então é utilizada para cifrar e decifrar os dados sendo transferidos. Essa chave de sessão vai se manter válida por tempo limitado e só vai ser utilizada para essa sessão específica. 

+ Monitoramento de logs 

O monitoramento de logs seria uma mais valia para o nosso website para garantir a segurança, integridade e eficiência operacional. Ao capturar e analisar registos detalhados de atividades, ganhamos insights valiosos que vão além de simplesmente diagnosticar problemas. Proporcionam uma visão abrangente do ambiente e fortalecem as defesas contra potenciais ameaças cibernéticas. 

Identificação precoce de anomalias e Resposta Rápida a Incidentes: capacita a identificação de padrões e comportamentos anômalos, o que possibilita uma resposta proativa a atividades suspeitas antes que se tornem problemas sérios. E ao analisar logs em tempo real, ganhamos a capacidade de responder rapidamente a incidentes de segurança, mitigando potenciais danos e reduzindo o tempo de exposição a ameaças. 

Identificação de Atividades Maliciosas: Analisando logs, podemos detectar atividades maliciosas, como tentativas de acesso não autorizado, invasões potenciais ou comportamentos suspeitos que indiquem ameaças à segurança.  

Tomada de Decisão Informada: Informações detalhadas presentes nos logs embasam decisões de segurança e operacionais, permitindo uma tomada de decisão informada e estratégica.

+ O uso do caractere $ em consultas SQL

O uso do caractere $ em consultas SQL, como em $1 ou $2, geralmente está associado ao conceito de parâmetros de consulta parametrizados ou preparados. Isso é especialmente comum em ambientes que suportam consultas parametrizadas, como muitas linguagens de programação ao interagir com bancos de dados.
Usamos parâmetros para tornar a instrução segura contra injeção de SQL, pois os valores são passados como parâmetros e não diretamente incorporados na instrução SQL.

A importância de usar parâmetros, como $1 e $2, está relacionada à segurança e à prevenção contra injeção de SQL. Quando você utiliza parâmetros, os valores fornecidos como entrada (por exemplo, de usuários) são tratados de maneira segura, evitando a possibilidade de ataques de injeção de SQL.
Em resumo, o uso de $1 e $2 indica placeholders para parâmetros e contribui para a segurança

+ Nginx no kubernetes como firewall 

Para além de Load Balancer para distribuir a carga e evitar sobrecarga de servidores, melhorar a escalabilidade e disponibilidade. Também gostaríamos de configurá-lo para atuar como um Web Application Firewall que atua como uma barreira de defesa robusta, implementando medidas de segurança avançadas ao limitar o tráfego e bloquear solicitações indesejadas. Pode filtrar solicitações com base no IP, cabeçalhos ou padrões específicos, o que pode ajudar a impedir o acesso não autorizado e proteger o aplicativo de ataques. 

Ao implementar o Nginx como firewall no cluster Kubernetes, é criada uma barreira contra ameaças cibernéticas, o que garante a segurança e a integridade do website. Essa abordagem proativa é crucial para proteger dados sensíveis, preservar a confiança dos utilizadores e garantir a continuidade operacional. 


