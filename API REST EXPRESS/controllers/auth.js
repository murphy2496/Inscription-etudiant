 /**********************************/
/* import des modules necessaires */
const jwt = require('jsonwebtoken')

const DB = require('../db-config')
const User = DB.Utilisateur

const { AuthenticationError } = require('../error/customError')
 /********************************/
/* routage de la ressource auth */

exports.login = async (req, res, next) => {

    try{
        const { matricule, password } = req.body

        if(!matricule || !password){
            throw new AuthenticationError('Mauvais matricule ou mot de passe', 0)
        }

        let user = await User.findOne({ where: { matricule: matricule }, raw: true })
        if(user == null){
            throw new AuthenticationError(`Matricule : ${matricule} ! ce compte n'existe pas `, 1)
        }

        let test = await User.checkPassword(password, user.password)
        if(!test){
            throw new AuthenticationError('Le mot de passe saisi est incorrect. Veuillez réessayer !', 2)
        }

        const token = jwt.sign({
            matricule: user.matricule,
            nom: user.nom,
            prenom: user.prenom,
            email: user.email
        }, process.env.JWT_SECRET)

        return res.status(200).json({ access_token: token })

    }catch(err){
         if(err.name == 'SequelizeDatabaseError'){
            res.status(500).json({ message: 'Database Error', error: err })      
        }
        res.json({ error: err }) 
    }
}
