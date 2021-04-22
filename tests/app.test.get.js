import app from '../app.js'
import request from 'supertest'
import db from "../database/index.js";


let sync = db.sequelize.sync({force: true})
const date = Date.now()
const testObject = {
    title: 'Test',
    date
}
let creating
let testRow
describe('sync', function () {
    //this.timeout(10000)
    before('creating test rows', async function () {
        await sync
        creating = db.lessons.bulkCreate([{
            title: 'Test1',
            date: '2020-01-01',
            status: true
        },{
            title: 'Test2',
            date: '2020-01-02',
            status: false
        },{
            title: 'Test3',
            date: '2020-01-03',
            status: true
        },{
            title: 'Test4',
            date: '2020-01-04',
            status: false
        },{
            title: 'Test5',
            date: '2020-01-05',
            status: true
        },{
            title: 'Test6',
            date: '2020-01-06',
            status: false
        }])
        return creating
    }),
        after('destroy test rows', async function () {
            return await db.lessons.destroy({where: testObject})
        }),

        it('Get request should return status 200', function (done) {
            request(app)
                .get("/")
                .expect(200)
                .expect([
                    {
                        id: 2,
                        date: '2020-01-02',
                        title: 'Test2',
                        status: 0,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 5,
                        date: '2020-01-05',
                        title: 'Test5',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 4,
                        date: '2020-01-04',
                        title: 'Test4',
                        status: 0,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 1,
                        date: '2020-01-01',
                        title: 'Test1',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 3,
                        date: '2020-01-03',
                        title: 'Test3',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    }
                ])
                .end(done);
        }),

        it('Get request should return status 200', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?status=1")
                .expect(200)
                .expect([
                    {
                        id: 5,
                        date: '2020-01-05',
                        title: 'Test5',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 1,
                        date: '2020-01-01',
                        title: 'Test1',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 3,
                        date: '2020-01-03',
                        title: 'Test3',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    }
                ])
                .end(done);
        }),
        it('Get request should return status 200', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?date=2020-01-01,2020-01-06&page=2")
                .expect(200)
                .expect([
                    {
                        id: 6,
                        date: '2020-01-06',
                        title: 'Test6',
                        status: 0,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    }
                ])
                .end(done);
        }),
        it('Get request should return status 200', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?date=2020-01-01,2020-01-10&page=2&lessonsPerPage=3")
                .expect(200)
                .expect([
                    {
                        id: 4,
                        date: '2020-01-04',
                        title: 'Test4',
                        status: 0,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 5,
                        date: '2020-01-05',
                        title: 'Test5',
                        status: 1,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    },
                    {
                        id: 6,
                        date: '2020-01-06',
                        title: 'Test6',
                        status: 0,
                        visitCount: 0,
                        students: [],
                        teachers: []
                    }
                ])
                .end(done);
        }),
        it('Get request should return status 400 (invalid date)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?date=sdf")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "date": "Wrong date input: must be format yyyy-mm-dd, 1 or 2, comma separated",
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (invalid date)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?date=2019-11-02,")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "date": "Wrong date input: must be format yyyy-mm-dd, 1 or 2, comma separated",
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (invalid page)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?page=sfa")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "page": "Wrong input: must be positive Number"
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (invalid lessonsPerPage)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?lessonsPerPage=sfa")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "lessonsPerPage": "Wrong input: must be positive Number"
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (Wrong status)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?status=2")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "status": "Wrong status input: must be 0 or 1"
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (negative studentsCount)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?studentsCount=1,-2")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "studentsCount": "Wrong input: must be positive Number",
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (studentsCount>2)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?studentsCount=1,2,3")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "studentsCount": "Wrong studentsCount input: must be 1 or 2, comma separated"
                        }
                    }
                )
                .end(done);
        }),
        it('Get request should return status 400 (negative teacher id)', function (done) {
            console.log(process.env.NODE_ENV)
            request(app)
                .get("/?teacherIds=1,-2,3")
                .expect(400)
                .expect(
                    {
                        "errors": {
                            "teacherIds": "Wrong input: must be positive Number"
                        }
                    }
                )
                .end(done);
        })
});
