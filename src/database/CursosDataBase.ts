import { CursoDB } from "../types";
import { BaseDataBase } from "./baseDataBase";

export class CursosDataBase extends BaseDataBase{
    public static TABLE_CURSOS= "curso"

    public async findCursos(){
        const cursosDB: CursoDB[]= await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS)
        return cursosDB
    }

    public async findByIdCursos(id:string){
        const [cursosDB]: CursoDB[] | undefined[]= await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS).where({id});
        return cursosDB

    }

    public async insertCurso(newCursoDB: CursoDB):Promise<void>{
         await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS).insert(newCursoDB)
    }

    public async updateCurso(id:string, newCurso:CursoDB):Promise<void>{
        await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS).where({id}).update(newCurso);
    }

    public async deleteCurso(id:string){
        await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS).where({id}).del()
    }
    public async deleteForkey(id:string){
        await BaseDataBase.connection(CursosDataBase.TABLE_CURSOS).where({id}).del()
    }
}