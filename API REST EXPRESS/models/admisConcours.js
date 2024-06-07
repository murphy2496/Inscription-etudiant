 /**********************************/
/* import des modules necessaires */
const {DataTypes} = require('sequelize')

 /**************************************/
/* définition du modèle admisConcours */

module.exports = (sequelize) => {
    const AdmisConcours = sequelize.define('AdmisConcours', {
        numConcours:{
            type: DataTypes.STRING(20),
            defaultValue: '',
            primaryKey: true
        },
        nom:{
            type: DataTypes.STRING(30),
            defaultValue: '',
            allowNull: false
        },
        prenom:{
            type: DataTypes.STRING(50),
            defaultValue: '',
            allowNull: false
        },
        parcours:{
            type: DataTypes.STRING(40),
            defaultValue: '',
            allowNull: false
        }
    }, { tableName: 'AdmisConcours' })
    return AdmisConcours
}