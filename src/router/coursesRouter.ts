import  express  from "express"
import { CoursesController } from "../controller/CoursesController"

export const coursesRouter= express.Router()
const coursesController= new CoursesController()

coursesRouter.get("/",coursesController.getCourses )
coursesRouter.post("/",coursesController.createCourses)
coursesRouter.delete("/:id",coursesController.deleteCourses)
coursesRouter.put("/:id",coursesController.updateCourses)