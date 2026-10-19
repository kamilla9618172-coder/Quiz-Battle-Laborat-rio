# ⚔️ Quiz Battle

Projeto educacional de **perguntas e respostas** desenvolvido com **HTML, CSS, JavaScript e Node.js**, criado para estudar na prática a comunicação entre **front-end e back-end**.

O projeto foi desenvolvido com auxílio do **Claude (Anthropic)** como ferramenta de apoio ao aprendizado e tem como principal objetivo demonstrar como uma aplicação executada no navegador pode se comunicar com um servidor, enviar informações, receber dados e manter um ranking persistente.

---

## 🎯 Objetivo do projeto

O **Quiz Battle** foi criado para introduzir conceitos fundamentais do desenvolvimento de aplicações Web que possuem **front-end e back-end separados**.

Diferentemente de uma aplicação que funciona apenas dentro do navegador, neste projeto existe um servidor responsável por receber requisições, processar informações e armazenar as pontuações dos jogadores.

O projeto permite estudar conceitos como:

* Front-end e back-end;
* Cliente e servidor;
* Node.js;
* Requisições e respostas HTTP;
* Métodos GET e POST;
* `fetch()`;
* JSON;
* API;
* Endpoints;
* Persistência de dados;
* Comunicação entre navegador e servidor.

---

# 🎮 Sobre o Quiz Battle

O Quiz Battle é um jogo composto por **10 perguntas**.

Cada resposta correta vale:

**10 pontos**

Ao finalizar o quiz, o jogador pode salvar sua pontuação.

A diferença principal é que o ranking não fica armazenado apenas dentro do navegador.

As pontuações são enviadas para o servidor e armazenadas em um arquivo chamado:

```text id="7cflhc"
ranking.json
```

Dessa forma, os resultados continuam disponíveis mesmo depois que a página é fechada e podem ser consultados por outros jogadores que estejam utilizando o mesmo servidor.

---

# 🧩 Arquitetura do projeto

O projeto é dividido em duas partes principais:

```text id="2f34b6"
FRONT-END                         BACK-END

Navegador                         Servidor
    │                                │
    │                                │
index.html                       server.js
style.css                            │
script.js                            │
    │                                │
    │────── requisição ─────────────▶│
    │           fetch()              │
    │                                │
    │◀──────── resposta ─────────────│
    │           JSON                 │
    │                                ▼
    │                          ranking.json
```

O **front-end** apresenta e controla a interface utilizada pelo jogador.

O **back-end** recebe as requisições feitas pelo navegador e controla o acesso aos dados armazenados.

---

# 📁 Estrutura de arquivos

```text id="vq0t2c"
quiz-battle/
│
├── server.js
├── ranking.json
│
└── public/
    ├── index.html
    ├── style.css
    └── script.js
```

### `server.js`

Representa o **back-end** da aplicação.

É executado pelo Node.js e fica responsável por receber e responder às requisições.

### `ranking.json`

Arquivo utilizado para armazenar as pontuações dos jogadores.

Neste projeto, ele funciona como uma forma simples de persistência de dados antes da introdução de um banco de dados.

### `public/index.html`

Contém a estrutura das telas do jogo.

### `public/style.css`

Responsável pela aparência e estilização da aplicação.

### `public/script.js`

Contém a lógica do quiz executada no navegador e realiza a comunicação com o servidor utilizando `fetch()`.

---

# 🖥️ Front-end

O front-end é a parte executada pelo navegador e com a qual o jogador interage diretamente.

O jogo possui quatro telas principais:

1. identificação do jogador;
2. perguntas e alternativas;
3. resultado final;
4. ranking.

A lógica do quiz também é executada no front-end.

O JavaScript controla elementos como:

* perguntas;
* alternativas;
* respostas;
* pontuação;
* avanço entre perguntas;
* resultado final;
* comunicação com o servidor;
* exibição do ranking.

---

# 🖧 Back-end

O back-end é executado utilizando **Node.js**.

O servidor é construído utilizando apenas módulos nativos:

