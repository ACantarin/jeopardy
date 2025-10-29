const express = require('express')
const routes = require('./routes')

const app = express()
const port = 3000

routes(app)

app.get('/health-check', (req, res) => {
  res.status(200).json({ message: 'O app Jeopardy está on-line' })
})

app.listen(port, () => console.log(`Servidor rodando na porta ${port}`))