import { z } from "zod";

export interface CreateCoursesInputDTO {
    id: string;
    name: string;
    lessons: number;
    createAt: string
  }
  
  // envia informações
  export interface CreateCoursesOutputDTO {
    message: string;
    courses: {
        id: string;
        name: string;
        lessons: number;
        createdAt: string
    };
  }

  export const CreateCoursesSchema = z.object({
    id: z.string({invalid_type_error: "id deve ser do tipo string", required_error: "'id' é obrigatório",}).min(4), 
    name: z.string({invalid_type_error: "name deve ser do tipo string", required_error: "'name' é obrigatório",}).min(2), 
    lessons: z.number({invalid_type_error: "lessons deve ser um número", required_error: "'lessons' é obrigatório",}).gte(0)
}).transform(data => data as CreateCoursesInputDTO)