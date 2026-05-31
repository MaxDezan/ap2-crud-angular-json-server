# 📚 Gerenciador de Livros — CRUD Angular + JSON Server

---

## Identificação

- **Aluno:** Max Dezan Rossi
- **Disciplina:** Aplicações Front End
- **Professor(a):** Lucas Fogaça
- **Período:** 2025.1

---

## Tema do Projeto

Desenvolvimento de uma aplicação web CRUD (Create, Read, Update, Delete) para gerenciamento de livros, utilizando **Angular** com **Standalone Components** e uma API simulada com **JSON Server**.

---

## Descrição

Esta aplicação permite o cadastro, listagem, edição e exclusão de livros. O projeto foi desenvolvido seguindo as boas práticas de **Clean Code**, com separação clara de responsabilidades entre Model, Service e Components.

A entidade principal é **Livro**, que possui os seguintes campos:
- **ISBN** — Código identificador do livro
- **Título Original** — Nome original da obra
- **Editora** — Editora responsável pela publicação
- **Número de Páginas** — Quantidade de páginas
- **Idioma** — Idioma da edição
- **Formato Físico** — Indica se o livro é físico ou digital

A comunicação com a API é feita exclusivamente através de **Services** com `HttpClient`, utilizando a função `inject()` para injeção de dependências. A edição de registros reutiliza o formulário principal, sem uso de `prompt()`.

---

## Tecnologias Utilizadas

| Tecnologia | Versão | Finalidade |
|---|---|---|
| Angular | 21.x | Framework front-end |
| TypeScript | 5.9.x | Linguagem de programação |
| JSON Server | 1.x | Simulação de API REST |
| Concurrently | 9.x | Execução simultânea de scripts |
| RxJS | 7.8.x | Programação reativa (Observables) |
| HTML5 / CSS3 | — | Estrutura e estilização |

---

## Como Executar o Projeto

### Pré-requisitos

- [Node.js](https://nodejs.org/) (versão 18 ou superior)
- npm (incluído com o Node.js)

### Passo a passo

1. **Clone o repositório:**
   ```bash
   git clone https://github.com/MaxDezan/ap2-crud-angular-json-server.git
   cd ap2-crud-angular-json-server
   ```

2. **Instale as dependências:**
   ```bash
   npm install
   ```

3. **Execute a aplicação e a API simultaneamente:**
   ```bash
   npm run start:all
   ```

4. **Acesse no navegador:**
   - **Aplicação Angular:** [http://localhost:4200](http://localhost:4200)
   - **API JSON Server:** [http://localhost:3000/livros](http://localhost:3000/livros)

### Scripts disponíveis

| Comando | Descrição |
|---|---|
| `npm start` | Inicia apenas o servidor Angular |
| `npm run api` | Inicia apenas o JSON Server |
| `npm run start:all` | Inicia ambos simultaneamente |
| `npm run build` | Gera o build de produção |

---

## Deploy na Vercel

O projeto também está hospedado na Vercel para acesso público, utilizando uma Serverless Function como backend:

🔗 **[Acessar aplicação](#)**

> Substitua o link acima pela URL gerada após o deploy no Vercel.

---

## Link do Vídeo Demonstrativo

🎥 [](#)

---

## Funcionalidades

-  **Cadastro de livros** — Formulário com validação básica de campos obrigatórios
-  **Listagem de livros** — Tabela responsiva com todos os registros cadastrados
-  **Edição de livros** — Reutiliza o formulário principal, preenchendo os dados e atualizando via PUT
-  **Exclusão de livros** — Confirmação nativa (`confirm()`) antes de remover
-  **Mensagens de feedback** — Exibição de sucesso ou erro após cada operação
-  **Estados de carregamento** — Mensagem de "Carregando..." durante requisições
-  **Estado vazio** — Mensagem de "Nenhum livro cadastrado" quando não há registros
-  **Layout responsivo** — Adaptação para diferentes tamanhos de tela
-  **Clean Code** — Separação em Model, Service e Components com injeção de dependências via `inject()`

