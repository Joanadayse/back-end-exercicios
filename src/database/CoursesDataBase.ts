import { CousersDB } from "../types";
import { BaseDataBase } from "./BaseDataBase";

export class CoursesDataBase extends BaseDataBase{
    public static TABLE_COURSES= "courses"

    public async findCourses(){
        const coursesDB: CousersDB[]= await BaseDataBase.connection(CoursesDataBase.TABLE_COURSES)

        return coursesDB
    }

    public async findCoursesById(id:string){
        const [courseDB]: CousersDB[] | undefined[]= await BaseDataBase.connection(CoursesDataBase.TABLE_COURSES).where({id})
        return courseDB
    }

    public async createCourses(newCourses: CousersDB){
        await BaseDataBase.connection(CoursesDataBase.TABLE_COURSES).insert(newCourses)
    }
    public async deleteCourses(id:string){
        await BaseDataBase.connection(CoursesDataBase.TABLE_COURSES).where({id}).del()
    }

    public async editCourses(id:string, newCourses: CousersDB):Promise<void>{
        await BaseDataBase.connection(CoursesDataBase.TABLE_COURSES).where({id}).update(newCourses)
    }
}