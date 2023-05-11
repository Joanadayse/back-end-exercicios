import { CoursesDataBase } from "../database/CoursesDataBase"
import { BadRequestError } from "../errors/BadRequestError";
import { Courses } from "../models/Courses";
import { CousersDB, UpdateCourses } from "../types";

export class CoursesBussiness{
    public getCourses= async()=>{
        const coursesDataBase= new CoursesDataBase();
        const coursesDB: CousersDB[]= await coursesDataBase.findCourses()

        const courses= coursesDB.map((coursesDB)=> new Courses(
            coursesDB.id,
            coursesDB.name,
            coursesDB.lessons
        ))

        return courses
    }
    public insertCourses= async(input: CousersDB)=>{
        const { id, name , lessons}= input

        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        if (typeof name !== "string") {
            throw new BadRequestError("'name' deve ser string")
        }
        if (typeof lessons !== "number") {
            throw new BadRequestError("'lessons' deve ser string")
        }

        const coursesDataBase= new CoursesDataBase();
        const coursesDB= await coursesDataBase.findCoursesById(id)

        if(coursesDB){
            throw new BadRequestError("'id' ja existe")
        }

        const newCourses= new Courses(
            id,
            name,
            lessons
        )

        const newCoursesDB: CousersDB= {
            id: newCourses.getId(),
            name: newCourses.getName(),
            lessons: newCourses.getLessons()
        }

        await coursesDataBase.createCourses(newCoursesDB)

        const result={
            message: "Courses criado com sucesso!",
            courses: newCourses
        }
        

        return result
        
    }
    public deleteCourses= async(id:string)=>{


        if (typeof id !== "string") {
            throw new BadRequestError("'id' deve ser string")
        }

        const coursesDB= await new CoursesDataBase().findCoursesById(id)

        if(!coursesDB){
            throw new BadRequestError("'id' ja existe")
        }

        const courseDB= new CoursesDataBase();
        await courseDB.deleteCourses(id);

    //    const output={
    //     message: "Course deletado com sucesso!",
    //    }  
    //    return output

        
    }

    public updateCourses= async(input: UpdateCourses, id:string)=>{

        const { newId, newName, newLessons}= input
           
        if( newId !== undefined){
            if(typeof newId !== "string"){
                throw new BadRequestError("'id' precisa ser string")
            }
            if( newId.length == 4){
 
                throw new BadRequestError("'id' precisa ter 4 caractes")
            }
         }
         if( newName !== undefined){
            if(typeof newName !== "string"){
                throw new BadRequestError("'name' precisa ser string")
            }
          
         }
         if( newLessons !== undefined){
            if(typeof newLessons !== "number"){
                throw new BadRequestError("'newLessons' precisa ser number")
            }
          
         }
 
         const coursesDATABASE= new CoursesDataBase();
         const coursesExiste= await coursesDATABASE.findCoursesById(id);
         
         if(!coursesExiste){
             throw new BadRequestError("'id' já existe")
          }
 
          const newCourses: CousersDB={
             id: newId || coursesExiste.id,
             name:newName || coursesExiste.name,
             lessons: newLessons || coursesExiste.lessons,
 
          }
 
       
 
          await coursesDATABASE.editCourses(id, newCourses);

          const result={
            message: "Courses atualizado com sucesso!",
            courses: newCourses
        }
        

        return result
       
             
    }
}