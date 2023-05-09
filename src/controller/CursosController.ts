import { Request, Response } from "express";
import { CursosDataBase } from "../database/CursosDataBase";
import { CursoDB } from "../types";
import { Cursos } from "../models/Curso";

export class CursosController{
    public getCursos=async ( req: Request, res: Response)=>{
        try{
            const cursosDataBase= new CursosDataBase()
            const cursoDB: CursoDB[]= await cursosDataBase.findCursos()


   const cursos= cursoDB.map((cursosDB)=>new Cursos(
    cursosDB.id,
    cursosDB.name,
    cursosDB.quantity
   ))

   res.status(200).send(cursos)

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

    public createCurso= async( req:Request , res: Response)=>{
        try{
            const {id, name , quantity}= req.body ;
         
 
            if (typeof id !== "string"){
                res.status(400);
                throw new Error ("'id' deve ser string")
            }

            if (typeof name !== "string"){
                res.status(400);
                throw new Error ("'name' precisa ser string")
            }
        const newCurso: CursoDB ={
            id ,
            name,
            quantity
        }        

            const cursosDataBase= new CursosDataBase();
          await cursosDataBase.insertCurso(newCurso)

          res.status(200).send({message:"curso criado com sucesso!", curso: newCurso})
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

    public updateCurso=async (req:Request, res:Response)=>{
        try{
            const id=req.params.id;

            const newId= req.body.id;
            const newName= req.body.name;
            const quantAlunos= req.body.quantity;
            if(typeof id !== "string"){
                res.status(400);
                throw new Error("'id' precisa ser string")
            }
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
         if( quantAlunos !== undefined){
            if(typeof newId !== "number"){
                res.status(400);
                throw new Error("'quantAlunis' precisa ser string")
            }
          
         }
    
        const cursoDataBase= new CursosDataBase();
        const  cursoExist= await cursoDataBase.findByIdCursos(id);


         if(!cursoExist){
            res.status(400);
            throw new Error("'id' já existe")
         }
         const newCurso: CursoDB ={
            id : newId || cursoExist.id,
            name: newName || cursoExist.name,
            quantity: quantAlunos || cursoExist.quantity
        } 

        const updateCursos= new Cursos(
            newCurso.id,
            newCurso.name,
            newCurso.quantity
        )

        await  cursoDataBase.updateCurso(id,newCurso)
        res.status(200).send({message: "curso atualizado com sucesso", cursoAtualizado: updateCursos})

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

    public deleteCurso=async (req:Request, res:Response)=>{
        try{
            const id= req.params.id;

            if (typeof id !== "string"){
                res.status(400);
                throw new Error("'id' precisa ser string")
            };

            const cursoDB= await new CursosDataBase().findByIdCursos(id);

            if(!cursoDB){
                res.status(404);
                throw new Error("'id' não encontrado")
            }
 
            await new CursosDataBase().deleteCurso(id);

            res.status(200).send("video deletado com sucesso!")

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