// server.js
// Este é o BACK-END do jogo. Usa apenas os módulos nativos do Node.js
// (http e fs) — sem Express, sem framework, sem banco de dados.
// Objetivo: mostrar exatamente o que um servidor faz por baixo dos panos.

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const RANKING_FILE = path.join(__dirname, "ranking.json");
const PUBLIC_DIR = path.join(__dirname, "public");

// Tipos de arquivo que o servidor sabe entregar para o navegador.
// Cada extensão precisa de um "Content-Type" correto, ou o navegador
// não sabe como interpretar o arquivo.
const CONTENT_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
};

// Lê o ranking.json do disco e devolve como array de JS.
// Se o arquivo não existir ou estiver corrompido, começa do zero.
function lerRanking() {
  try {
    const conteudo = fs.readFileSync(RANKING_FILE, "utf-8");
    return JSON.parse(conteudo);
  } catch (erro) {
    return [];
  }
}

// Salva o array de ranking de volta no ranking.json.
function salvarRanking(ranking) {
  fs.writeFileSync(RANKING_FILE, JSON.stringify(ranking, null, 4));
}

// Serve um arquivo estático (html, css, js) que está dentro de /public.
function servirArquivoEstatico(req, res) {
  // "/" deve carregar o index.html
  let caminhoRelativo = req.url === "/" ? "/index.html" : req.url;

  // Impede que alguém tente acessar arquivos fora da pasta public
  // (ex: ../server.js). Segurança básica de servidor de arquivos.
  const caminhoAbsoluto = path.normalize(
    path.join(PUBLIC_DIR, caminhoRelativo)
  );
  if (!caminhoAbsoluto.startsWith(PUBLIC_DIR)) {
    res.writeHead(403);
    res.end("Acesso negado");
    return;
  }

  fs.readFile(caminhoAbsoluto, (erro, conteudo) => {
    if (erro) {
      res.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
      res.end("Arquivo não encontrado: " + caminhoRelativo);
      return;
    }

    const extensao = path.extname(caminhoAbsoluto);
    const tipo = CONTENT_TYPES[extensao] || "application/octet-stream";

    res.writeHead(200, { "Content-Type": tipo });
    res.end(conteudo);
  });
}

// Cria o servidor HTTP. Toda requisição que chega passa por esta função.
const server = http.createServer((req, res) => {
  // ---------- ROTA: GET /ranking ----------
  // O navegador pede a lista de pontuações salvas.
  if (req.method === "GET" && req.url === "/ranking") {
    const ranking = lerRanking();

    // Ordena do maior para o menor pontuador antes de responder.
    ranking.sort((a, b) => b.pontos - a.pontos);

    res.writeHead(200, { "Content-Type": "application/json; charset=utf-8" });
    res.end(JSON.stringify(ranking));
    return;
  }

  // ---------- ROTA: POST /ranking ----------
  // O navegador envia { nome, pontos } depois que o jogador termina o quiz.
  if (req.method === "POST" && req.url === "/ranking") {
    let corpoRecebido = "";

    // O corpo de uma requisição POST chega em pedaços (chunks).
    // Precisamos ir "colando" esses pedaços até a requisição terminar.
    req.on("data", (pedaco) => {
      corpoRecebido += pedaco;
    });

    req.on("end", () => {
      try {
        const dados = JSON.parse(corpoRecebido);

        // Validação simples: nome não pode ser vazio e pontos precisa ser número.
        const nome = String(dados.nome || "").trim().slice(0, 20);
        const pontos = Number(dados.pontos);

        if (!nome || Number.isNaN(pontos)) {
          res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
          res.end(JSON.stringify({ erro: "Dados inválidos." }));
          return;
        }

        const ranking = lerRanking();
        ranking.push({
          nome,
          pontos,
          data: new Date().toISOString(),
        });
        salvarRanking(ranking);

        res.writeHead(201, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ mensagem: "Pontuação salva com sucesso!" }));
      } catch (erro) {
        res.writeHead(400, { "Content-Type": "application/json; charset=utf-8" });
        res.end(JSON.stringify({ erro: "JSON inválido." }));
      }
    });

    return;
  }

  // ---------- QUALQUER OUTRA ROTA ----------
  // Se não é /ranking, tentamos servir um arquivo estático (html/css/js).
  servirArquivoEstatico(req, res);
});

server.listen(PORT, () => {
  console.log(`Quiz Battle rodando em http://localhost:${PORT}`);
});
