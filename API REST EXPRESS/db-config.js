 /***********************************/
/* import des modules néccessaires */
const {Sequelize} = require('sequelize')

 /**********************************/
/* connexion à la base de données */
let sequelize = new Sequelize(
    process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mysql',
        logging: false
    }
)

 /*******************************/
/* mise en place des relations */
const db = {}

db.sequelize = sequelize
db.Utilisateur = require('./models/utilisateur')(sequelize)
db.AdmisConcours = require('./models/admisConcours')(sequelize)
db.Licence1 = require('./models/licence1')(sequelize)

db.Inscription = require('./models/inscription/inscription')(sequelize)
db.NewStudentAddedCount = require('./models/inscription/NewStudentAddedCount')(sequelize)

/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
db.Inscription.beforeCreate(async (options) => {
        const dernierVal = await db.NewStudentAddedCount.findByPk(1)

        var prochainVal
        if (dernierVal) {
            let dernierNumero = parseInt(dernierVal.count, 10) 
            prochainVal = (dernierNumero + 1).toString()
            await db.NewStudentAddedCount.update({ count: prochainVal }, { where: { id: 1 } })
        } else {
            prochainVal = "1"
            await db.NewStudentAddedCount.create({ count: prochainVal })
        }
})
/*+++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

 /**************************************/
/* synchronisation global des modèles */ 
sequelize.sync( err => {
    console.log('Database sync Error', err)
})

module.exports = db