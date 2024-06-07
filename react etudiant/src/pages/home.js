import React from 'react';
import { Link } from 'react-router-dom';
import "./css/css.css"
import Header from './header';

const Home = () => {
    return (
        <div className='body'>
            <Header />

            <section className="hero">
                <div className="container">
                    {/* <h1>L'Ecole Nationale d'Informatique</h1>
                    <p>Votre passerelle vers l'avenir de la technologie.</p> */}
                    <h1>La pépinière des élites informaticiennes</h1>
                    <h1>Ecole Ingénieuse</h1>
                    <p>Votre passerelle vers l'avenir de la technologie</p>
                    <Link to="/Inscription" className='bout'>Inscrivez-vous maintenant</Link>
                </div>
            </section>
            <div className='section'>
                <section>
                    <div className="contenant">
                        <div className="colonne">
                            <div className="colonne1">
                                <img className="img" src="photo.jpg" />
                            </div>
                            <div className="information">
                                <h2>Information d’ordre générale </h2>
                                <p>Située au cœur de Fianarantsoa, notre université est dédiée à l'excellence
                                    dans l'enseignement de l'informatique et à la formation de professionnels
                                    compétents et innovants.<br />
                                    L’Ecole Nationale d’Informatique, en abrégé ENI, est un établissement
                                    d’enseignement supérieur rattaché académiquement et administrativement à
                                    l’Université de Fianarantsoa. L’ENI se positionne sur l’échiquier socio-éducatif
                                    malgache comme étant le plus puissant secteur de diffusion et de vulgarisation
                                    des connaissances et des technologies informatiques. Cette Ecole Supérieure peut
                                    être considérée aujourd’hui comme la vitrine et la pépinière des élites
                                    informaticiennes du pays.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
                <section className='partie2'>
                    <div className="contenant">
                        <div className="collone">
                            <div className="information1">
                                <h2>Débouchés professionnels et diplômés</h2>
                                <p>Les formations proposées par l’Ecole permettent aux diplômés d’être immédiatement
                                    opérationnels sur le marché du travail avec la connaissance d’un métier complet
                                    lié à l’informatique aux TIC (Technologies de l’Information et de la
                                    Communication).
                                    <br /> L’Ecole apporte à ses étudiants un savoir-faire et un savoir-être qui les
                                    accompagnent tout au long de leur vie professionnelle. Elle a une vocation
                                    professionnalisante. Les diplômés en LICENCE et en MASTER issus de l’ENI
                                    peuvent faire carrière dans différents secteurs.
                                    <br /> L’Ecole bénéficie aujourd’hui de 40 années d’expériences pédagogiques
                                    et de reconnaissance auprès des sociétés, des entreprises et des organismes.
                                    C’est une Ecole Supérieure de référence en matière informatique.
                                </p>
                            </div>
                            <div className="information2">
                                <h2>Mention et parcours</h2>
                                <p>La formation en vue de l’obtention du diplôme de Licence Professionnelle en
                                    Informatique a été mise en place à l’ENI avec les trois parcours de formation :
                                    <div className='parcours'>
                                        ➣ Génie Logiciel et base de Données.
                                        <br />   ➣ Administration des Système et réseaux.
                                        <br />   ➣ Informatique Générale.
                                    </div>

                                    <br />En 2023, une nouvelle mention Intelligence Artificielle (IA)
                                    a été ouvert au sein de l’Ecole pour répondre les besoins des entreprises.
                                    La formation est destinée aux étudiants titulaires du diplôme de licence (Bac +3)
                                    en Mathématiques ou en Statistiques ou en Informatique, etc. La mention IA
                                    comporte deux parcours :
                                    <div className='parcours'>
                                        ➣ Gouvernance et Ingénierie de Données (GID).
                                        <br />   ➣ Objets connectés et Cybersécurité (OCC).
                                    </div>
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="section3">
                    <div className="ressource">
                        <h2 class="display-6 text-center">Ressources humaines</h2>
                        <p class="text-center text-black m-0 small">L’ENI compte quinze (15) enseignants permanents
                            dont un (01) Professeur Titulaire, un (01) Professeur, un (01) Docteur HDR, huit (08) Maîtres
                            de Conférences, quatre (04) Assistants d’Enseignement Supérieur et de Recherche, dix (10)
                            enseignants vacataires, quarante un (41) personnel administratif.</p>
                    </div>
                </section>

            </div>
        </div>
    );
};

export default Home;