import { Router } from 'express'
import db from "../database/index.js";
import validateLessonPostMiddleware from "./validators/validateDataPost.js";
const router = Router();


router.post("/", validateLessonPostMiddleware, async function (req, res, next) {
  try {

    let teacherIds = req.body.teacherIds
    let firstDate = new Date(req.body.firstDate)
    let limitDate = new Date(firstDate.getFullYear() + 1, firstDate.getMonth(), firstDate.getDate())
    let currentDate = firstDate
    let lessonsCreated = 0
    let days = req.body.days
    let result;
    let resultArray = []
    while (true) {

      if (req.body.lessonsCount) {
        if (lessonsCreated >= req.body.lessonsCount) {
          break
        }
      }

      if (req.body.lastDate) {
        if (currentDate > new Date(req.body.lastDate)) {
          break
        }
      }

      if ((currentDate > limitDate) || (lessonsCreated === 300)) {
        break
      }

      if (days.includes(currentDate.getDay())) {
        await db.sequelize.transaction( async t => {
          result = await db.lessons.create(
              {
                title: req.body.title,
                date: currentDate,
              },
              {
                transaction: t
              }
          )
          for (let teacherId of teacherIds) {
            await db.lesson_teachers.create({
                  teacherId: teacherId,
                  lessonId: result.dataValues.id
                },
                {
                  transaction: t
                }
            )
          }
        })
        resultArray.push(result.dataValues.id)
        lessonsCreated++
      }
      currentDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 1)
    }
    console.log(resultArray)
    res.send(resultArray)
  }
  catch (e) {
    res.status(500).json(e)
  }
});

export default router
