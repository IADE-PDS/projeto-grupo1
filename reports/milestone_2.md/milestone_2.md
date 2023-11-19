**Versão atualizada do relatório**

<h3> **Descrição prévia da Arquitetura da solução atualizada** </h3>

Para explicar o fluxo desta arquitetura devemos primeiro compreender que componentes fazem parte dela. 

- Um Deployment Kubernetes que possui 2 replicas/pods da API 

- Um deployment Kubernetes que possui 2 réplicas/pods da WEB App. 

- Cada deployment possui um serviço NodePort para expor o pod api e o pod web App para fora do cluster e para que os pedidos cheguem aos respectivos deployments/pods pelas suas respectivas nodeports. Funciona como um load balancer, não utilizamos serviço do tipo load balancer devido ao facto de que o Kubernetes para serviços do tipo load balancer trabalhar apenas com provedores externos com ( aws, GCE). Tentamos minimizar a quantidade de provideres a serem utilizados para reduzir a carga de trabalho e o custo de ler várias documentações. 

- Um Ingress controller sa nginx que será para redirecionar os tráfego entre Os pods da api e do web app ( a configurar para próxima última entrega, e a confirmar se realmente é necessário junto ao docente).

- Um Reverse Proxy da Nginx que suporta os ficheiros estáticos do web site, e que encaminha os pedidos do client  para o Backend. 

- Um Load Balancer da aws para fazer a comunicação entre o backend e as bases de dados. ( a configurar para última entrega) 

- Bases de dados provenientes do serviço RDS da aws do tipo postgresql, dentro da aws configuramos a base de estados para sua replicação no estado read and write. Configuramos também a base de dados para que ela permita o acesso a uma rede específica que é a rede 192.168.64.6 ( rede do cluster), após isso ela está disponível para ser manuseada através do Pg admin bastando apenas colocar credenciais e host fornecidos pela Amazon. Portanto as bases de dados se encontram fora do cluster Kubernetes. 

Agora explicando o fluxo actual da nossa aplicação até ao momento. 

1 - O Web site tem os ficheiros estáticos em um reverse Proxy nginx. Portanto quando o cliente acede a aplicação o reverse Proxy está autorizado a permitir o acesso aos ficheiros estáticos apenas por via da rede do cluster com acompanhada pela nodeport do pod da web app dentro do cluster que permite a conexão com o Proxy, para que o site possa ser acedido pelos clientes. 

2 - Quando o cliente faz o request( login ou registro), este request passa pelo reverse Proxy que o encaminha para o nodePort do Pod da API. 

3 - Em seguida o Pod da api, encaminha o pedido para base de dados da Aws, utilizando as credencias de segurança configuradas na aws para o acesso da rede 192.168.64.6. 

4 - A base de dados principal recebe o pedido e o actualiza imediatamente para a base de dados replica. Tendo as duas exatamente os mesmos dados em tempo real. Apenas a base de dados principal envia selects e inserts. E a base de dados replica envia selects e inserts apenas quando a principal está embaixo.

![image](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/d2173fbf-75e3-4642-bd8b-d7ac8791aa63)



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

![Captura de Ecrã (145)](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/b7e0ec30-be59-46f5-806f-c295d8efee6a)

<h3> **Primeira versão da documentação da API REST** </h3>

<h3> **Um esboço da estrutura dos dados** </h3>

![WhatsApp Image 2023-11-19 at 16 59 40](https://github.com/IADE-PDS/projeto-grupo1/assets/100430459/f88e0e1d-39d4-4ff9-9dfa-a10449183208)

**Outros artefactos a definir pela UC de Engenharia de Software, de acordo com o projeto**



