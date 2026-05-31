// ---------------------------------------------------------------------------
// Vercel Serverless Function – Livros (Books) CRUD API
// Data is stored in-memory and resets on each cold start.
// ---------------------------------------------------------------------------

/** Seed data – same content that was in db.json */
let livros = [
  {
    id: "1",
    isbn: "978-85-359-0277-1",
    tituloOriginal: "O Senhor dos Anéis: A Sociedade do Anel",
    editora: "HarperCollins Brasil",
    numeroPaginas: 576,
    idioma: "Português",
    formatoFisico: false,
  },
];

/** Auto-increment counter for new IDs */
let nextId = 2;

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
module.exports = (req, res) => {
  // ---- CORS headers (allows any origin – fine for a demo) ----
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  // The :id comes from the vercel.json rewrite as a query param
  const { id } = req.query;

  // ---- GET (all or by id) ----
  if (req.method === "GET") {
    if (id) {
      const livro = livros.find((l) => l.id === id);
      if (!livro) return res.status(404).json({ error: "Livro não encontrado" });
      return res.json(livro);
    }
    return res.json(livros);
  }

  // ---- POST (create) ----
  if (req.method === "POST") {
    const livro = { id: String(nextId++), ...req.body };
    livros.push(livro);
    return res.status(201).json(livro);
  }

  // ---- PUT (update) ----
  if (req.method === "PUT") {
    if (!id) return res.status(400).json({ error: "ID é obrigatório" });
    const index = livros.findIndex((l) => l.id === id);
    if (index === -1) return res.status(404).json({ error: "Livro não encontrado" });
    livros[index] = { ...req.body, id };
    return res.json(livros[index]);
  }

  // ---- DELETE ----
  if (req.method === "DELETE") {
    if (!id) return res.status(400).json({ error: "ID é obrigatório" });
    const index = livros.findIndex((l) => l.id === id);
    if (index === -1) return res.status(404).json({ error: "Livro não encontrado" });
    livros.splice(index, 1);
    return res.status(204).end();
  }

  // ---- Anything else ----
  return res.status(405).json({ error: "Método não permitido" });
};
