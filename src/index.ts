import express from 'express'
import cors from 'cors'
import { coursesRouter } from './router/coursesRouter'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

app.use("/courses", coursesRouter)