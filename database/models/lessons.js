export default (sequelize, DataTypes) => {

    let lesson = sequelize.define(
        'lesson',
        {
            // id: {
            //     allowNull: false,
            //     primaryKey: true,
            //     autoIncrement: true,
            //     type: DataTypes.INTEGER
            // },
            date: {
                allowNull: false,
                type: DataTypes.DATE
            },
            title: {
                allowNull: false,
                type: DataTypes.STRING(300)
            },
            status: {
                allowNull: false,
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },

        },
        {
            timestamps: false
        }
    )

    return lesson
}