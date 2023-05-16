import { CourseDatabase } from "../database/CourseDatabase"
import { CreateCoursesInputDTO, CreateCoursesOutputDTO } from "../dtos/createCourses.dto"
import { DeletyIdCoursesInputDTO, DeletyIdCoursesOutputDTO } from "../dtos/deleteCourses.dto"
import { EditCoursesInputDTO, EditCoursesOutputDTO } from "../dtos/editCourses.dto"
import { BadRequestError } from "../errors/BadRequestError"
import { NotFoundError } from "../errors/NotFoundError"
import { CourseDB } from "../models/Course"
import { Course } from "../models/Course"

export class CourseBusiness {
 constructor(
  public courseDatabase : CourseDatabase
 ){}


  public getCourses = async (input: any) => {
    const { q } = input

   
    const coursesDB = await this.courseDatabase.findCourses(q)

    const courses: Course[] = coursesDB.map((courseDB) => new Course(
      courseDB.id,
      courseDB.name,
      courseDB.lessons,
      courseDB.created_at
    ))

    const output  = courses.map(course => ({
      id: course.getId(),
      name: course.getName(),
      lessons: course.getLessons(),
      createdAt: course.getCreatedAt()
    }))

    return output
  }

  public createCourse = async (input: CreateCoursesInputDTO): Promise<CreateCoursesOutputDTO> => {
    const { id, name, lessons } = input


    const courseDBExists = await this.courseDatabase.findCourseById(id)

    if (courseDBExists) {
      throw new BadRequestError("'id' já existe")
    }

    const newCourse = new Course(
      id,
      name,
      lessons,
      new Date().toISOString()
    )

    const newCourseDB: CourseDB = {
      id: newCourse.getId(),
      name: newCourse.getName(),
      lessons: newCourse.getLessons(),
      created_at: newCourse.getCreatedAt()
    }

    await this.courseDatabase.insertCourse(newCourseDB)

    const output : CreateCoursesOutputDTO = {
      message: "Curso registrado com sucesso",
      courses: {
        id: newCourse.getId(),
        name: newCourse.getName(),
        lessons: newCourse.getLessons(),
        createdAt: newCourse.getCreatedAt()
      }
    }

    return output
  }

  public editCourse = async (input: EditCoursesInputDTO): Promise <EditCoursesOutputDTO> => {
    const {
      idToEdit,
      id,
      name,
      lessons
    } = input


    const courseToEditDB = await this.courseDatabase.findCourseById(idToEdit)

    if (!courseToEditDB) {
      throw new NotFoundError("'id' para editar não existe")
    }

    const course = new Course(
      courseToEditDB.id,
      courseToEditDB.name,
      courseToEditDB.lessons,
      courseToEditDB.created_at
    )

    id && course.setId(id)
    name && course.setName(name)
    lessons && course.setLessons(lessons)

    const updatedCourseDB: CourseDB = {
      id: course.getId(),
      name: course.getName(),
      lessons: course.getLessons(),
      created_at: course.getCreatedAt()
    }

    await this.courseDatabase.updateCourse(idToEdit, updatedCourseDB)

    const output : EditCoursesOutputDTO= {
      message: "Curso editado com sucesso",
      courses: {
        id: course.getId(),
        name: course.getName(),
        lessons: course.getLessons(),
        createdAt: course.getCreatedAt()
      }
    }

    return output
  }

  public deleteCourse = async (input: DeletyIdCoursesInputDTO) : Promise<DeletyIdCoursesOutputDTO>=> {
    const { idToDelete } = input

    const courseToDeleteDB = await this.courseDatabase.findCourseById(idToDelete)

    if (!courseToDeleteDB) {
      throw new NotFoundError("'id' para deletar não existe")
    }

    const course = new Course(
      courseToDeleteDB.id,
      courseToDeleteDB.name,
      courseToDeleteDB.lessons,
      courseToDeleteDB.created_at
    )

    await this.courseDatabase.deleteCourseById(courseToDeleteDB.id)

    const output : DeletyIdCoursesOutputDTO = {
      message: "Curso deletado com sucesso",
      courses: {
        id: course.getId(),
        name: course.getName(),
        lessons: course.getLessons(),
        createdAt: course.getCreatedAt()
      }
    }

    return output
  }
}