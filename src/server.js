const express = require('express')
const path = require('path')

const app = express()

// definindo o tempalte engine
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

// definindo os arquivos publicos
app.use(express.static(path.join(__dirname, 'public')))

// habilita serve para receber dados via post (formulário)
app.use(express.urlencoded({extended: true}))

// rotas

app.get('/', (req, res) => {
    res.render('index',{
        tittle: 'Titulo Teste'
    })
})

//404 Error (not found)

app.use((req,res) => { // middleware
    res.send('Pagina não encontrada')
})

// Executando o servidor

const port = process.env.PORT || 8080
app.listen(port, () => console.log (`Server is listening on port ${port}`))