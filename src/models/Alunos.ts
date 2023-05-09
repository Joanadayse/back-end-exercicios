export  class Alunos{
    constructor(
        private id: string,
        private name: string,
        private cursoId: string,
        private createAt: string
    ){}

    public getId():string{
        return this.id
    }
    public setId(value:string):void{
         this.id = value
    }
    public getName():string{
        return this.name
    }
    public setName(value:string):void{
         this.name = value
    }
    public getCursoId():string{
        return this.cursoId
    }
    public setCursoId(value:string):void{
         this.cursoId = value
    }
    public getCreateAt():string{
        return this.createAt
    }
    public setCreateAt(value:string):void{
         this.createAt = value
    }


}