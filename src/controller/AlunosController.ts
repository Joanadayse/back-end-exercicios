import { Request, Response } from "express";
import { AlunosDataBase } from "../database/AlunosDataBase";
import { AlunosDB } from "../types";
import { Alunos } from "../models/Alunos";

export class AlunosController{
    public getAlunos= async (req:Request , res: Response)=>{
        try{
            const alunosDataBase= new AlunosDataBase()
            const alunosDB:AlunosDB[]= await alunosDataBase.findAlunos()
  
   const aluno= alunosDB.map((alunoDB)=> new Alunos(
    alunoDB.id,
    alunoDB.name,
    alunoDB.curso_id,
    alunoDB.create_at
   ))

   res.status(200).send(aluno)

        }catch(error){
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
    }

    public createAluno= async(req:Request, res: Response)=>{
        try{
            const {id , name , curso_id, create_at}= req.body;

            if(typeof id !== "string"){
                res.status(400);
                throw new Error("'id' precisa ser string")
            }

            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("'name' precisa ser string")
            }

            const newAluno: AlunosDB={
                id,
                name,
                curso_id,
                create_at

            }

            const alunosDataBase= new AlunosDataBase();
            await alunosDataBase.insertAlunos(newAluno);
            res.status(200).send({message:"aluno criado com sucesso ", newAluno: newAluno})
        }catch(error:any){
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
    }


    public updateAlunos= async(req:Request, res:Response)=>{
        try{

            const id= req.params.id;

            const newId= req.body.id;
            const newName= req.body.name;
            const newCursoId= req.body.curso_id;
            const newCreateAt= req.body.create_at;

        
        if( newId !== undefined){
           if(typeof newId !== "string"){
               res.status(400);
               throw new Error("'id' precisa ser string")
           }
           if( newId.length == 4){
               res.status(400);
               throw new Error("'id' precisa ter 4 caractes")
           }
        }
        if( newName !== undefined){
           if(typeof newName !== "string"){
               res.status(400);
               throw new Error("'name' precisa ser string")
           }
         
        }
        if( newCursoId !== undefined){
           if(typeof newCursoId !== "string"){
               res.status(400);
               throw new Error("'newCursoId' precisa ser string")
           }
         
        }

        const alunosDATABASE= new AlunosDataBase();
        const alunoExiste= await alunosDATABASE.findAlunosById(id);
        
        if(!alunoExiste){
            res.status(400);
            throw new Error("'id' já existe")
         }

         const newAluno: AlunosDB={
            id: newId || alunoExiste.id,
            name:newName || alunoExiste.name,
            curso_id: newCursoId || alunoExiste.curso_id,
            create_at: newCreateAt || alunoExiste.create_at

         }

         const updateAluno=new Alunos(
            newAluno.id,
            newAluno.name,
            newAluno.curso_id,
            newAluno.create_at
         )

         await alunosDATABASE.updateAluno(id, newAluno);
         res.status(200).send({message: "aluno cadastrado com sucesso", updateAluno})
            

        }catch(error:any){
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

    }


    public deleteAluno=async (req:Request, res:Response)=>{
        try{

            const id= req.params.id;

            if (typeof id !== "string"){
                res.status(400);
                throw new Error("'id' precisa ser string")
            };

            const alunoDB= await new  AlunosDataBase().findAlunosById(id);

            if(!alunoDB){
                res.status(404);
                throw new Error("'id' não encontrado")
            }

            await new AlunosDataBase().deleteAluno(id);

            res.status(200).send("aluno apagado com sucesso!")



        }catch(error:any){
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
    }
}