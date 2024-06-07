import React, { useState } from "react";
import { Link } from "react-router-dom";

const Ex = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
        concoursNumber: '',
        name: '',
        firstName: '',
        dateNaissance: '',
        email: '',
        parcours: 'informatique_generale',
        photoIdentite: null,
        photoBordereau: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: files ? files[0] : value
        }));
    };

    const handlePrevious = () => {
        setStep(step - 1);
    };

    const handleNext = () => {
        setStep(step + 1);
    };

    const handleSubmit = () => {
        const data = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
            data.append(key, value);
        });
        data.forEach((value, key) => {
            console.log('mama', key, value);
        })
    };

    return (
        <div className="Container">
            {step === 1 && (
                <form>
                    <div>
                        <h2>Étape 1: Informations personnelles</h2>
                        <div>
                            <label>
                                Numéro de concours:
                                <div>
                                    <input className='input-box' type="number" name="concoursNumber" onChange={handleChange} required />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Nom:
                                <div>
                                    <input className='input-box' type="text" name="name" onChange={handleChange} required />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Prénom:
                                <div>
                                    <input className='input-box' type="text" name="firstName" onChange={handleChange} required />
                                </div>
                            </label>
                        </div>
                        <div className='boutCont'>
                            <Link to="/" className='linkHome'>Annuler</Link>
                            <button className='suivant' type="button" onClick={handleNext}>Suivant</button>
                        </div>
                    </div>
                </form>
            )}
            {step === 2 && (
                <form>
                    <div>
                        <h2>Étape 2: Informations personnelles</h2>
                        <div>
                            <label>
                                Date de naissance:
                                <div>
                                    <input className='input-box' type="date" name="dateNaissance" onChange={handleChange} required />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Adresse:
                                <div>
                                    <input className='input-box' type="text" name="adresse" onChange={handleChange} required />
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Adresse e-mail:
                                <div>
                                    <input className='input-box' type="email" name="email" onChange={handleChange} required />
                                </div>
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
                <form>
                    <div>
                        <h2>Étape 3: Informations personnelles</h2>
                        <div>
                            <label>
                                Parcours:
                                <div>
                                    <select className='select' name="parcours" onChange={handleChange}>
                                        <option value="">Sélectionnez un parcours</option>
                                        <option value="informatique_generale">Informatique générale</option>
                                        <option value="informatique_professionnelle">Professionnelle</option>
                                    </select>
                                </div>
                            </label>
                        </div>
                        <div>
                            <label>
                                Photo bordereau:
                                <div>
                                    <input className='input-box' type="file" name="photoBordereau" onChange={handleChange} />
                                </div>
                            </label>
                        </div>
                        <div className='boutCont'>
                            <label>
                                Photo d'identité:
                                <div>
                                    <input className='input-box' type="file" name="photoIdentite" onChange={handleChange} />
                                </div>
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
    );
};

export default Ex;
