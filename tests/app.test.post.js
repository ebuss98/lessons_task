import app from '../app.js'
import request from 'supertest'
import db from "../database/index.js";

let sync = db.sequelize.sync({force: true})
let creating
let testIds = [1,2,3,4,5,6,7,8,9,10]
describe('sync', function () {
    before('db sync', async function () {
        await sync
        creating = db.teachers.bulkCreate([{
            id: 1,
            name: "Ivan",
        },{
            id: 2,
            name: "Nikolai",
        },{
            id: 3,
            name: "Sergei",
        },{
            id: 4,
            name: "Natalya",
        }])
        return creating
    }),

        it('Post should return status 200', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": [1,3],
                    "title": "test title",
                    "firstDate": "2020-01-01",
                    "days": [1, 2, 4],
                    "lessonsCount": 10
                })
                .expect(200)
                .expect([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
                .end(done)
        }),

        it('Post should return status 400(date)', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": [1, 3],
                    "title": "test title",
                    "firstDate": "2020-01-f1",
                    "days": [1, 2, 4],
                    "lessonsCount": 10
                })
                .expect(400)
                .expect({"errors":{"firstDate":"Wrong date input"}})
                .end(done)
        }),

        it('Post should return status 400(teacherIds)', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": 1,
                    "title": "test title",
                    "firstDate": "2020-01-01",
                    "days": [1, 2, 4],
                    "lessonsCount": 10
                })
                .expect(400)
                .expect({ errors: { teacherIds: 'Wrong input: must be array' } })
                .end(done)
        }),

        it('Post should return status 400(teacherIds)', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": [1,"3"],
                    "title": "test title",
                    "firstDate": "2020-01-01",
                    "days": [1, 2, 4],
                    "lessonsCount": 10
                })
                .expect(400)
                .expect({
                    errors: { teacherIds: 'Wrong array input: elements must be Number' }
                })
                .end(done)
        }),
        it('Post should return status 400(title)', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": [1,3],
                    "title": 3,
                    "firstDate": "2020-01-01",
                    "days": [1, 2, 4],
                    "lessonsCount": 10
                })
                .expect(400)
                .expect({ errors: { title: 'Wrong title input: must be string' }})
                .end(done)
        }),
        it('Post should return status 400(lastDate and lessonsCount both)', function (done) {
            request(app)
                .post("/lessons")
                .send({
                    "teacherIds": [1,3],
                    "title": "test title",
                    "firstDate": "2020-01-01",
                    "days": [1, 2, 4],
                    "lessonsCount": 10,
                    "lastDate": "2020-01-01",
                })
                .expect(400)
                .expect({
                    errors: {
                        lessonsCount: 'Parameters lastDate and lessonsCount are mutually exclusive'
                    }
                })
                .end(done)
        }),
    it('Post should return status 400(missing parameters)', function (done) {
        request(app)
            .post("/lessons")
            .send({
                "title": "test title",
                "firstDate": "2020-01-01",
                "days": [1, 2, 4],
                "lessonsCount": 10
            })
            .expect(400)
            .expect({
                errors: {
                    parameters: 'Missing parameters',
                    teacherIds: 'Wrong input: must be array'
                }
            })
            .end(done)
    })
})