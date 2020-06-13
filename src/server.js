const express = require("express")
const server = express()


server.use(express.static("public"))

server.use(express.urlencoded({ extended: true }))

// utilizando tamplate engine

const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
	express: server,
	noCache: true
})

//configurar caminhos da aplicação
// página inicial
// req: Requisição
// Resposta
server.get("/", (req, res) => {
	return res.render("index.html", { title: "Seu marketplace de coleta de resíduos" })
})

server.get("/create-point", (req, res) => {
	
	console.log(req, res)
	
	return res.render("create-point.html")
})

server.get("/search", (req, res) => {
	
	console.log(req, res)
	
	return res.render("search-result.html")
})
  

// ligar o servidor
server.listen(3000)