import Sequelize from 'sequelize'
import pgConfig from './config.js'

import lessons from './models/lessons.js'
import students from './models/students.js'
import teachers from './models/teachers.js'
import lesson_teachers from './models/lesson_teachers.js'
import lesson_students from './models/lesson_students.js'

// Sequelize.DATE.prototype._stringify = function _stringify(date, options) {
//     return this._applyTimezone(date, options).format('YYYY-MM-DD HH:mm:ss.SSS');
// };
console.log(process.env.NODE_ENV)
const config = pgConfig[process.env.NODE_ENV]
const sequelize = process.env.DATABASE_URL ?
    new Sequelize(process.env.DATABASE_URL, config) :
    new Sequelize(config.database, config.username, config.password, config)

const db = {}

db.lessons = lessons(sequelize, Sequelize.DataTypes)
db.students = students(sequelize, Sequelize.DataTypes)
db.teachers = teachers(sequelize, Sequelize.DataTypes)
db.lesson_teachers = lesson_teachers(sequelize, Sequelize.DataTypes)
db.lesson_students = lesson_students(sequelize, Sequelize.DataTypes)


db.lessons.belongsToMany(db.teachers, {through: db.lesson_teachers})
db.teachers.belongsToMany(db.lessons, {through: db.lesson_teachers})
db.lessons.belongsToMany(db.students, {through: db.lesson_students})
db.students.belongsToMany(db.lessons, {through: db.lesson_students})

db.sequelize = sequelize
db.Sequelize = Sequelize
db.op = Sequelize.Op
db.fn = Sequelize.fn


export default db