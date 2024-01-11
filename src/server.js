const express = require('express')
const cors= require('cors')
const app = express()
const port = 3000
const host= '127.0.0.1'

app.use(cors())
app.use(express.json())


let livrosDb = [
    {   id:1,
        titulo: 'A Guerra dos Tronos',
        autor: 'George R.R. Martin',
        anoPublicacao: 1996
      },
    {    id:2,  
      titulo: 'Cem Anos de Solidão',
      autor: 'Gabriel García Márquez',
      anoPublicacao: 1967
    },
    {   id:3,
      titulo: 'A Revolução dos Bichos',
      autor: 'George Orwell',
      anoPublicacao: 1945
    },
    { id:4,
      titulo: 'O Senhor dos Anéis',
      autor: 'J.R.R. Tolkien',
      anoPublicacao: 1954
    },
    {  id:5,
      titulo: 'Harry Potter e a Pedra Filosofal',
      autor: 'J.K. Rowling',
      anoPublicacao: 1997
    }
  ];



app.get('/livros', (req, res) => {
  res.send(JSON.stringify(livrosDb))
})


app.get('/livros/:id', (req, res) => {

    const livroId=parseInt(req.params.id)

    const livroPesquisado=livrosDb.find((livro)=>livro.id===livroId)

    if(!livroPesquisado){
        return res.status(404).send('Livro não encontrado!')
    }

    res.send(JSON.stringify(livroPesquisado))
  })

app.post('/livros', (req, res) => {
    const {id,titulo,autor,anoPublicacao}=req.body

    const novoLivro={
        id,
        titulo,
        autor,
        anoPublicacao
    }

    livrosDb.push(novoLivro)
    res.status(201).send(JSON.stringify(livrosDb))
  })

  app.put('/livros/:id', (req, res) => {
    const livroId=parseInt(req.params.id)
    const {id,titulo,autor,anoPublicacao}=req.body

    const livroAtualizado=livrosDb.find((livro)=>livro.id===livroId)
    if(!livroAtualizado){
        return res.status(404).send('Livro não encontrado!')
    }else{

        livroAtualizado.titulo=titulo
        livroAtualizado.autor=autor
        livroAtualizado.anoPublicacao=anoPublicacao
    }
    res.status(200).send(livroAtualizado)
  })
  
  app.delete('/livros/:id', (req, res) => {
    const livroId=parseInt(req.params.id)

    const livroDeletado=livrosDb.find((livro)=>livro.id===livroId)
    if(!livroDeletado){
        return res.status(404).send('Livro não encontrado!')
    }else{
        const livrosNaoDeletados=livrosDb.filter((obj)=>obj.id!=livroId)
        
        livrosDb=livrosNaoDeletados
    }

   res.status(200).json(livrosDb);
  })

app.listen(port,host, () => {
  console.log(`Server running in ${port}`)
})