```javascript id="u88dhq"
const http = require("http");
const fs = require("fs");
const path = require("path");
```

Não são utilizados Express ou outros frameworks de back-end.

O objetivo é permitir o estudo dos fundamentos do funcionamento de um servidor antes da utilização de ferramentas que abstraem esse processo.

---

# 🌐 Cliente e servidor

Neste projeto:

**Cliente → navegador**

**Servidor → `server.js` executado pelo Node.js**

Quando o navegador precisa consultar ou salvar alguma informação, ele realiza uma **requisição** ao servidor.

O servidor recebe essa requisição, executa a operação necessária e envia uma **resposta**.

De maneira simplificada:

```text id="ik25n7"
CLIENTE
   │
   │ requisição
   ▼
SERVIDOR
   │
   │ processamento
   ▼
DADOS
   │
   │ resposta
   ▼
CLIENTE
```

---

# 📡 API de ranking

O servidor disponibiliza uma pequena API responsável pelo ranking.

Ela utiliza o endpoint:

```text id="37bt9g"
/ranking
```

Esse mesmo endpoint pode realizar operações diferentes dependendo do **método HTTP** utilizado.

---

## GET /ranking

Utilizado para **consultar as pontuações**.

Fluxo:

```text id="b73vpx"
Navegador
    │
    │ GET /ranking
    ▼
Servidor
    │
    │ lê
    ▼
ranking.json
    │
    │ JSON
    ▼
Servidor
    │
    │ resposta
    ▼
Navegador
```

---

## POST /ranking

Utilizado para **salvar uma nova pontuação**.

O front-end envia dados como:

```json id="pj7hm6"
{
    "nome": "Jogador",
    "pontos": 80
}
```

O servidor recebe esses dados, realiza a validação e adiciona o resultado ao arquivo `ranking.json`.

O fluxo é:

```text id="rrnwdz"
Navegador
    │
    │ POST /ranking
    ▼
Servidor
    │
    │ valida os dados
    ▼
ranking.json
```

---

# 🔄 Comunicação com fetch()

A função `fetch()` é utilizada pelo JavaScript do front-end para realizar requisições ao servidor.

Para consultar o ranking:

```javascript id="gr4n48"
fetch("/ranking")
```

Nesse caso, o método padrão utilizado é GET.

Para enviar uma pontuação:

```javascript id="bsjv1n"
fetch("/ranking", {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify({
        nome: nomeJogador,
        pontos: pontos
    })
});
```

Assim, o navegador consegue enviar informações para o servidor sem precisar acessar diretamente o arquivo onde os dados estão armazenados.

---

# 💾 Persistência de dados

Um dos principais conceitos trabalhados no projeto é a **persistência**.

Em aplicações somente front-end, determinados dados podem existir apenas durante a execução da página ou ficar limitados ao navegador utilizado.

No Quiz Battle, as pontuações são armazenadas no arquivo:

```text id="h3lx1d"
ranking.json
```

O arquivo fica no lado do servidor.

Isso permite que os dados continuem existindo mesmo depois que a página do jogo é fechada.

---

# 🔐 Pasta public

Os arquivos acessíveis diretamente pelo navegador ficam dentro da pasta:

```text id="x61u79"
public/
```

São eles:

```text id="pvvywx"
index.html
style.css
script.js
```

Já:

```text id="v97bqw"
server.js
ranking.json
```

ficam fora da pasta `public`.

Essa separação ajuda a compreender uma ideia importante da arquitetura Web: **nem todos os arquivos existentes no servidor devem ser disponibilizados diretamente para o navegador**.

---

# 🛠️ Tecnologias utilizadas

* HTML5
* CSS3
* JavaScript
* Node.js
* HTTP
* JSON
* Fetch API
* File System (`fs`)

O projeto utiliza apenas recursos nativos do Node.js no back-end.

**Não utiliza:**

* Express;
* frameworks front-end;
* banco de dados.

---

# ▶️ Como executar

É necessário possuir o **Node.js** instalado.

### 1. Abra o terminal

Acesse a pasta principal do projeto:

