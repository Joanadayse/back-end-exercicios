export class Cursos{
    constructor(
        private id: string,
        private name : string,
        private quantity: number
    ){}

    public getId():string{
        return this.id
    }
    public setId(value:string):void{
         this.id= value
    }
    public getName():string{
        return this.name
    }
    public setName(value:string):void{
         this.name= value
    }
    public getQuantity():number{
        return this.quantity
    }
    public setQuantity(value:number):void{
         this.quantity= value
    }
}