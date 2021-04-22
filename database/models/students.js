export default (sequelize, DataTypes) => {

    let student = sequelize.define(
        'student',
        {
            id: {
                allowNull: false,
                primaryKey: true,
                autoIncrement: true,
                type: DataTypes.INTEGER
            },
            name: {
                allowNull: false,
                type: DataTypes.STRING(300)
            },
        },
        {
            timestamps: false
        }
    )

    return student
}