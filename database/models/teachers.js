export default (sequelize, DataTypes) => {

    let teacher = sequelize.define(
        'teacher',
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

    return teacher
}