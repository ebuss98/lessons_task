
export default (sequelize, DataTypes) => {
    let lesson_student = sequelize.define(
        'lesson_student',
        {
            lessonId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            studentId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            visit: {
                allowNull: false,
                type: DataTypes.BOOLEAN
            },
        },
        {
            timestamps: false
        }
    )

    return lesson_student
}