```text id="jcmimf"
quiz-battle/
```

### 2. Inicie o servidor

Execute:

```bash id="ohj2ms"
node server.js
```

### 3. Acesse pelo navegador

Com o servidor em execução, abra:

```text id="rj4aeu"
http://localhost:3000
```

O terminal deverá permanecer aberto enquanto a aplicação estiver sendo utilizada.

Para encerrar o servidor:

```text id="yzb52i"
Ctrl + C
```

---

# 🧠 Conceitos estudados

| Conceito         | Aplicação no projeto                                 |
| ---------------- | ---------------------------------------------------- |
| **Cliente**      | Navegador executando o front-end                     |
| **Servidor**     | `server.js` executado pelo Node.js                   |
| **Front-end**    | HTML, CSS e JavaScript da pasta `public`             |
| **Back-end**     | Servidor desenvolvido em JavaScript                  |
| **Requisição**   | Pedido enviado pelo navegador ao servidor            |
| **Resposta**     | Informação devolvida pelo servidor                   |
| **GET**          | Consulta do ranking                                  |
| **POST**         | Envio de uma nova pontuação                          |
| **JSON**         | Formato utilizado para armazenar e trocar dados      |
| **API**          | Conjunto de operações disponibilizadas pelo servidor |
| **Endpoint**     | Rota específica disponibilizada pela API             |
| **fetch()**      | Comunicação do front-end com o back-end              |
| **Persistência** | Armazenamento das pontuações em `ranking.json`       |

---

# 🔄 Fluxo completo da aplicação

Ao finalizar uma partida:

```text id="52pb7f"
JOGADOR
   ↓
finaliza o quiz
   ↓
FRONT-END
   ↓
fetch()
   ↓
POST /ranking
   ↓
SERVIDOR
   ↓
ranking.json
```

Quando o jogador consulta o ranking:

```text id="35x9l4"
ranking.json
   ↓
SERVIDOR
   ↓
GET /ranking
   ↓
fetch()
   ↓
FRONT-END
   ↓
RANKING NA TELA
```

Portanto, o ciclo principal pode ser resumido como:

```text id="3jxxph"
navegador → POST /ranking → servidor → ranking.json

navegador ← GET /ranking  ← servidor ← ranking.json
```

---

# 🚀 Possíveis melhorias

Depois da implementação básica, o projeto pode ser expandido com:

* botão para jogar novamente;
* níveis de dificuldade;
* categorias de perguntas;
* Top 10 do ranking;
* data e horário das partidas;
* medalhas para os primeiros colocados;
* cronômetro;
* perguntas em ordem aleatória;
* novas validações de dados.

---

# 🗄️ Evolução futura: banco de dados

O `ranking.json` funciona como uma introdução à persistência de dados.

Uma evolução natural do projeto é substituir esse arquivo por um **banco de dados**, como MySQL.

A arquitetura passaria de:

```text id="n07r9g"
HTML/CSS/JS
     ↓
   fetch()
     ↓
 server.js
     ↓
ranking.json
```

para:

```text id="lf54ac"
HTML/CSS/JS
     ↓
   fetch()
     ↓
 server.js
     ↓
   MySQL
```

Os conceitos de comunicação entre front-end e back-end continuam semelhantes. A principal mudança passa a ser a maneira como o servidor armazena e consulta os dados.

---

# 📚 Finalidade educacional

Este projeto foi desenvolvido para fins de **estudo de desenvolvimento Web**, especialmente para compreender a transição de aplicações exclusivamente front-end para aplicações que possuem um back-end.

Ele funciona como uma introdução prática a:

**Front-end → HTTP → API → Back-end → Persistência de dados**

O objetivo é compreender o fluxo de informações entre as diferentes partes de uma aplicação antes de avançar para frameworks de servidor e bancos de dados.

---

## 🤖 Desenvolvimento

Projeto desenvolvido com o **Claude (Anthropic)** para criação e estudo do código.

Utilizado como projeto educacional para estudo de **JavaScript, Node.js e comunicação entre front-end e back-end**.
