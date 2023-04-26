export class Videos{
    constructor(
        private id : string,
        private titulo: string,
        private duracao: number,
        private create_at: string
    ){}

    getId():string{
        return this.id
    }
    getTitulo():string{
        return this.titulo
    }
    getDuracao():number{
        return this.duracao
    }

    getCreateAt():string{
        return this.create_at
    }


}