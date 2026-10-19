# Quiz Battle — Guia do Projeto Para Fins de Estudo dos Alunos

Bem-vindo(a) ao **Quiz Battle**! Neste projeto você vai construir um jogo de perguntas e respostas que **funciona de verdade com front-end e back-end separados** — sem Express, sem banco de dados, só JavaScript puro dos dois lados.

No final, você vai entender por que sites "de verdade" precisam de um servidor, e não só de um arquivo HTML aberto no navegador.

---

## 1. O que você vai construir

Um jogo com 20 perguntas. Cada acerto vale 10 pontos. No final, o jogador salva sua pontuação, que fica guardada **mesmo depois de fechar o navegador** — e todo mundo da turma pode ver o ranking geral.

```
FRONT-END (navegador)          BACK-END (servidor)
┌────────────────────┐         ┌────────────────────┐
│  index.html         │         │  server.js          │
│  style.css           │  fetch  │                      │
│  script.js  ───────────────▶ │  responde com JSON  │
│                      │ ◀───────── │  lê/escreve         │
└────────────────────┘         │  ranking.json        │
                                └────────────────────┘
```

---

## 2. Por que isso é diferente

Em um jogo só de front-end, tudo acontece dentro do navegador — se você fechar a aba, tudo se perde. Aqui, o placar final precisa:

1. sobreviver ao fechamento da página;
2. ser compartilhado entre jogadores diferentes.

Isso só é possível com um **servidor** guardando os dados em um **arquivo**, fora do navegador.

---

## 3. Estrutura de pastas

Antes de escrever qualquer código, crie esta estrutura exata:

```
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

| Arquivo | O que é | Roda onde? |
|---|---|---|
| `server.js` | O back-end: recebe e responde requisições | No computador (Node.js) |
| `ranking.json` | Onde as pontuações ficam salvas | No disco, como um "banco de dados" simples |
| `public/index.html` | A estrutura das telas do jogo | No navegador |
| `public/style.css` | A aparência do jogo | No navegador |
| `public/script.js` | A lógica do quiz e a comunicação com o servidor | No navegador |

**Por que `index.html`, `style.css` e `script.js` ficam dentro de `public/`?**
Porque só o que está em `public/` deve poder ser acessado diretamente pelo navegador. O `server.js` e o `ranking.json` ficam "escondidos" do lado de fora — quem acessa o jogo não deveria conseguir baixar o código do servidor.

---

## 4. Passo a passo de criação

### Etapa 1 — Front-end do jogo (sem servidor ainda)

1. Crie a pasta `quiz-battle/public/`.
2. Dentro dela, crie `index.html`, `style.css` e `script.js`.
3. Escreva as 4 telas do jogo em `index.html`:
   - tela de nome do jogador;
   - tela de pergunta (com barra de progresso e alternativas);
   - tela de resultado final;
   - tela de ranking.
4. No `script.js`, monte um array com as 10 perguntas (cada uma com texto, alternativas e qual é a correta).
5. Faça o quiz **funcionar sozinho**, abrindo o `index.html` direto no navegador (duplo clique). Ele deve avançar pergunta por pergunta e mostrar a pontuação final.

Nesse ponto, **não existe back-end ainda** — é só HTML, CSS e JS rodando no navegador, igual aos jogos anteriores que vocês já fizeram.

### Etapa 2 — O primeiro servidor

1. Volte para a pasta `quiz-battle/` (fora da `public/`) e crie `server.js`.
2. Use apenas os módulos nativos do Node.js:
   ```javascript
   const http = require("http");
   const fs = require("fs");
   const path = require("path");
   ```
3. Crie um servidor com `http.createServer()` que, por enquanto, só sabe entregar os arquivos de dentro de `public/` (isso é chamado de **servir arquivos estáticos**).
4. No terminal, rode:
   ```bash
   node server.js
   ```
5. Abra `http://localhost:3000` no navegador.

**Pare e pense:** por que agora usamos um endereço (`localhost:3000`) em vez de simplesmente dar dois cliques no `index.html`? Essa pergunta é o coração do conteúdo de back-end — a resposta é que agora existe um **programa rodando** (o servidor) entre você e os arquivos, e é esse programa que vai nos permitir salvar dados depois.

### Etapa 3 — Criando a API de ranking

