 /**********************************/
/* import des modules necessaires */
const { DataTypes } = require('sequelize')

 /************************************/
/* définition du modèle inscription */

module.exports = (sequelize) => {
    const Inscription = sequelize.define('Inscription',{
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
        datenais:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        adresse:{
            type: DataTypes.STRING(100),
            defaultValue: '',
            allowNull: false
        },
        numConcours:{
            type: DataTypes.STRING(20),
            defaultValue: '',
            unique: true,
            allowNull: false
        },
        nomImageBordereau:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        pathImageBordereau:{
            type: DataTypes.STRING(80),
            allowNull: false
        },
        email:{
            type: DataTypes.STRING(150),
            validate:{
                isEmail: true
            },
            allowNull: false
        },
        nomImageEtudiant:{
            type: DataTypes.STRING(70),
            allowNull: false
        },
        pathImageEtudiant:{
            type:  DataTypes.STRING(80),
            allowNull: false
        },
        parcours:{
            type: DataTypes.STRING(40),
            defaultValue: '',
            allowNull: false
        },
        notifVu: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { tableName: 'Inscription' }, { paranoid: true })
    
    // modifier l'état de la notification inscription d'un étudiant en true (1)
    Inscription.prototype.updateStatus = async function () {
        this.notifVu = true
        await this.save()
        return this
    }
    
    return Inscription
}