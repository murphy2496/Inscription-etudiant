import Axios from './caller.service'


 /*----------*/
/* Licence1 */

// récuperer tout Licence1
let getAllLicence1 = () => {
    return  Axios.get('/student/Licence1')
}
// récupérer un licence1
let getLicence1 = (donnee) => {
    return Axios.get('/student/Licence1/' +  donnee)
}
// récupérer image étudiant licence1
let getImageEtudiantLicence1 = (donnee) => {
    return Axios.get('/student/Licence1Etudiant/' + donnee)
}
// insérer nouveau licence1
let addLicence1 = (donnee) => {
    return Axios.post('/student/Licence1', donnee)
}
// envoyer email 
let envoieMail = (donnee) => {
    return Axios.post('/student/envoieMail' , donnee)
}
// envoyer email refus
let envoieMailRefus = (donnee) => {
    return Axios.post('/student/envoieMailRefus', donnee)
}


 /*-------------*/
/* inscription */

// récupérer tout inscription
let getAllInscription = () => {
    return Axios.get('/student/notification')
}
//récupérer compte notification inscription
let getNewStudentAddedCount = () => {
    return Axios.get('/student/notification/count')
}
// vider table newStudentAddedCount
let deleteNewStudentAddedCount = () => {
    return Axios.delete('/student/notif/newStudentAddedCount')
}
// modifier status notification inscription
let updateStatusNotification = (donnee) => {
    return Axios.get('/student/notifVu/' + donnee)
}
// récupérer un inscription
let getInscription = (donnee) => {
    return Axios.get('/student/notification/' + donnee)
}
// récupérer image bordereau inscription
let getImageBordereauInscription = (donnee) => {
    return Axios.get('/student/InscriptionBordereau/' + donnee)
}
// récupérer image étudiant inscription
let getImageEtudiantInscription = (donnee) => {
    return Axios.get('/student/InscriptionEtudiant/' + donnee)
}
// Supprimer inscription
const deleteInscription = (donnee) => {
    return Axios.delete('/student/notification/' + donnee)
}


 /*----------------*/
/* admis concours */

// récupérer tout admis concours
let getAllAdmisConcours = () => {
    return Axios.get('/student/admisConcours')
}
// importer donnée excel
let addImport = (donnee) => {
    return Axios.post('/student/importer', donnee)
}
// vider table admis concours
let deleteAdmisConcours = () => {
    return Axios.delete('/student/admisConcours/trun')
}


export const etudiantService ={
    getAllLicence1, getLicence1, getImageEtudiantLicence1, addLicence1,
    envoieMail, envoieMailRefus,
    getAllInscription, updateStatusNotification, getInscription, getImageBordereauInscription,
    getImageEtudiantInscription, deleteInscription,
    getNewStudentAddedCount, deleteNewStudentAddedCount,
    getAllAdmisConcours, addImport, deleteAdmisConcours,
}