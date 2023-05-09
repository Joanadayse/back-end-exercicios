import { CursosDataBase } from "../database/CursosDataBase";
import { Cursos } from "../models/Curso";
import { CursoDB, UpdateCursos } from "../types";

export class CursoBussiness {
  public getCursos = async () => {
    const cursosDataBase = new CursosDataBase();
    const cursoDB: CursoDB[] = await cursosDataBase.findCursos();

    const cursos = cursoDB.map(
      (cursosDB) => new Cursos(cursosDB.id, cursosDB.name, cursosDB.quantity)
    );

    return cursos
  };

  public createCurso= async(input: CursoDB)=>{
    const {id, name , quantity}= input;
    if (typeof id !== "string"){   
        throw new Error ("'id' deve ser string")
    }

    if (typeof name !== "string"){
        throw new Error ("'name' precisa ser string")
    }

    const cursoDATABASE= new CursosDataBase();
    const cursoExiste= await cursoDATABASE.findByIdCursos(id);

    if(cursoExiste){
        throw new Error("'id' já existe")
     }
const newCurso: CursoDB ={
    id ,
    name,
    quantity
}   

const newCursoDB: CursoDB={
    id: newCurso.id,
    name: newCurso.name,
    quantity: newCurso.quantity
}

    const cursosDataBase= new CursosDataBase();
  await cursosDataBase.insertCurso(newCursoDB)


return newCurso

  }

  public updateCurso=async (input: UpdateCursos, id:string) => {

    const {newId,newName,newQuantity}= input

 if( newId !== undefined){
    if(typeof newId !== "string"){
        throw new Error("'id' precisa ser string")
    }
    if( newId.length == 4){
        throw new Error("'id' precisa ter 4 caractes")
    }
 }
 if( newName !== undefined){
    if(typeof newName !== "string"){
        throw new Error("'name' precisa ser string")
    }
  
 }
 if( newQuantity !== undefined){
    if(typeof newQuantity !== "number"){
        throw new Error("'newQuantity' precisa ser NUMBER")
    }
  
 }

const cursoDataBase= new CursosDataBase();
const  cursoExist= await cursoDataBase.findByIdCursos(id);


 if(!cursoExist){
    throw new Error("'id' já existe")
 }
 const newCurso: CursoDB ={
    id : newId || cursoExist.id,
    name: newName || cursoExist.name,
    quantity: newQuantity || cursoExist.quantity
} 


await  cursoDataBase.updateCurso(id,newCurso)
    
  }

  public deleteCurso= async(id:string)=>{
    if (typeof id !== "string"){
        throw new Error("'id' precisa ser string")
    };

    const cursoDB= await new CursosDataBase().findByIdCursos(id);

    if(!cursoDB){
        throw new Error("'id' não encontrado")
    }
    
    const cursoDataBase= new CursosDataBase();
    await cursoDataBase.deleteCurso(id);

  }
}
