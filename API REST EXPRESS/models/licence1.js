 /**********************************/
/* import des modules necessaires */
const {DataTypes} = require('sequelize')

 /*********************************/
/* définition du modèle licence1 */

module.exports = (sequelize) => {
    const Licence1 = sequelize.define('Licence1',{
        matricule:{
            type: DataTypes.STRING(20),
            defaultValue: '',
            primaryKey: true,
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
        datenais:{
            type: DataTypes.DATEONLY,
            allowNull: false
        },
        adresse:{
            type: DataTypes.STRING(100),
            defaultValue: '',
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
        email:{
            type: DataTypes.STRING(150),
            validate:{
                isEmail: true
            }, 
            allowNull: false
        },
        parcours:{
            type: DataTypes.STRING(40),
            defaultValue: '',
            allowNull: false
        }
    }, { tableName: 'Licence1' })

    Licence1.beforeCreate(async (student, options) => {
        const dernierMatricule = await Licence1.findOne({  // récuperer le dernier matricule du modèle
            order: [['matricule', 'DESC']]
        })

        let prochainMatricule
        if (dernierMatricule) {
        
            let dernierNumero = parseInt(dernierMatricule.matricule, 10) // convertit une chaîne de caractères en un entier (entier décimal base 10)
            if (dernierNumero >= 2000 && dernierNumero < 2009) {
             
                prochainMatricule = (dernierNumero + 1).toString()  // convertit un nombre en une chaîne de caractères
            } else {
             
                prochainMatricule = (dernierNumero + 1).toString()
            }
        } else {
            prochainMatricule = "2000"
        }
        
        student.matricule = prochainMatricule
    })

    return Licence1
}