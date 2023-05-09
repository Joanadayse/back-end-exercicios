import express, { Request, Response } from 'express'
import cors from 'cors'
import { CursosController } from './controller/CursosController'
import { AlunosController } from './controller/AlunosController'

const app = express()

app.use(cors())
app.use(express.json())

app.listen(3003, () => {
    console.log(`Servidor rodando na porta ${3003}`)
})

const cursosController= new CursosController()
const alunosController= new AlunosController()

app.get("/ping", async (req: Request, res: Response) => {
    try {
        res.status(200).send({ message: "Pong!" })
    } catch (error) {
        console.log(error)

        if (req.statusCode === 200) {
            res.status(500)
        }

        if (error instanceof Error) {
            res.send(error.message)
        } else {
            res.send("Erro inesperado")
        }
    }
})

app.get("/cursos", cursosController.getCursos);
app.post("/cursos", cursosController.createCurso);
app.put("/cursos/:id",cursosController.updateCurso);
app.delete("/cursos/:id",cursosController.deleteCurso);

app.get("/alunos",alunosController.getAlunos);
app.post("/alunos", alunosController.createAluno);
app.put("/alunos/:id", alunosController.updateAlunos);
app.delete("/alunos/:id", alunosController.deleteAluno);

