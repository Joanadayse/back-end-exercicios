import { AlunosController } from "../controller/AlunosController";
import { AlunosDB } from "../types";
import { BaseDataBase } from "./baseDataBase";

export class AlunosDataBase extends BaseDataBase{
    public static TABLE_ALUNOS="alunos"

public async findAlunos(){
    const alunosDB: AlunosDB[]= await BaseDataBase.connection(AlunosDataBase.TABLE_ALUNOS)
    return alunosDB
}

public async findAlunosById(id:string){
    const [alunosDB]: AlunosDB[] | undefined= await BaseDataBase.connection(AlunosDataBase.TABLE_ALUNOS).where({id});
    return alunosDB
}

public async insertAlunos(newAlunosDB: AlunosDB):Promise<void>{
    await BaseDataBase.connection(AlunosDataBase.TABLE_ALUNOS).insert(newAlunosDB)
}

public async updateAluno(id:string, newAluno:AlunosDB):Promise<void>{
    await BaseDataBase.connection(AlunosDataBase.TABLE_ALUNOS).where({id}).update(newAluno);
}

public async deleteAluno(id:string):Promise<void>{
    await BaseDataBase.connection(AlunosDataBase.TABLE_ALUNOS).where({id}).del();
}




}