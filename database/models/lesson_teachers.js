export default (sequelize, DataTypes) => {

    let lesson_teacher = sequelize.define(
        'lesson_teacher',
        {
            lessonId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },
            teacherId: {
                allowNull: false,
                primaryKey: true,
                type: DataTypes.INTEGER
            },

        },
        {
            timestamps: false
        }
    )
    return lesson_teacher
}