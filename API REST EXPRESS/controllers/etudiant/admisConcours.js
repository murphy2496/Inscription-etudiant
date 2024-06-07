 /**********************************/
/* import des modules necessaires */
const DB = require('../../db-config')
const AdmisConcours= DB.AdmisConcours

const { RequestError } = require('../../error/customError')

 /************************************/
/* routage de la ressource etudiant */

exports.getAllAdmisConcours =  (req, res, next) => {
    AdmisConcours.findAll({attributes: ['numConcours', 'nom', 'prenom','parcours']})
            .then(admisConcours => res.status(200).json({data: admisConcours}))
            .catch(err => next(err))
}
//----------------------------------------------------------------------------------------------------------------------
exports.addImport = async (req, res, io, next) => {
    try {
        const { DataEtudiant } = req.body

        if (!DataEtudiant) {
            throw new RequestError('Missing parameter')
        }

        const pageSize = 50  // taille du lot
        const totalDataEtudiant = DataEtudiant.length

        for (let i = 0; i < totalDataEtudiant; i += pageSize) {
            const lot = DataEtudiant.slice(i, i + pageSize)

            await Promise.all(lot.map(async (Data) => { //attend que toutes les opérations dans le tableau lot soient terminées avant de poursuivre l'exécution du code
                await AdmisConcours.create({
                    numConcours: Data.numeroConcours,
                    nom: Data.nom,
                    prenom: Data.prenom,
                    parcours: Data.parcours
                })
            }))
        }

        io.emit('addImport')
        return res.status(200).json({ message: 'Students Created' })

    } catch (err) {
        next(err)
    }
}
//----------------------------------------------------------------------------------------------------------------------
exports.deleteAdmisConcours = async (req, res, io, next) => {
    try{
        await AdmisConcours.destroy({ truncate: true })
        io.emit('AdmisConcoursTruncate')
        return res.status(200).json({ message: 'Table emptied successfully' })
    }catch(err){
        next(err)
    }
}