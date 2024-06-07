 /**********************************/
/* import des modules necessaires */
const DB = require('../../db-config')
const Licence1 = DB.Licence1

const {RequestError, StudentError } = require('../../error/customError')

 /************************************/
/* routage de la ressource etudiant */
exports.addLicence1 = async (req, res, io) => {
    try{

        //console.log(req.file)
        const { nom, prenom, datenais, adresse, email, parcours} = req.body
        const { originalname, path } = req.file

        if(!nom || !prenom || !datenais || !adresse || !email || !parcours || !originalname || !path){
            throw new RequestError('Verifier les données')
        }

        let student = await Licence1.findOne({ where: { email: email }, raw: true })
        if(student !== null){
            throw new StudentError(`${nom} ${prenom} est déjà inscrit `, 1)
        }

        await Licence1.create({ 
            nom: nom, prenom: prenom, email: email, 
            datenais: datenais, adresse: adresse, parcours: parcours,
            nomImageEtudiant: originalname, pathImageEtudiant: path
        })
        
        io.emit('newLicence1Added')

        return res.status(201).json({message: 'Student Created'})
    }catch(err){
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database Error', Error: err })
        }
        res.json({error: err})
    }
}
//-------------------------------------------------------------------------------------------------------------------
exports.getAllLicence1 =  (req, res, next) => {
    Licence1.findAll({attributes: ['matricule', 'nom', 'prenom','parcours']})
            .then(licence1 => res.status(200).json({data: licence1}))
            .catch(err => next(err))
}
//-------------------------------------------------------------------------------------------------------------------
exports.getLicence1 =  async (req, res, next) => {
    try{
        let matricule = req.params.mat
        if(!matricule){
            throw new RequestError('Missing parameter')
        }

        let licence1 = await Licence1.findOne({ 
            where: { matricule: matricule }, 
            attributes: ['matricule', 'nom', 'prenom', 'datenais', 'adresse', 'email','parcours']
        })
        if(licence1 == null){
            throw new StudentError('This student does not exist !', 0)
        }

        return res.status(200).json({ data: licence1 })

    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------
exports.getImageEtudiantLicence1 = async (req, res, next) => {
    try{
        const matricule = req.params.mat
        if(!matricule){
            throw new RequestError('Missing Parameter')
        }

        let student = await Licence1.findOne({ where: { matricule: matricule }, raw: true })
        if(!student){
            throw new StudentError('This student does not exist !', 0)
        }
        
        res.download(student.pathImageEtudiant)
    }catch(err){
        next(err)
    }
}
//-----------------------------------------------------------------------------------------------------------------------
exports.updateLicence1 = async (req, res, next) => {
    try{
        let matricule = req.params.mat
       
        if(!matricule){
            throw new RequestError('Missing parameter')
        }
        
        let licence1 = await Licence1.findOne({ where: { matricule: matricule }, raw: true })
        if(licence1 == null){
            throw new StudentError('This student does not exist, can not update it !', 0)
        }

        licence1 = await Licence1.update(req.body, { where: { matricule: matricule } })
       
        return res.status(201).json({ message: 'Student Updated', data: licence1})

    }catch(err){
        next(err)
    }
}
