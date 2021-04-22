import { NumberArrayValidation, DateValidation } from "./validatorsCommon.js";

async function validateLessonPostMiddleware(req, res, next) {
    try {
        let errors = {}

        if (!req.body.teacherIds ||
            !req.body.title ||
            !req.body.days ||
            !req.body.firstDate ||
            !(req.body.lessonsCount || req.body.lastDate)
        ) {
            errors['parameters'] = 'Missing parameters'
        }

        if (req.body.lessonsCount && req.body.lastDate) {
            errors['lessonsCount'] = 'Parameters lastDate and lessonsCount are mutually exclusive'
        }

        errors['teacherIds'] = NumberArrayValidation(req.body.teacherIds)

        errors['days'] = NumberArrayValidation(req.body.days)

        if (req.body.lessonsCount) {
            const lessonsCount = req.body.lessonsCount
            if (!Number.isInteger(lessonsCount)) {
                errors['lessonsCount'] = 'Wrong lessons count input: must be number'
            }
            else if (parseInt(lessonsCount) < 0) {
                errors['lessonsCount'] = 'Wrong lessons count input: must be positive number'
            }
        }

        if (req.body.lastDate) {
            errors['lastDate'] = DateValidation(req.body.lastDate)
        }

        errors['firstDate'] = DateValidation(req.body.firstDate)

        const title = req.body.title
        if (typeof(title) !== "string") {
            errors['title'] = 'Wrong title input: must be string'
        }

        errors = Object.entries(errors).reduce((acc, [key, value]) => {
            if (value) acc[key] = value
            return acc
        }, {})
        if (Object.keys(errors).length > 0) return res.status(400).json({ errors })

        next()

    } catch (e) {
        console.log(e)
        res.status(500).json(e)
    }

}

export default validateLessonPostMiddleware