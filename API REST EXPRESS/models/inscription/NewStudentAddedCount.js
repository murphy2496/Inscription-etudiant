 /**********************************/
/* import des modules necessaires */
const {DataTypes} = require('sequelize')

 /*********************************************************/
/* définition du modèle Compter notification inscription */

module.exports = (sequelize) => {
    const NewStudentAddedCount= sequelize.define('NewStudentAddedCount',{
        count:{
            type: DataTypes.STRING(20),
            defaultValue: '',
            unique: true 
        },
    }, { tableName: 'NewStudentAddedCount' })
    
    return NewStudentAddedCount
}