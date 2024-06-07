import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import './css/registre.css'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'


const Registration = () => {
    const [step, setStep] = useState(1);
    const [invalidFieldsStepOne, setInvalidFieldsStepOne] = useState([]);
    const [invalidFieldsStepTwo, setInvalidFieldsStepTwo] = useState([]);
    const [invalidFieldsStepThree, setInvalidFieldsStepThree] = useState([]);

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

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        const input = e.target;
        input.classList.remove('input-error');
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
        setFormValues(prevState => ({
            ...prevState,
            [name]: value
        }));
    
        // Vérifier si le champ est vide et l'ajouter à invalidFieldsStepOne ou invalidFieldsStepTwo si nécessaire
        if (step === 1) {
            if (value.trim() === '') {
                setInvalidFieldsStepOne(prevInvalidFields => [...prevInvalidFields, name]);
            } else {
                setInvalidFieldsStepOne(prevInvalidFields => prevInvalidFields.filter(field => field !== name));
            }
        } else if (step === 2) {
            if (value.trim() === '') {
                setInvalidFieldsStepTwo(prevInvalidFields => [...prevInvalidFields, name]);
            } else {
                setInvalidFieldsStepTwo(prevInvalidFields => prevInvalidFields.filter(field => field !== name));
            }
        }
    };
    
    
    

    // const handleChange = (e) => {
    //     const { name, value, files } = e.target;
    //     const input = e.target;
    //     input.classList.remove('input-error');
    //     setFormData(prevState => ({
    //         ...prevState,
    //         [name]: files ? files[0] : value
    //     }));
    //     setFormValues(prevState => ({
    //         ...prevState,
    //         [name]: value
    //     }));
    //     if (step === 1) {
    //         if (invalidFieldsStepOne.includes(name)) {
    //             setInvalidFieldsStepOne(prevInvalidFields => prevInvalidFields.filter(field => field !== name));
    //         }
    //     } else if (step === 2) {
    //         if (invalidFieldsStepTwo.includes(name)) {
    //             setInvalidFieldsStepTwo(prevInvalidFields => prevInvalidFields.filter(field => field !== name));
    //         }
    //     } else if (step === 3) {
    //         if (invalidFieldsStepThree.includes(name)) {
    //             setInvalidFieldsStepThree(prevInvalidFields => prevInvalidFields.filter(field => field !== name));
    //         }
    //     }
    // };



    const handlePrevious = () => {
        setStep(step - 1);
        setInvalidFieldsStepOne([]);
        setInvalidFieldsStepTwo([]);
        setInvalidFieldsStepThree([]);
    };

    const handleNext = () => {
        let missingFields = [];

        if (step === 1) {
            missingFields = getMissingFieldsStepOne();
            if (missingFields.length === 0) {
                setFormValues(formData);
                setStep(step + 1);
                return;
            }
            setInvalidFieldsStepOne(missingFields);
        } else if (step === 2) {
            missingFields = getMissingFieldsStepTwo();
            if (missingFields.length === 0) {
                setFormValues(formData);
                setStep(step + 1);
                return;
            }
            setInvalidFieldsStepTwo(missingFields);
        }
    };



    const handleSubmit = () => {
        let missingFields = getMissingFieldsStepThree();
        if (missingFields.length === 0) {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => {
                data.append(key, value);
            });

            axios.post("http://localhost:8885/student/Inscription", data)
            .then(res => {
                console.log(res)
                if (res.data.error) {
                    alert(`${res.data.error.message}`)
                    // toast.error(res.data.error.message, {
                    //     position: 'top-center',
                    //     autoClose: 3000,
                    //     hideProgressBar: true, 
                    //     transitionDuration: 0, 
                    //     theme: 'colored',
                    // })
                } else {
                    alert(`${res.data.message}`)
                    // toast.info("🚀  " + res.data.message, {
                    //     position: 'top-center', 
                    //     autoClose: 3000,
                    //     hideProgressBar: true, 
                    //     transitionDuration: 0,
                    //     icon: false,
                    //     theme: 'colored', 
                    // })
                }
                
                // Navigate('/Propos')
            })
        //     .catch(err => console.log(err))
        } else {
            setInvalidFieldsStepThree(missingFields);
        }
    };


    // const isStepOnevalid = formData.numConcours !== '' && formData.nom !== '' && formData.prenom !== '';
    // const isStepTwovalid = formData.datenais !== '' && formData.adresse !== '' && formData.email !== '';

    const getMissingFieldsStepOne = () => {
        const missingFields = [];
        if (formData.numConcours === '') {
            missingFields.push('Numéro de concours');
        }
        if (formData.nom === '') {
            missingFields.push('Nom');
        }
        if (formData.prenom === '') {
            missingFields.push('Prénom');
        }
        return missingFields;
    };
    const getMissingFieldsStepTwo = () => {
        const missingFields = [];
        if (formData.datenais === '') {
            missingFields.push('datenais');
        }
        if (formData.adresse === '') {
            missingFields.push('adresse');
        }
        if (formData.email === '') {
            missingFields.push('email');
        }
        return missingFields;
    };
    
    const getMissingFieldsStepThree = () => {
        const missingFields = [];
        if (formData.parcours === '') {
            missingFields.push('parcours');
        }
        if (!formData.bordereau) {
            missingFields.push('bordereau');
        }
        if (!formData.etudiant) {
            missingFields.push('etudiant');
        }
        return missingFields;
    };
    




    return (
        <div>
             <ToastContainer limit={2}/>
            <div className='header1'>
                <div className="logo">
                    <img src="logo.png" alt="Logo" />
                </div>
                <div className='text'>
                    <div className="inscription">
                        {/* <Link to="/Inscription" className='link'>S'inscrire</Link> */}
                        <Link to="/Registration" className='link'>S'inscrire</Link>
                    </div>
                    <div className="about">
                        <Link to="Propos" className='link'>A propos</Link>
                    </div>
                </div>

            </div>
            <div className="register">
                <div className="registerinfo">
                    <div className="test">
                        <h1>Inscrivez-vous</h1>
                    </div>
                    <br />
                    <h2>Veuillez remplir les champs par vos informations personnelles afin de s'inscrire en
                        première année de licence professionnelle</h2>
                </div>
                <div>
                   
                    {step === 1 && (
                        <form className="Container">
                            <div className="container">
                                <h2>Étape 1: Informations personnelles</h2>
                                <div>
                                    <label>
                                        Numéro de concours:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepOne.includes('Numéro de concours') ? 'input-error' : ''}`}
                                                value={formValues.numConcours}
                                                placeholder={invalidFieldsStepOne.includes('Numéro de concours') ? "Veuillez remplir ce champ" : ""}
                                                type="text"
                                                name="numConcours"
                                                onChange={handleChange} required />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Nom:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepOne.includes('Nom') ? 'input-error' : ''}`}
                                                value={formValues.nom}
                                                placeholder={invalidFieldsStepOne.includes('Nom') ? "Veuillez remplir ce champ" : ""}
                                                type="text"
                                                name="nom"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Prénom:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepOne.includes('Prénom') ? 'input-error' : ""}`}
                                                id="prenom" value={formValues.prenom}
                                                placeholder={invalidFieldsStepOne.includes('Prénom') ? "Veuillez remplir ce champ" : ""}
                                                type="text"
                                                name="prenom"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                    </label>
                                </div>
                                <div className='continue'>
                                    {/* <Link to="/" className='linkHome'>Annuler</Link> */}
                                    <button className='continue' type="button" onClick={handleNext} >Suivant</button>
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 2 && (
                        <form className="Container">
                            <div className="container">
                                <h2>Étape 1: Informations personnelles</h2>
                                <div>
                                    <label>
                                        Date de naissance:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepTwo.includes('datenais') ? 'input-error' : ''}`}
                                                value={formValues.datenais}
                                                type="date"
                                                name="datenais"
                                                onChange={handleChange}
                                                required />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Adresse:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepTwo.includes('adresse') ? 'input-error' : ''}`}
                                                value={formValues.adresse}
                                                type="text"
                                                name="adresse"
                                                placeholder={invalidFieldsStepTwo.includes('adresse') ? "Veuillez remplir ce champ" : ""}
                                                onChange={handleChange}
                                                required />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Adresse e-mail:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepTwo.includes('email') ? 'input-error' : ''}`}
                                                value={formValues.email}
                                                type="email"
                                                name="email"
                                                placeholder={invalidFieldsStepTwo.includes('email') ? "Veuillez remplir ce champ" : ""}
                                                onChange={handleChange}
                                                required />
                                        </div>
                                    </label>
                                </div>
                                <div className='boutCont'>
                                    <div>
                                        <button className='precedant' type="button" onClick={handlePrevious}>Précédant</button>
                                    </div>
                                    <div>
                                        <button className='suivant' type="button" onClick={handleNext}>Suivant</button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    )}
                    {step === 3 && (
                        <form className="Container">
                            <div className="container">
                                <h2>Étape 1: Informations personnelles</h2>
                                <div>
                                    <label>
                                        Parcours:
                                        <div>
                                            <select className={`select ${invalidFieldsStepThree.includes('parcours') ? 'input-error' : ''}`} name="parcours" onChange={handleChange}>
                                                <option value="">Sélectionnez un parcours</option>
                                                <option value="Informatique générale">Informatique générale</option>
                                                <option value="Professionnelle">Professionnelle</option>
                                            </select>
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Photo bordereau:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepThree.includes('bordereau') ? 'file-error' : ''}`}
                                                type="file"
                                                name="bordereau"
                                                onChange={handleChange} />
                                        </div>
                                    </label>
                                </div>
                                <div>
                                    <label>
                                        Photo d'identité:
                                        <div>
                                            <input className={`input-box ${invalidFieldsStepThree.includes('etudiant') ? 'file-error' : ''}`}
                                                type="file"
                                                name="etudiant"
                                                onChange={handleChange} />
                                        </div>
                                    </label>
                                </div>
                                <div className='boutCont'>
                                    <button className='precedant' type="button" onClick={handlePrevious}>Précédant</button>
                                    <button className='inscri' type="button" onClick={handleSubmit}>Inscription</button>
                                </div>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>


    );
};

export default Registration;
