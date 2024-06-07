import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './css/registre.css';
import Header from "./header"
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Inscription = () => {
    const [step, setStep] = useState(1);
    const [formValues, setFormValues] = useState({
        nom: '',
        prenom: '',
        datenais: '',
        adresse: '',
        numConcours: '',
        bordereau: null,
        email: '',
        etudiant: null,
        parcours: '',
    });
    const [formData, setFormData] = useState({
        nom: '',
        prenom: '',
        datenais: '',
        adresse: '',
        numConcours: '',
        bordereau: null,
        email: '',
        etudiant: null,
        parcours: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false); // Ajout de l'état pour suivre si le formulaire a été soumis
    const [isUnderTen, setIsUnderTen] = useState(false);
    const [isValidEmail, setIsValidEmail] = useState(true);
    const [numSubmitted, setnumSubmitted] = useState(false)



    const handleChange = (e) => {
        const { name, value, files } = e.target;

        if (name === "datenais") {
            const tenYearsAgo = new Date();
            tenYearsAgo.setFullYear(tenYearsAgo.getFullYear() - 10);
            const dob = new Date(value);
            setIsUnderTen(dob >= tenYearsAgo);
        }

        // if (name === "email") {
        //     const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        //     if (!emailPattern.test(String(value).toLowerCase()) && value.endsWith('@gmail.com')) {
        //         setIsValidEmail(true);
        //         return;
        //     } else {
        //         setIsValidEmail(false);
        //     }
        // }


        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleNext = () => {
        if (step === 1) {
            // Vérifier si des champs obligatoires sont vides avant de passer à l'étape suivante
            const requiredFields = ['numConcours', 'nom', 'prenom'];
            const isEmpty = requiredFields.some(field => !formValues[field]);
            if (isEmpty) {
                setFormSubmitted(true); // Marquer le formulaire comme soumis
                return; // Ne pas passer à l'étape suivante si des champs obligatoires sont vides
            }
            const minThreeLettersFields = ['nom', 'prenom', 'numConcours'];
            const containsMinThreeLetters = minThreeLettersFields.every(field => formValues[field].length >= 3);
            if (!containsMinThreeLetters) {
                // Afficher un message d'erreur ou gérer cette validation comme vous le souhaitez
                return;
            }
        }


        if (step === 2) {
            if (!formValues.email) {
                setFormSubmitted(true);
                return;
            }
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(String(formValues.email).toLowerCase())) {
                setIsValidEmail(false);
                return; // Empêcher le passage à l'étape suivante si l'e-mail n'est pas valide
            }
            else {
                setIsValidEmail(true);
            }
            // const requiredFields = ['datenais', 'adresse', 'email'];
            const requiredFields = ['datenais', 'adresse'];
            const isEmpty = requiredFields.some(field => !formValues[field]);
            if (isEmpty || isUnderTen) {
                setFormSubmitted(true);
                return;
            }
        }
        // if (step === 3) {
        //     const requiredFields = ['parcours', 'bordereau', 'etudiant'];
        //     const isEmpty = requiredFields.some(field => !formValues[field]);
        //     if (isEmpty) {
        //         setFormSubmitted(true);
        //         return;
        //     }
        // }
        setFormValues(formData);
        setFormSubmitted(false); // Réinitialiser l'état du formulaire soumis
        setStep(step + 1);
    };

    const handleSubmit = () => {
        if (step === 3) {
            const requiredFields = ['parcours', 'bordereau', 'etudiant'];
            const isEmpty = requiredFields.some(field => !formValues[field]);
            if (isEmpty) {
                setFormSubmitted(true);
                return;
            }
        }
        setFormValues(formData);
        setFormSubmitted(false);
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.forEach((value, key) => {
            console.log('mama', key, value);
        })

        axios.post("http://localhost:8885/student/Inscription", data)
            .then(res => {
                console.log(res)
                if (res.data.error) {
                    // alert(`${res.data.error.message}`)
                    toast.error(res.data.error.message, {
                        position: 'top-center',
                        autoClose: 3000,
                        hideProgressBar: true, 
                        transitionDuration: 0, 
                        theme: 'colored',
                    })
                } else {
                    // alert(`${res.data.message}`)
                    toast.info("🚀  " + res.data.message, {
                        position: 'top-center', 
                        autoClose: 3000,
                        hideProgressBar: true, 
                        transitionDuration: 0,
                        icon: false,
                        theme: 'colored', 
                    })
                }
                // Navigate('/Propos')
            })
            .catch(err => console.log(err))
    };

    const isStepOnevalid = formData.numConcours !== '' && formData.nom !== '' && formData.prenom !== '';
    const isStepTwovalid = formData.datenais !== '' && formData.adresse !== '' && formData.email !== '';

    return (
        <div className="All">
            <Header />
            <div className="body-container">
                <div className="register">
                    <div className="registerinfo">
                        <div className="test">
                            <h1>Inscrivez-vous</h1>
                        </div>
                        <h2>Veuillez remplir les champs par vos informations personnelles afin de s'inscrire en première année de licence professionnelle au sein de notre école.</h2>
                    </div>
                    <ToastContainer limit={2}/>
                    <div className="formulaire">
                        {step === 1 && (
                            <form className="Container">
                                

                                <div className="container">
                                    <div className={`info ${formSubmitted && !formValues.numConcours && 'empty'}`}>
                                        <label>
                                            Numéro de concours:
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.numConcours}
                                                    type="text"
                                                    name="numConcours"
                                                    placeholder="Votre réponse"
                                                    onChange={handleChange} required />
                                            </div>
                                            {formSubmitted && !formValues.numConcours &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`info ${formSubmitted && !formValues.nom && 'empty'}`}>
                                        <label>
                                            Nom:
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.nom}
                                                    type="text"
                                                    name="nom"
                                                    placeholder="Votre réponse"
                                                    onChange={handleChange} required />
                                            </div>
                                            {formSubmitted && !formValues.nom && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`info ${formSubmitted && !formValues.prenom && 'empty'}`}>
                                        <label>
                                            prénom(s):
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.prenom}
                                                    type="text"
                                                    name="prenom"
                                                    placeholder="Votre réponse"
                                                    onChange={handleChange} required />
                                            </div>
                                            {formSubmitted && !formValues.prenom && <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className='continue1'>
                                        <button className='continue' type="button" onClick={handleNext}>Suivant</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {step === 2 && (
                            <form className="Container">
                                <div className="container">
                                    {/* <h2>Étape 1: Informations personnelles</h2> */}
                                    <div className={`info ${formSubmitted && !formValues.datenais && 'empty'}`}>
                                        <label>
                                            Date de naissance:
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.datenais}
                                                    type="date"
                                                    name="datenais"
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            {isUnderTen && <p className="error-message"><span className="exclamation">!</span> Vérifier votre date de naissance</p>}
                                            {formSubmitted && !formValues.datenais &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`info ${formSubmitted && !formValues.adresse && 'empty'}`}>
                                        <label>
                                            Adresse:
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.adresse}
                                                    type="text"
                                                    name="adresse"
                                                    placeholder="Votre réponse"
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            {formSubmitted && !formValues.adresse &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`info ${formSubmitted && !formValues.email && 'empty'}`}>
                                        <label>
                                            Adresse e-mail:
                                            <div>
                                                <input className='input-box'
                                                    value={formValues.email}
                                                    type="email"
                                                    name="email"
                                                    placeholder="Votre réponse"
                                                    onChange={handleChange}
                                                    required />
                                            </div>
                                            {!formValues.email && formSubmitted &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                            {formValues.email && !isValidEmail &&
                                                <p className="error-message"><span className="exclamation">!</span> Veuillez entrer une adresse e-mail valide.</p>}
                                        </label>
                                    </div>
                                    <div className='boutCont'>
                                        <button className='precedant' type="button" onClick={handlePrevious}>Précédant</button>
                                        <button className='suivant' type="button" onClick={handleNext}>Suivant</button>
                                    </div>
                                </div>
                            </form>
                        )}
                        {step === 3 && (
                            <form className="Container">
                                <div className="container">
                                    {/* <h2>Étape 1: Informations personnelles</h2> */}
                                    <div className={`info ${formSubmitted && !formValues.parcours && 'empty'}`}>
                                        <label>
                                            Parcours:
                                            <div>
                                                <select className='select' name="parcours" onChange={handleChange}>
                                                    <option value="">Sélectionnez un parcours</option>
                                                    <option value="IG">Informatique générale</option>
                                                    <option value="PRO">Professionnelle</option>
                                                </select>
                                            </div>
                                            {formSubmitted && !formValues.parcours &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`file ${formSubmitted && !formValues.bordereau && 'empty'}`}>
                                        <label>
                                            Photo bordereau:
                                            <div>
                                                <input className='input-box' type="file" name="bordereau" onChange={handleChange} />
                                            </div>
                                            {formSubmitted && !formValues.bordereau &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className={`file ${formSubmitted && !formValues.etudiant && 'empty'}`}>
                                        <label>
                                            Photo d'identité:
                                            <div>
                                                <input className='input-box' type="file" name="etudiant" onChange={handleChange} />
                                            </div>
                                            {formSubmitted && !formValues.etudiant &&
                                                <p className="error-message"><span className="exclamation">!</span> Ce champ est obligatoire.</p>}
                                        </label>
                                    </div>
                                    <div className='boutCont'>
                                        <button className='precedant' type="button" onClick={handlePrevious}>Précédant</button>
                                        <button className='suivant' type="button" onClick={handleSubmit}>Inscription</button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
                {/* <div className="section">
                    <section className="section3">
                        <div className="ressource">
                            <h2 class="display-6 text-center">Ressources humaines</h2>
                            <p class="text-center text-black m-0 small">L’ENI compte quinze (15) enseignants permanents
                                dont un (01) Professeur Titulaire, un (01) Professeur, un (01) Docteur HDR, huit (08) Maîtres
                                de Conférences, quatre (04) Assistants d’Enseignement Supérieur et de Recherche, dix (10)
                                enseignants vacataires, quarante un (41) personnel administratif.</p>
                        </div>
                    </section>
                </div> */}
            </div>
        </div>
    );
};

export default Inscription;