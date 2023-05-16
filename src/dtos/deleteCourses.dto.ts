

export interface DeletyIdCoursesInputDTO {
    idToDelete: string;
  }
  
  // envia informações
  export interface DeletyIdCoursesOutputDTO {
    message: string;
    courses: {
        id: string;
        name: string;
        lessons: number;
        createdAt: string
    };
  }

