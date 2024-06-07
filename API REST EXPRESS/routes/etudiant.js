 /**********************************/
/* import des modules necessaires */
const express = require('express')
const inscriptionCtrl= require('../controllers/etudiant/inscription')
const licence1Ctrl = require('../controllers/etudiant/licence1')
const admisConcoursCtrl = require('../controllers/etudiant/admisConcours')

const multer = require('multer')

const { getSocketIO } = require('../server')  
const io = getSocketIO()                     

const mail = require('../controllers/email/Mail')
const mailRefus = require('../controllers/email/MailRefus')
 /*************************************/
/* récupération du routeur d'express */
let router = express.Router()

 /*******************************************************/
/* middleware pour enregistrer le temps de la requêtes */ 
router.use( (req, res, next) => {
  const event = new Date()
  console.log('STUDENT Time : ', event.toString())
  next()
})

 /**************************************************/
/* middleware pour stocker fichier dans un dossier*/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/")
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname)
  }
})

const upload1 = multer({ storage })
const upload2 = multer({ storage: storage, files: 2 })

 /************************************/
/* routage de la ressource etudiant */

 /*-------------*/
/* inscription */

// insérer nouveau inscription
// router.post('/Inscription', upload2.array("files", 2), inscriptionCtrl.addInscription)
                                   // fileds() : gérer plusieur champ de fichier
router.post('/Inscription', upload2.fields([{ name: 'bordereau' }, { name: 'etudiant' }]), (req, res) => {
    inscriptionCtrl.addInscription(req, res, io) 
})

// récupérer tout inscription
router.get('/notification', inscriptionCtrl.getAllInscription)

//récupérer compte notification inscription
router.get('/notification/count', inscriptionCtrl.getNewStudentAddedCount)

// vider table newStudentAddedCount
router.delete('/notif/newStudentAddedCount', (req, res, next) => {
    inscriptionCtrl.deleteNewStudentAddedCount(req, res, io, next)
})

// modifier status notification inscription
router.get('/notifVu/:num', (req, res, next) => {
    inscriptionCtrl.updateStatusNotification(req, res, io, next) 
})

// récupérer un inscription
router.get('/notification/:num', inscriptionCtrl.getInscription)

// récupérer image bordereau inscription
router.get('/InscriptionBordereau/:num', inscriptionCtrl.getImageBordereauInscription)

// récupérer image étudiant inscription
router.get('/InscriptionEtudiant/:num', inscriptionCtrl.getImageEtudiantInscription)

// supprimer inscription
router.delete('/notification/:num', (req, res, next) => {
    inscriptionCtrl.deleteInscription(req, res, io, next) 
})


 /*----------*/
/* licence1 */

// insérer nouveau licence1
router.post('/Licence1', upload1.single("file"), (req, res, next) => {
    licence1Ctrl.addLicence1(req, res, io, next)
})

// récupérer tout licence1
router.get('/Licence1', licence1Ctrl.getAllLicence1)

// récupérer un licence1
router.get('/Licence1/:mat', licence1Ctrl.getLicence1)

// récupérer image étudiant licence1
router.get('/Licence1Etudiant/:mat', licence1Ctrl.getImageEtudiantLicence1)

// modifier donnée licence1
router.patch('/Licence1/:mat', licence1Ctrl.updateLicence1)

 /*-------*/
/* email */

// envoyer email 
router.post('/envoieMail', mail.envoieMail)

// envoyer email refus
router.post('/envoieMailRefus', mailRefus.envoieMailRefus)


 /*---------------*/
/* admis concours*/

// récupérer tout admis concours
router.get('/admisConcours', admisConcoursCtrl.getAllAdmisConcours)

// importer donnée excel
// router.post('/importer', admisConcoursCtrl.addImport)

// importer donnée excels
router.post('/importer', (req, res, next) => {
    admisConcoursCtrl.addImport(req, res, io, next)
})

// vider table admis concours
router.delete('/admisConcours/trun', (req, res, next) => {
    admisConcoursCtrl.deleteAdmisConcours(req, res, io, next)
})


module.exports = router