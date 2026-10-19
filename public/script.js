// script.js
// Este é o JavaScript que roda DENTRO DO NAVEGADOR (front-end).
// Ele cuida da interface do quiz e conversa com o back-end (server.js)
// usando fetch() para salvar e consultar o ranking.

// ---------------------------------------------------------------
// 1. Banco de perguntas (fica só na memória do navegador)
// ---------------------------------------------------------------
const PERGUNTAS = [
  {
    pergunta: "A linguagem que roda diretamente no navegador é o JavaScript.?",
    alternativas: ["0 → Java", "1 → Python", "2 → JavaScript", "3 → C++"],
    correta: 2,
  },
  {
    pergunta: "O HTML descreve a estrutura e o conteúdo de uma página web, como textos, títulos, imagens, links, tabelas e botões.",
    alternativas: [ "A estrutura do conteúdo"],
    correta:1,
  },
  {
    pergunta: "A linguagem usada para estilizar páginas web é o CSS?",
    alternativas: ["Monitor" , "Mouse", "hd", "Roteador"],
    Correta: 0 ,
  },
  {
    pergunta: "API significa Interface de Programação de Aplicações.?",
    alternativas: [
      "Aplicativo Interno de Programação",
      "Interface de Programação de Aplicações",
      "Arquivo de Programação Interno",
      "Análise de Processos de Internet",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual método HTTP é usado para ENVIAR dados novos ao servidor?",
    alternativas: ["GET", "POST", "DELETE", "HEAD"],
    correta: 1,
  },
  {
    pergunta: "Qual método HTTP é usado para CONSULTAR dados no servidor?",
    alternativas: ["POST", "PUT", "GET", "PATCH"],
    correta: 2,
  },
  {
    pergunta: "No projeto Quiz Battle, quem executa o server.js?",
    alternativas: ["O navegador", "O Node.js", "O CSS", "O HTML"],
    correta: 1 ,
  },
  {
    pergunta: "Por que o ranking precisa ficar salvo em um arquivo, e não só em uma variável JavaScript?",
    alternativas: [
      "Porque variáveis são mais lentas",
      "Porque uma variável desaparece quando a página fecha",
      "Porque arquivos JSON rodam mais rápido",
      "Não há diferença",
    ],
    correta: 1,
  },
  {
    pergunta: "Qual função transforma um objeto JavaScript em texto JSON?",
    alternativas: ["JSON.parse()", "JSON.stringify()", "fetch()", "JSON.toText()"],
    correta: 1, 
  },
  {
    pergunta: "O que a rota GET /ranking devolve para o navegador?",

alternativas: [
  "O código-fonte do server.js",
  "Uma nova pergunta do quiz",
  "O arquivo style.css",
  "A lista de pontuações salvas",
],

correta: 3,
  },
  {
pergunta: "O que é o DOM?",

alternativas: [
  "Um banco de dados do navegador",
  "Um tipo de servidor",
  "Um protocolo de rede",
  "A representação da página em forma de objetos que o JS pode manipular",
],

correta: 3,
  },
  {
    pergunta: "Qual comando inicia o servidor Node.js do projeto?",
    alternativas: ["npm start", "node server.js", "run server.js", "python server.js"],
    correta: 1 ,
  },
  {
    pergunta: "O que significa a sigla HTTP?",
    alternativas: [
      "Hyper Text Transfer Protocol",
      "High Transfer Text Program",
      "Home Tool Transfer Page",
      "Hyper Terminal Transfer Process",
    ],
    correta: 0,
  },
  {
    pergunta: "Qual módulo nativo do Node.js é usado para ler e escrever arquivos?",
    alternativas: ["http", "fs", "path", "url"],
    correta: 1,
  },
  {
    pergunta: "No formato JSON, como uma lista de itens é representada?",
    alternativas: ["Entre { }", "Entre [ ]", "Entre ( )", "Entre < >"],
    correta: 1,
  },
  {
    pergunta: "Qual é a função da tag <script> em um HTML?",
    alternativas: [
      "Definir o estilo da página",
      "Carregar ou escrever código JavaScript",
      "Criar uma tabela",
      "Definir metadados do documento",
    ],
    correta: 1,
  },
  {
    pergunta: "O que acontece quando o servidor responde com o código de status 404?",

alternativas: [
  "O servidor está fora do ar",
  "Tudo certo, requisição bem-sucedida",
  "Os dados foram salvos",
  "O recurso pedido não foi encontrado",
],

correta: 3,
  },
  {
    pergunta: "Por que colocamos apenas index.html, style.css e script.js dentro da pasta public/?",
    alternativas: [
      "Por acaso, não faz diferença",
      "Porque são os únicos arquivos que o navegador pode acessar diretamente",
      "Porque arquivos .js só funcionam dentro de pastas chamadas public",
      "Para deixar o projeto mais bonito",
    ],
    correta: 1,
  },
  {
    pergunta: "No fetch() usado para salvar a pontuação, o que o cabeçalho 'Content-Type: application/json' informa?",

alternativas: [
  "O tamanho do arquivo enviado",
  "O nome do jogador",
  "A senha do servidor",
  "O tipo de dado que está sendo enviado no corpo da requisição",
],

correta: 3,
  },
  {
    pergunta: "O que diferencia o front-end do back-end?",

alternativas: [
  "Front-end roda no servidor, back-end no navegador",
  "Não existe diferença, são a mesma coisa",
  "Front-end só existe em aplicativos mobile",
  "Front-end roda no navegador, back-end no servidor",
],

correta: 3,
  },
];

// ---------------------------------------------------------------
// 2. Estado do jogo (o que muda enquanto o jogador joga)
// ---------------------------------------------------------------
const estado = {
  nome: "",
  indiceAtual: 0,
  pontos: 0,
  respondeuAtual: false,
};

// ---------------------------------------------------------------
// 3. Referências aos elementos da tela
// ---------------------------------------------------------------
const telas = document.querySelectorAll("[data-tela]");

const inputNome = document.getElementById("input-nome");
const erroNome = document.getElementById("erro-nome");
const botaoIniciar = document.getElementById("botao-iniciar");
const botaoVerRankingInicio = document.getElementById("botao-ver-ranking-inicio");

const progressoBarra = document.getElementById("progresso-barra");
const progressoTexto = document.getElementById("progresso-texto");
const quizJogador = document.getElementById("quiz-jogador");
const quizPontos = document.getElementById("quiz-pontos");
const perguntaTexto = document.getElementById("pergunta-texto");
const alternativasContainer = document.getElementById("alternativas");

const resultadoJogador = document.getElementById("resultado-jogador");
const resultadoPontos = document.getElementById("resultado-pontos");
const resultadoLegenda = document.getElementById("resultado-legenda");
const botaoSalvar = document.getElementById("botao-salvar");
const erroSalvar = document.getElementById("erro-salvar");
const botaoJogarDeNovo = document.getElementById("botao-jogar-de-novo");

const rankingLista = document.getElementById("ranking-lista");
const rankingVazio = document.getElementById("ranking-vazio");
const botaoVoltarInicio = document.getElementById("botao-voltar-inicio");

const rankingPreviewLista = document.getElementById("ranking-preview-lista");
const rankingPreviewVazio = document.getElementById("ranking-preview-vazio");

// ---------------------------------------------------------------
// 4. Navegação entre telas
// ---------------------------------------------------------------
function mostrarTela(idTela) {
  telas.forEach((tela) => {
    tela.hidden = tela.id !== idTela;
  });
}

// ---------------------------------------------------------------
// 5. Fluxo do quiz
// ---------------------------------------------------------------
function iniciarQuiz() {
  const nomeDigitado = inputNome.value.trim();

  if (!nomeDigitado) {
    erroNome.textContent = "Digite um nome antes de começar.";
    return;
  }

  erroNome.textContent = "";
  estado.nome = nomeDigitado.slice(0, 20);
  estado.indiceAtual = 0;
  estado.pontos = 0;

  quizJogador.textContent = estado.nome;
  mostrarTela("tela-quiz");
  renderizarPergunta();
}

function renderizarPergunta() {
  const pergunta = PERGUNTAS[estado.indiceAtual];
  estado.respondeuAtual = false;

  // Atualiza barra e texto de progresso
  const percentual = ((estado.indiceAtual + 1) / PERGUNTAS.length) * 100;
  progressoBarra.style.width = percentual + "%";
  progressoTexto.textContent = `Pergunta ${estado.indiceAtual + 1} de ${PERGUNTAS.length}`;
  quizPontos.textContent = `${estado.pontos} pts`;

  perguntaTexto.textContent = pergunta.pergunta;
  alternativasContainer.innerHTML = "";

  pergunta.alternativas.forEach((texto, indice) => {
    const botao = document.createElement("button");
    botao.className = "alternativa";

    const letra = document.createElement("span");
    letra.className = "alternativa__letra";
    letra.textContent = "ABCD"[indice];

    const conteudo = document.createElement("span");
    conteudo.textContent = texto;

    botao.append(letra, conteudo);
    botao.addEventListener("click", () => responder(indice));
    alternativasContainer.appendChild(botao);
  });
}

// Tempo (em ms) que a resposta certa/errada fica destacada antes de avançar sozinha.
const TEMPO_TRANSICAO = 900;

function responder(indiceEscolhido) {
  if (estado.respondeuAtual) return; // impede clicar duas vezes
  estado.respondeuAtual = true;

  const pergunta = PERGUNTAS[estado.indiceAtual];
  const botoes = alternativasContainer.querySelectorAll(".alternativa");

  botoes.forEach((botao, indice) => {
    botao.disabled = true;
    if (indice === pergunta.correta) {
      botao.classList.add("correta");
    } else if (indice === indiceEscolhido) {
      botao.classList.add("errada");
    }
  });

  if (indiceEscolhido === pergunta.correta) {
    estado.pontos += 10;
    quizPontos.textContent = `${estado.pontos} pts`;
  }

  // Depois de mostrar qual era a resposta certa por um instante,
  // avança sozinho para a próxima pergunta (ou para o resultado, na última).
  setTimeout(avancar, TEMPO_TRANSICAO);
}

function avancar() {
  const ultimaPergunta = estado.indiceAtual === PERGUNTAS.length - 1;

  if (ultimaPergunta) {
    mostrarResultado();
    return;
  }

  estado.indiceAtual += 1;
  renderizarPergunta();
}

function mostrarResultado() {
  resultadoJogador.textContent = estado.nome;
  resultadoPontos.textContent = estado.pontos;

  const acertos = estado.pontos / 10;
  resultadoLegenda.textContent = `${acertos} de ${PERGUNTAS.length} perguntas corretas.`;

  botaoSalvar.disabled = false;
  botaoSalvar.textContent = "Salvar pontuação";
  erroSalvar.textContent = "";

  mostrarTela("tela-resultado");
}

// ---------------------------------------------------------------
// 6. Comunicação com o BACK-END (fetch)
// ---------------------------------------------------------------

// Envia a pontuação final para o servidor salvar em ranking.json.
async function salvarPontuacao() {
  botaoSalvar.disabled = true;
  botaoSalvar.textContent = "Salvando...";
  erroSalvar.textContent = "";

  try {
    const resposta = await fetch("/ranking", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        nome: estado.nome,
        pontos: estado.pontos,
      }),
    });

    if (!resposta.ok) {
      throw new Error("O servidor recusou os dados.");
    }

    botaoSalvar.textContent = "Pontuação salva!";
    await abrirRanking();
  } catch (erro) {
    erroSalvar.textContent = "Não foi possível salvar. O servidor está rodando?";
    botaoSalvar.disabled = false;
    botaoSalvar.textContent = "Salvar pontuação";
  }
}