1. Crie o arquivo `ranking.json` com o conteúdo `[]` (uma lista vazia).
2. No `server.js`, adicione uma rota que responde a `GET /ranking`:
   - lê o `ranking.json` do disco;
   - devolve o conteúdo como resposta, no formato JSON.
3. Teste no navegador: acesse `http://localhost:3000/ranking`. Você deve ver `[]`.

### Etapa 4 — Salvando pontuações (POST)

1. No `server.js`, adicione uma rota que responde a `POST /ranking`:
   - recebe os dados que o navegador enviou (nome e pontos);
   - valida se o nome não está vazio e se a pontuação é um número;
   - adiciona o novo resultado na lista;
   - salva a lista de volta no `ranking.json`.
2. No `script.js`, na tela de resultado, use `fetch()` para enviar a pontuação:
   ```javascript
   fetch("/ranking", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ nome: nomeJogador, pontos: pontos }),
   });
   ```
3. Jogue uma partida completa e clique em **Salvar pontuação**. Depois, abra o `ranking.json` em um editor de texto — seu resultado deve estar lá.

### Etapa 5 — Mostrando o ranking

1. Na tela de ranking do `script.js`, use `fetch("/ranking")` (sem `method`, porque o padrão já é `GET`) para buscar a lista salva.
2. Ordene do maior para o menor pontuador.
3. Monte a lista na tela, mostrando posição, nome e pontos.

Pronto — o ciclo completo está funcionando:

```
navegador → POST /ranking → servidor → ranking.json
navegador ← GET /ranking  ← servidor ← ranking.json
```

---

## 5. Como testar o projeto

1. Abra o terminal na pasta `quiz-battle/`.
2. Rode:
   ```bash
   node server.js
   ```
3. Você deve ver a mensagem `Quiz Battle rodando em http://localhost:3000`.
4. Abra esse endereço no navegador.
5. Jogue, salve sua pontuação e confira o ranking.
6. Para parar o servidor, volte ao terminal e aperte `Ctrl + C`.

**Atenção:** enquanto o terminal estiver fechado, o servidor não está rodando — e o jogo não vai conseguir salvar nem consultar o ranking.

---

## 6. Conceitos que este projeto ensina

| Conceito | Onde aparece no projeto |
|---|---|
| Cliente | O navegador, rodando `script.js` |
| Servidor | `server.js`, rodando com Node.js |
| Requisição / Resposta | Toda vez que o `fetch()` é chamado |
| Método GET | Consultar o ranking |
| Método POST | Salvar uma nova pontuação |
| JSON | O formato usado para trocar dados entre navegador e servidor |
| API | O conjunto de rotas `/ranking` que o servidor oferece |
| Endpoint | Cada rota específica, como `GET /ranking` |
| Persistência de dados | O arquivo `ranking.json`, que não some quando a página fecha |
| `fetch()` | A função que o front-end usa para "conversar" com o back-end |

---

## 7. Desafios extras (depois que tudo estiver funcionando)

Escolha um ou mais para aprimorar o seu jogo:

1. Adicionar um botão "Jogar novamente" que reinicia sem recarregar a página.
2. Criar níveis de dificuldade (fácil, médio, difícil).
3. Organizar as perguntas por categoria.
4. Mostrar só os 10 melhores colocados no ranking.
5. Impedir pontuação negativa ou nome vazio (dica: o `server.js` já valida isso — tente quebrar a validação e depois consertá-la).
6. Mostrar a data da partida ao lado do nome no ranking.
7. Adicionar medalhas 🥇🥈🥉 para os três primeiros colocados.
8. Adicionar um cronômetro por pergunta.
9. Embaralhar a ordem das perguntas a cada partida.

---

## 8. Próximo passo: banco de dados

Quando chegarmos ao conteúdo de banco de dados, vamos apenas **trocar uma peça** desta arquitetura:

```
ANTES                          DEPOIS
HTML/CSS/JS                    HTML/CSS/JS
    ↓                              ↓
  fetch()                        fetch()
    ↓                              ↓
  server.js                     server.js
    ↓                              ↓
 ranking.json      ═══▶         MySQL
```

O front-end e a forma como ele se comunica com o back-end (`fetch`, `GET`, `POST`, JSON) continuam praticamente iguais. Só a forma como o servidor guarda os dados muda. Por isso vale a pena entender bem este projeto agora — ele é a base de tudo que vem depois.
