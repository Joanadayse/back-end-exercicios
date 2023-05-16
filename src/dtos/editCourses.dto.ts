import { z } from "zod";

export interface EditCoursesInputDTO {
    idToEdit:string
    id?: string;
    name?: string;
    lessons?: number;
  }
  
  // envia informações
  export interface EditCoursesOutputDTO {
    message: string;
    courses: {
        id: string;
        name: string;
        lessons: number;
        createdAt: string
    };
  }

  export const EditCoursesSchema = z.object({
    idToEdit:z.string().min(4),
    id: z.string({invalid_type_error: "id deve ser do tipo string"}).min(4).optional(), 
    name: z.string({invalid_type_error: "name deve ser do tipo string"}).min(2).optional(), 
    lessons: z.number({invalid_type_error: "lessons deve ser um número"}).gte(0).optional()
}).transform(data => data as EditCoursesInputDTO)