// Busca o ranking salvo no servidor (usado tanto pelo preview quanto pela tela cheia).
async function buscarRanking() {
  const resposta = await fetch("/ranking");
  if (!resposta.ok) {
    throw new Error("O servidor recusou a consulta.");
  }
  return resposta.json();
}

// Desenha uma lista de ranking dentro de um <ol> e controla a mensagem de "vazio".
// Recebe os elementos como parâmetro para poder ser reaproveitada em telas diferentes.
function desenharRanking(ranking, listaElemento, vazioElemento, mensagemVazio) {
  listaElemento.innerHTML = "";

  if (ranking.length === 0) {
    vazioElemento.hidden = false;
    vazioElemento.textContent = mensagemVazio;
    return;
  }

  vazioElemento.hidden = true;

  ranking.forEach((jogador, indice) => {
    const item = document.createElement("li");
    item.className = "ranking-item" + (indice < 3 ? ` ranking-item--top${indice + 1}` : "");
    item.innerHTML = `
      <span class="ranking-item__posicao">${indice + 1}º</span>
      <span class="ranking-item__nome">${escaparTexto(jogador.nome)}</span>
      <span class="ranking-item__pontos">${jogador.pontos} pts</span>
    `;
    listaElemento.appendChild(item);
  });
}

// Carrega o preview de ranking (top 5) na tela inicial.
// É chamada assim que a página termina de carregar, sem precisar de clique.
async function carregarRankingPreview() {
  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 5),
      rankingPreviewLista,
      rankingPreviewVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingPreviewLista, rankingPreviewVazio,
      "Não foi possível carregar o ranking agora."
    );
  }
}

