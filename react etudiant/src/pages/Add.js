import React, { useState } from 'react';
import './css/css.css'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

const Add = () => {
    const [client, SetClient] = useState([])
    let Navigate = useNavigate()

    const onChange = (e) => {
        SetClient({
            ...client,
            [e.target.name]: e.target.value 
        })
        console.log(client);
    }

    const addClient = () => {
        //console.log(client)
        axios.put("http://localhost:8881/clients/", client)
             .then(res => {
                console.log(res)
                Navigate('/')
                Swal.fire({
                    title: 'Enregistré !!',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 1000,
                 });
             })
             .catch(err => console.log(err))
    }

    return (
        <div className="container">
            <div className="row">
                <div className="add">
                    <h4 id='id'>Création données</h4>
                    <form>
                        <div className="col-md-3 o">
                            <label for="nom" className="form-label">Nom</label>
                            <input type="text" className="form-control" name="nom" onChange={onChange} id="nom" required/>
                        </div>
                        <div className="col-md-3">
                            <label for="solde" className="form-label">Solde</label>
                            <input type="number" className="form-control" name="solde" onChange={onChange} id="solde" required/>
                        </div>
                    </form>
                    <div className="d-flex align-items-md-start w">
                    {/*<span>{client.nom} {client.solde}</span>*/}
                        <button className="btn btn-outline-primary" onClick={() => addClient()} type="button" id="z">Enregistrer</button>
                        <Link to="/" className="btn btn-danger" type="button" id="x">Annuler</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Add;


// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const Test = () => {
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     concoursNumber: '',
//     firstName: '',
//     lastName: '',
//     dateOfBirth: '',
//     email: '',
//     parcours: '',
//     photoIdentite: null,
//     photoBordereau: null
//   });
  

//   const isStepOnevalid = concoursNumber !== '' && firstName !== '';


//   const navigate = useNavigate();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   const handleSubmit = () => {
//     // Envoyer les données au backend
//     console.log(formData);
//     // Rediriger vers la page info si les données sont complètes
//     navigate.push('/Propos');
//   };

//   const handlePrevious = () => {
//     setStep(step - 1);
//   };

//   return (
//     <form>
//       {step === 1 && (
//         <div>
//           <h2>Étape 1: Informations personnelles</h2>
//           <label>
//             Numéro de concours:
//             <input type="text" name="concoursNumber" value={formData.concoursNumber} onChange={handleChange} />
//           </label>
//           <label>
//             Prénom:
//             <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} />
//           </label>
//           {/* Ajoutez les autres champs ici */}
//           <button type="button" onClick={() => setStep(step + 1)} disabled={!isStepOnevalid}>Suivant</button>
//         </div>
//       )}
//       {step === 2 && (
//         <div>
//           <h2>Étape 2: Choix du parcours</h2>
//           <label>
//             Parcours:
//             <select name="parcours" value={formData.parcours} onChange={handleChange}>
//               <option value="">Sélectionnez un parcours</option>
//               <option value="informatique_generale">Informatique générale</option>
//               <option value="informatique_professionnelle">Informatique professionnelle</option>
//             </select>
//           </label>
//           <button type="button" onClick={handlePrevious}>Précédant</button>
//           <button type="button" onClick={() => setStep(step + 1)}>Suivant</button>
//         </div>
//       )}
//       {step === 3 && (
//         <div>
//           <h2>Étape 3: Importation des photos</h2>
//           {/* Ajoutez les champs pour les photos ici */}
//           <button type="button" onClick={handlePrevious}>Précédant</button>
//           <button type="button" onClick={handleSubmit}>Inscription</button>
//         </div>
//       )}
//     </form>
//   );
// };

// export default Test;