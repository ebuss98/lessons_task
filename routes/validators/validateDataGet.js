import filterObject from "./utils.js";
import { IsPositiveNumber } from './validatorsCommon.js'

async function validateLessonGetMiddleware(req, res, next) {
    try {
        let errors = {}
        if (req.query.lessonsPerPage) {
            errors['lessonsPerPage'] = IsPositiveNumber(req.query.lessonsPerPage)
        }
        if (req.query.page) {
            errors['page'] = IsPositiveNumber(req.query.page)
        }
        const regDate = "[0-9]{4}-(0[1-9]|1[012])-(0[1-9]|1[0-9]|2[0-9]|3[01])"
        if (req.query.date) {
            const dates = req.query.date.split(',')
            if (dates.length === 2) {
                if (dates[0] >= dates[1]) {
                    errors['date'] = 'Wrong dates input: incorrect range'
                }
            }
            for (let date of dates) {
                if (!date.match(regDate) || dates.length > 2) {
                    errors['date'] ='Wrong date input: must be format yyyy-mm-dd, 1 or 2, comma separated'
                }
            }
        }
        if (req.query.status) {
            if (!(req.query.status === '0' || req.query.status === '1')) {
                errors['status'] = 'Wrong status input: must be 0 or 1'
            }
        }
        if (req.query.studentsCount) {
            const students = req.query.studentsCount.split(',')
            if (students.length > 2) {
                errors['studentsCount'] = 'Wrong studentsCount input: must be 1 or 2, comma separated'
            }
            for (let student of students) {
                if (!errors['studentsCount']) errors['studentsCount'] = IsPositiveNumber(student)
            }
        }
        if (req.query.teacherIds) {
            const teachers = req.query.teacherIds.split(',')
            for (let teacher of teachers) {
                if (!errors['teacherIds']) errors['teacherIds'] = IsPositiveNumber(teacher)
            }
        }
        let errorsFiltered = filterObject(errors)
        if (errorsFiltered) {
            res.status(400).json({errors: errorsFiltered})
            return
        }
        next()
    } catch (e) {
        res.status(500).send(e)
        return
    }
}

export default validateLessonGetMiddleware