// Abre a tela de ranking completo, sempre buscando os dados mais recentes.
async function abrirRanking() {
  mostrarTela("tela-ranking");

  try {
    const ranking = await buscarRanking();
    desenharRanking(
      ranking.slice(0, 10),
      rankingLista,
      rankingVazio,
      "Ninguém pontuou ainda. Seja o primeiro!"
    );
  } catch (erro) {
    desenharRanking([], rankingLista, rankingVazio,
      "Não foi possível carregar o ranking. O servidor está rodando?"
    );
  }
}

// Evita que um nome de jogador com HTML dentro quebre a página.
function escaparTexto(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

// ---------------------------------------------------------------
// 7. Ligações dos botões (event listeners)
// ---------------------------------------------------------------
botaoIniciar.addEventListener("click", iniciarQuiz);
inputNome.addEventListener("keydown", (evento) => {
  if (evento.key === "Enter") iniciarQuiz();
});

botaoSalvar.addEventListener("click", salvarPontuacao);

botaoVerRankingInicio.addEventListener("click", abrirRanking);
botaoVoltarInicio.addEventListener("click", () => {
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

botaoJogarDeNovo.addEventListener("click", () => {
  inputNome.value = "";
  mostrarTela("tela-nome");
  carregarRankingPreview();
});

// ---------------------------------------------------------------
// 8. Carrega o ranking automaticamente assim que a página abre
// ---------------------------------------------------------------
carregarRankingPreview();