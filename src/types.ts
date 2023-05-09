export interface CursoDB{
    id: string,
    name: string,
    quantity: number
}
export interface UpdateCursos{
    newId: string,
    newName: string,
    newQuantity: number
}



export interface AlunosDB{
    id: string,
    name: string,
    curso_id: string,
    create_at: string
}