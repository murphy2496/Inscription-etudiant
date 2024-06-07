// import React, { useState } from "react";
// import './css/contact.css'
// import Header from "./header";

// const Contact = () => {
//     const [tel, setTel] = useState("");
//     const [mail, setMail] = useState("");
//     const [message, setMessage] = useState("");
//     const [telError, setTelError] = useState(false);
//     const [mailError, setMailError] = useState(false);
//     const [messageError, setMessageError] = useState(false);

//     const setTelephone = (e) => {
//         setTel(e.target.value);
//         setTelError(false);
//     }

//     const setEmail = (e) => {
//         setMail(e.target.value);
//         setMailError(false);
//     }

//     const setDescription = (e) => {
//         setMessage(e.target.value);
//         setMessageError(false);
//     }

//     const sendInfo = () => {
//         let hasError = false;
//         if (!tel) {
//             setTelError(true);
//             hasError = true;
//         }
//         if (!mail) {
//             setMailError(true);
//             hasError = true;
//         }
//         if (!message) {
//             setMessageError(true);
//             hasError = true;
//         }
//         if (!hasError) {
//             // Envoyer les informations
//         }
//     }

//     return (
//         <div>
//             <Header />
//             <div className="container-contact">
//                 <div className="contenu-contact">
//                     <div className="all">
//                         <div className="contenu">
//                             <div>
//                                 <h2>Adresse</h2>
//                                 <p>BP 1487 Tanambao Fianarantsoa, Madagascar</p>
//                             </div>
//                             <div>
//                                 <h2>Email</h2>
//                                 <p>eni@eni.mg</p>
//                             </div>
//                             <div>
//                                 <h2>Téléphone</h2>
//                                 <p>+261 34 05 733 36</p>
//                             </div>
//                         </div>
//                         <div className="container-comm">
//                             <div className="communication">
//                                 <div className="user-contact">
//                                     <label for="contact">
//                                         Numéro téléphone
//                                         <input className="input-contact" type="text" name="tel" onChange={setTelephone} />
//                                         {telError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
//                                     </label>
//                                     <label for="email">
//                                         Email
//                                         <input className="input-contact" type="email" name="mail" onChange={setEmail} />
//                                         {mailError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
//                                     </label>

//                                 </div>
//                                 <div className="user-message">
//                                     <label for="message">
//                                         Votre message
//                                         <textarea className="input-contact" name="message" onChange={setDescription} />
//                                         {messageError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
//                                     </label>
//                                 </div>
//                             </div>
//                             <div className="container-bouton">
//                                 <button className="btn btn-primary" type="button" onClick={sendInfo}>Envoyer</button>
//                             </div>

//                         </div>

//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// };

// export default Contact;

import React, { useState } from "react";
import './css/contact.css'
import Header from "./header";

const Contact = () => {
    const [tel, setTel] = useState("");
    const [mail, setMail] = useState("");
    const [message, setMessage] = useState("");
    const [telError, setTelError] = useState(false);
    const [phoneError, setPhoneError] = useState(false);
    const [mailError, setMailError] = useState(false);
    const [emailError, setEMailError] = useState(false);
    const [messageError, setMessageError] = useState(false);

    // const setTelephone = (e) => {
    //     setTel(e.target.value);
    //     setTelError(false);
    // }
    const setTelephone = (e) => {
        const phone = e.target.value;
        setTel(phone);
        setTelError(false);
        setPhoneError(false);
    }

    const setEmail = (e) => {
        const email = e.target.value;
        setMail(email);
        setMailError(false);
        setEMailError(false)
        // if (validateEmail(email)) {
        //     setEMailError(false);
        // }
    }

    const setDescription = (e) => {
        setMessage(e.target.value);
        setMessageError(false);
    }

    const validatePhone = (phone) => {
        const regex = /^[0-9+\-\s()]*$/;
        return regex.test(String(phone));
    }
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(String(email).toLowerCase()) && email.endsWith('@gmail.com');
    }

    const sendInfo = () => {
        let hasError = false;
        if (!tel) {
            if ((!mail && !message) || (mail && !message) || (!mail && message) || (mail && message)) {
                setTelError(true);
                hasError = true;
            }
        }
        if (tel) {
            if (!validatePhone(tel)) {
                setPhoneError(true)
            }
            else {
                if (!mail) {
                    if (!message && !validateEmail(mail)) {
                        setMailError(true);
                        hasError = true;
                    }
                    if (message && !validateEmail(mail)) {
                        setMailError(true);
                        hasError = true;
                    }
                }
                else {
                    if (!message && !validateEmail(mail)) {
                        setEMailError(true);
                        hasError = true;
                    }
                    if (message && !validateEmail(mail)) {
                        setEMailError(true);
                        hasError = true;
                    }
                    if (!message && validateEmail(mail)) {
                        setMessageError(true);
                        hasError = true;
                    }
                }
            }
        }
        if (!hasError) {
            // Envoyer les informations
        }
    }

    return (
        <div>
            <Header />
            <div className="container-contact">
                <div className="contenu-contact">
                    <div className="all">
                        <div className="contenu">
                            <div>
                                <h2>Adresse</h2>
                                <p>BP 1487 Tanambao Fianarantsoa, Madagascar</p>
                            </div>
                            <div>
                                <h2>Email</h2>
                                <p>eni@eni.mg</p>
                            </div>
                            <div>
                                <h2>Téléphone</h2>
                                <p>+261 34 05 733 36</p>
                            </div>
                        </div>
                        <div className="container-comm">
                            <div className="communication">
                                <div className="user-contact">
                                    <label for="contact">
                                        Numéro téléphone
                                        <input className={`input-contact ${telError ? 'error-input' : ''}`} type="text" name="tel" onChange={setTelephone} />
                                        {phoneError && <p className="error-message"><span className="exclamation">!</span> Le numéro de téléphone doit contenir uniquement des chiffres et des caractères spéciaux (+ - ()).</p>}
                                        {telError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                    </label>
                                    <label for="email">
                                        Email
                                        <input className={`input-contact ${mailError ? 'error-input' : ''}`} type="email" name="mail" onChange={setEmail} />
                                        {mailError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        {emailError && <p className="error-message"><span className="exclamation">!</span> L'email doit être valide et se terminer par @gmail.com.</p>}
                                    </label>
                                </div>
                                <div className="user-message">
                                    <label for="message">
                                        Votre message
                                        <textarea className={`input-contact ${messageError ? 'error-input' : ''}`} name="message" onChange={setDescription} />
                                        {messageError && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                    </label>
                                </div>
                            </div>
                            <div className="container-bouton">
                                <button className="btn btn-primary" type="button" onClick={sendInfo}>Envoyer</button>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
};

export default Contact;
