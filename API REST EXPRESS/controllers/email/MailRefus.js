const nodemailer = require('nodemailer')

 /*************************/
/* configurer nodemailer */
const transporter = nodemailer.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
})

const envoieMailRefus = async (req, res) => {
    try {
        const { email, nom, prenom } = req.body

        const htmlContent = `
            <h2>Bonjour ${nom} ${prenom},</h2>
            <p>Nous vous prions de vérifier votre dossier d'inscription en première année de licence à 
            l'Ecole nationale d'informatique, car il semble contenir des
             informations incorrectes</p>
            <p>Votre attention à ce sujet serait grandement appréciée. Merci!</p>
        `

        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: email, 
            subject: "Réponse d'inscription",
            html: htmlContent
        })

        return res.status(200).json({ message: `Un e-mail de refus d'inscription a été envoyé à ${nom} ${prenom}` })
    } catch (err) {
        console.log(err)
        res.json({ error: 'Send E-mail Y Error' })
    }
}

module.exports = { envoieMailRefus }