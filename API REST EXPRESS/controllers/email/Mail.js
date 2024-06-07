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

const envoieMail = async (req, res) => {
    try {
        const { email, nom, prenom } = req.body

        // Préparer le contenu HTML en fonction du type d'e-mail
        const htmlContent = `
            <h2>Bonjour ${nom} ${prenom},</h2>
            <p>Nous avons le plaisir de vous informer que votre inscription en première année de licence à 
            l'Ecole nationale d'informatique a été officiellement validée.
            Nous vous remercions chaleureusement et sommes impatients de vous accueillir ! </p>
        `

        // Envoyer l'e-mail
        await transporter.sendMail({
            from: process.env.SMTP_MAIL,
            to: email, // Utiliser l'adresse e-mail du destinataire fournie dans la requête
            subject: "Réponse d'inscription",
            html: htmlContent
        })

        return res.status(200).json({ message: `Un e-mail de validation d'inscription a été envoyé à  ${nom} ${prenom}` })
    } catch (err) {
        console.log(err)
        res.json({error: 'Send E-mail X Error'})
    }
}

module.exports = { envoieMail }
