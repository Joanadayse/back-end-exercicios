import { Request, Response } from "express";
import { CursosDataBase } from "../database/CursosDataBase";
import { CursoDB, UpdateCursos } from "../types";
import { Cursos } from "../models/Curso";
import { CursoBussiness } from "../bussiness/CursoBussiness";

export class CursosController{
    public getCursos=async ( req: Request, res: Response)=>{
        try{

            const cursosBussiness= new CursoBussiness();
            const result= await cursosBussiness.getCursos();
          

   res.status(200).send(result)

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
            // const {id, name , quantity}= req.body ;

            const input={
                id:req.body.id,
                name:req.body.name,
                quantity: req.body.quantity
            }

            const cursoBussiness= new CursoBussiness();
            const result= await cursoBussiness.createCurso(input)

          res.status(200).send({message:"curso criado com sucesso!", result})
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
            const newQuantity= req.body.quantity;

            const input: UpdateCursos={
                newId,
                newName,
                newQuantity
            }

            const cursosBussiness= new CursoBussiness();
            const result = await cursosBussiness.updateCurso(input, id)
     
        res.status(200).send({message: "curso atualizado com sucesso", result})

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

        
    }}

    public deleteCurso=async (req:Request, res:Response)=>{
        try{
            const id= req.params.id;
            const cursoBussiness= new CursoBussiness();
            await cursoBussiness.deleteCurso(id)

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