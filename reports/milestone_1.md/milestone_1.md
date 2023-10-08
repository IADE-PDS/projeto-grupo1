**PROPOSTA INICIAL DE PROJETO**

**Nome do projeto:** Mambos da banda

**Enquadramento do projeto:** A nossa aplicação é uma conexão entre vendedores e compradores, ao contrário de outras aplicações, esta exibe os produtos e as lojas nela registadas e assim conecta o comprador ao vendedor.

A aplicação agregará um conjunto de lojas de produtos para confeção de pratos típicos angolanos, o cliente procura pelo produto e aparecem as lojas que o tenham, o cliente então seleciona em que loja deseja fazer a compra, baseando-se em preços e distância. Isso é conveniente porque reduz o tempo dos clientes.

Chegando em Portugal foi muito difícil encontrar lojas que vendam produtos da culinária angolana, muitas das lojas não têm redes sociais/websites, e demoramos bastante tempo a encontrar essas lojas e a saber onde ficam localizadas. Essa dificuldade motivou-nos a criar esta aplicação web que ajuda tanto os clientes quanto os vendedores.

A pretensão com esta aplicação é ajudar pequenos negócios, pessoas que com pouco tentam conseguir uma renda, seja essa única ou extra, e pessoas em geral, angolanas ou não, mas que queiram preparar refeições angolanas. Tornando a procura e a oferta destes produtos bem mais rápida e prática.

TAREFAS PRINCIPAIS

A nossa solução conta com as seguintes funcionalidades:

- Qualquer utilizador poderá:

▪ Visualizar lojas

▪ Visualizar produtos

▪ Registar-se


- Utilizadores registados poderão:

▪ Têm uma área pessoal

▪ Visualizar lojas que contêm um produto

▪ Visualizar mapa das lojas

▪ Adicionar produtos ao carrinho

▪ Finalizar compra


- As lojas terão:

▪ Um nome

▪ Uma lista de produtos (quantidade e preço)

▪ Localização


- A área pessoal do utilizador terá:

▪ Nome

▪ Email

TAREFAS ADICIONAIS

• Pagamento com uma api de pagamentos

• Botão de iot que adiciona produtos pré-definidos por nós no carrinho

TAREFAS OPCIONAL

• Entrega dos produtos com uma api de entrega de compras

PÚBLICO-ALVO

A nossa aplicação é destinada a pessoas angolanas ou não de idade mínima de 16 anos. Optamos por esta idade por questões de segurança, tanto pela culinária quanto por questões bancárias

ANALISE COMPETITIVA

Para sabermos a importância e a eficácia da nossa aplicação web pesquisamos por aplicações parecidas ou que tenham qualquer semelhança com a nossa. Pudemos ver que com exatamente o mesmo fim que a nossa não há. Mas a Uber Eats, Glovo, Bolt Food, AliExpress e Alibaba.

Embora AliExpress e Alibaba vendam uma variedade enorme de produtos, todas elas agregam várias lojas e comercializam os produtos destas, utilizam a localização tanto para entrega como para levantamento de compras. Todas estas aplicações fazem a entrega dos produtos, então a longo prazo pretendemos incorporar esta funcionalidade também, pois sabemos que é uma mais-valia. Com esta pesquisa pudemos ver que a nossa aplicação será bem-sucedida, pudemos ver que as pessoas precisam e procuram aplicações desse tipo.

**Descrição prévia da Arquitetura da solução:** Arquitetura do Sistema:

A nossa arquitetura foi projetada para garantir alta disponibilidade, tolerância a falhas e escalabilidade, com componentes distribuídos para oferecer um desempenho robusto e seguro.

Distribuição em Máquinas Virtuais (VMs):

Optamos por implementar máquinas virtuais, para garantir uma distribuição eficaz e tolerante a falhas. Cada componente essencial possui pelo menos duas instâncias para garantir alta disponibilidade e recuperação de falhas de maneira eficaz.

Aqui está uma visão geral dos principais elementos da nossa arquitetura:

1. Servidores Proxy:

- Contamos com dois servidores proxy que proporcionam o equilíbrio de carga do tráfego de entrada.
- Eles distribuem as transações dos clientes de maneira uniforme entre os servidores aplicacionais, de forma a garantir uma experiência eficiente e sem interrupções para os utilizadores.

1. Servidores Aplicacionais:

- Temos dois servidores aplicacionais que executam a lógica da aplicação e desempenham um papel central na comunicação com a API.
- São projetados para oferecer desempenho de alto nível e garantir que os pedidos dos clientes sejam tratados de forma rápida e confiável.

1. Servidores de Base de Dados:

- Contamos com dois servidores de base de dados que armazenam os dados acessados pela nossa API.
- Garantem que os dados estejam sempre disponíveis e prontos para serem consultados.

1. Servidor de API:

- O servidor de API é o ponto de acesso para nossos servidores aplicacionais, fornece os dados necessários para atender às necessidades dos clientes.
- É uma parte vital da nossa arquitetura, pois permite que os aplicativos interajam com eficiência com os dados.

1. Firewall (Segurança):

- Implementamos um firewall que atua como a primeira linha de defesa contra possíveis ameaças de segurança.
- Protege a nossa rede de possíveis ataques, garantindo a integridade e a confidencialidade dos dados.

Pedidos do Botão IoT:

Integramos também o botão IoT na nossa arquitetura. Quando o botão IoT é acionado, ele inicia um processo de comunicação eficiente:

1. O botão IoT envia uma mensagem para o servidor aplicacional designado.
2. O servidor aplicacional, por sua vez, comunica-se com a API, que é responsável por buscar os dados necessários à base de dados.Essa integração permite que os clientes e o botão IoT acessem os nossos serviços de forma eficiente e segura, tornando a nossa arquitetura altamente responsiva e adaptável a diversas necessidades de interação.


**GUIÕES DE TESTE**

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
