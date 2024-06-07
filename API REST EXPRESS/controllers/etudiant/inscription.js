 /**********************************/
/* import des modules necessaires */
const DB = require('../../db-config')
const Inscription = DB.Inscription
const AdmisConcours = DB.AdmisConcours
const NewStudentAddedCount = DB.NewStudentAddedCount

const {RequestError, StudentError } = require('../../error/customError')

 /************************************/
/* routage de la ressource etudiant */
exports.addInscription = async (req, res, io) => {
    try{
        req.body.datenais = formatYYYYMMDD(req.body.datenais)

        //console.log(req.files)
        const { nom, prenom, datenais, adresse, numConcours, email, parcours} = req.body

        if(!nom || !prenom || !datenais || !adresse || !numConcours || !email || !parcours || !req.files 
            || !req.files.bordereau || !req.files.etudiant){
            throw new RequestError('Verifier vos données')
        }

        let student = await AdmisConcours.findOne({ where: { numConcours: numConcours }, raw: true })
        if (student == null) {
            throw new StudentError(`Vous ne figurez pas parmi les étudiants admis au concours, ${nom} ${prenom}`, 0)
        }

        student = await Inscription.findOne({ where:{ numConcours: numConcours}, raw: true })
        if(student !== null){
            throw new StudentError(`Vous avez déjà envoyer votre inscription, ${nom} ${prenom}`, 1)
        }

        const imageBordereau = req.files.bordereau[0]
        const imageEtudiant = req.files.etudiant[0]
        // const [imageBordereau, imageEtudiant] = req.files

        await Inscription.create({
            nom: nom, prenom: prenom, numConcours: numConcours, email: email,
            datenais: datenais, adresse: adresse, parcours: parcours, 
            nomImageBordereau: imageBordereau.originalname,
            pathImageBordereau: imageBordereau.path,
            nomImageEtudiant: imageEtudiant.originalname,
            pathImageEtudiant: imageEtudiant.path,
            notifVu: false,
        })

        var increment = await NewStudentAddedCount.findOne({attributes: ['count']})

        io.emit('newStudentAdded', {increment: increment})

        return res.status(201).json({ message: 'Inscription envoyée'})
    } catch (err) {
        console.log(err.name, err.message)
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database Error', Error: err })
        }
        res.json({error: err})
    }
}
//-------------------------------------------------------------------------------------------------------------
exports.updateStatusNotification = async (req, res, io, next) => {  
    try {
        const num  = req.params.num
        if (!num) {
            throw new RequestError('Missing parameter')
        }

        const inscription = await Inscription.findOne({ where: { numConcours: num } })
        if (inscription == null) {
            throw new StudentError('This student does not exist !', 0)
        }

        await inscription.updateStatus()

        io.emit('Notif_vu')

        return res.status(200).json({ message: 'Status notification updated' })
    } catch (err) {
        next(err)
    }
}
//-------------------------------------------------------------------------------------------------------------------
exports.getAllInscription =  (req, res, next) => {
    Inscription.findAll({
                    attributes: ['nom', 'prenom','numConcours','parcours', 'notifVu', 'createdAt'],
                    order: [['createdAt', 'DESC']]  // Tri par ordre décroissant de createdAt
                })
                .then(inscription => res.status(200).json({data: inscription}))
                .catch(err => next(err))
}
//-------------------------------------------------------------------------------------------------------------------
exports.getInscription = async (req, res, next) => {
    try {
        let num = req.params.num
        if (!num) {
            throw new RequestError('Missing parameter')
        }

        let inscription = await Inscription.findOne({
            where: { numConcours: num },
            attributes: ['nom', 'prenom', 'datenais', 'adresse', 'numConcours', 'email', 'parcours']
        })
        if (inscription == null) {
            throw new StudentError('This student does not exist !', 0)
        }

        return res.status(200).json({ data: inscription })

    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------
exports.getImageBordereauInscription = async (req, res, next) => {
    try{
        const num = req.params.num
        if(!num){
            throw new RequestError('Missing Parameter')
        }
        
        let student = await Inscription.findOne({ where: { numConcours: num }, raw: true })
        if(!student){
            throw new StudentError('This student does not exist !', 0)
        }
        
        res.download(student.pathImageBordereau)
    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------
exports.getImageEtudiantInscription = async (req, res, next) => {
    try{
        const num = req.params.num
        if(!num){
            throw new RequestError('Missing Parameter')
        }

        let student = await Inscription.findOne({ where: { numConcours: num }, raw: true })
        if(!student){
            throw new StudentError('This student does not exist !', 0)
        }

        res.download(student.pathImageEtudiant)
    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------
exports.deleteInscription = async (req, res, io, next) => {
    try{
        let num = req.params.num
        if(!num){
            throw new RequestError('Missing parameter')
        }

        await Inscription.destroy({ where: { numConcours: num }, force: true })

        io.emit('Student Deleted')

        return res.status(200).json({ message: 'Student Deleted' })
    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------
exports.getNewStudentAddedCount = async (req, res, next) => {
    try {

        let newStudentAddedCount = await NewStudentAddedCount.findOne({where: { id: 1 }, attributes: ['count']})
        if (newStudentAddedCount == null) {
            throw new StudentError('Not found !', 0)
        }

        return res.status(200).json({ data: newStudentAddedCount })
    } catch (err) {
        if (err.name == 'SequelizeDatabaseError') {
            res.status(500).json({ message: 'Database Error', Error: err })
        }
        res.json({error: err})
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------
exports.deleteNewStudentAddedCount = async (req, res, io, next) => {
    try{
        await NewStudentAddedCount.destroy({ truncate: true })
        io.emit('StudentTruncate')
        return res.status(200).json({ message: 'Table emptied successfully' })
    }catch(err){
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------------------------------------
const formatYYYYMMDD = (dateString) => {
    const parts = dateString.split('/')
    const formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`
    return formattedDate
}