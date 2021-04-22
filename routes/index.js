import {Router} from 'express';
import db from "../database/index.js";
import validateLessonGetMiddleware from "./validators/validateDataGet.js";

const router = Router();

router.get('/', validateLessonGetMiddleware, async function (req, res) {
    try {
        const lessonsPerPage = req.query.lessonsPerPage || 5
        const page = req.query.page || 1
        let filterObject = {}
        const regDate = "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"

        if (req.query.date) {
            let datesArray = req.query.date.split(',').map(elem => {
                let date = new Date(elem)
                return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 0, 0, 0)
            })
            if (datesArray.length === 2) {
                datesArray[1] = new Date(
                    datesArray[1].getFullYear(),
                    datesArray[1].getMonth(),
                    datesArray[1].getDate() + 1,
                    0,
                    0,
                    0
                )
                filterObject.date = {
                    [db.op.between]:
                    datesArray
                }
            } else {
                let nextDay = new Date(
                    datesArray[0].getFullYear(),
                    datesArray[0].getMonth(),
                    datesArray[0].getDate() + 1,
                    0,
                    0,
                    0
                )
                filterObject.date = {
                    [db.op.between]: [
                        datesArray[0],
                        nextDay
                    ]
                }
            }
        }
        if (req.query.status)
            filterObject.status = req.query.status

        let teachers;
        if (req.query.teacherIds) {
            teachers = req.query.teacherIds.split(',').map(elem => parseInt(elem))
        }

        let studentsCount;
        if (req.query.studentsCount) {
            const students = req.query.studentsCount.split(',')
            studentsCount = students.map(elem => parseInt(elem))
        }

        let rawResult = await db.lessons.findAll({
            where: filterObject,
            include: [
                {
                    model: db.students,
                    as: 'students',
                    attributes: ['id', 'name'],
                },
                {
                    model: db.teachers,
                    as: 'teachers',
                    attributes: ['id', 'name']
                },
            ],
            offset: parseInt(lessonsPerPage) * (parseInt(page) - 1),
            limit: parseInt(lessonsPerPage),
        })


        if (req.query.studentsCount) {
            if (studentsCount.length === 1) {
                rawResult = rawResult.filter(elem => elem.dataValues.students.length === studentsCount[0])
            } else {
                rawResult = rawResult.filter(elem => elem.dataValues.students.length >= studentsCount[0] && elem.dataValues.students.length <= studentsCount[1])
            }
        }

        if (req.query.teacherIds) {
            rawResult = rawResult.filter(elem => {
                let localIds = elem.dataValues.teachers.map(elem => elem.id)
                return localIds.some(ai => teachers.includes(ai))
            })
        }
        let result = rawResult.map((elem) => {
            return {
                id: elem.dataValues.id,
                date: elem.dataValues.date.toISOString().substring(0, 10),
                title: elem.dataValues.title,
                status: elem.dataValues.status ? 1 : 0,
                visitCount: elem.dataValues.students.reduce((sum, current) => {
                    if (current.lesson_student.visit) {
                        return sum + 1
                    }
                }, 0),
                students: elem.dataValues.students.map((elem) => {
                    return {
                        id: elem.id,
                        name: elem.name,
                        visit: elem.lesson_student.visit
                    }
                }),
                teachers: elem.dataValues.teachers.map((elem) => {
                    return {
                        id: elem.id,
                        name: elem.name
                    }
                })
            }
        })
        res.json(result)
    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }
});
export default router
