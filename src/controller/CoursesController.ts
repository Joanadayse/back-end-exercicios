import { Request, Response } from "express";
import { CoursesBussiness } from "../business/CoursesBussiness";
import { BaseError } from "../errors/BaseError";
import { CoursesDataBase } from "../database/CoursesDataBase";
import { BadRequestError } from "../errors/BadRequestError";
import { UpdateCourses } from "../types";

export class CoursesController{
    public getCourses= async( req: Request, res:Response)=>{
        try{
            const coursesBusiness= new CoursesBussiness()
            const result= await coursesBusiness.getCourses()

            res.status(200).send(result)

        }catch(error){
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("error inesperado")
            }

        }
    }
    public createCourses= async( req: Request, res:Response)=>{
        try{

            const input = {
                id: req.body.id,
                name: req.body.name,
                lessons: req.body.lessons
            }
            const coursesBusiness= new CoursesBussiness()
            const result= await coursesBusiness.insertCourses(input)

            res.status(200).send(result)

        }catch(error){
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("error inesperado")
            }

        }
    }

    public deleteCourses= async( req: Request, res:Response)=>{
        try{

        const id= req.params.id;

        console.log(id)


            const coursesBusiness= new CoursesBussiness()
             await coursesBusiness.deleteCourses(id)

            res.status(200).send("Courses deletado com sucesso!")

        }catch(error){
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("error inesperado")
            }

        }
    }

    public updateCourses= async(req:Request , res: Response)=>{
        try{
            const id= req.params.id;


            const newId= req.body.id;
            const newName= req.body.name;
            const newLessons= req.body.lessons;

            const input: UpdateCourses={
                newId,
                newName,
                newLessons
            }

            const coursesBusiness= new CoursesBussiness();
            const result = await coursesBusiness.updateCourses(input,id)

            res.status(200).send(result)

     



        }catch(error){
            if(error instanceof BaseError){
                res.status(error.statusCode).send(error.message)
            }else{
                res.status(500).send("error inesperado")
            }

        }
    }
}
