//Gestionnaire d'événement
import {insererLivre, supprimerLivre} from "../services/livreService.js";
import {afficherLivres} from "./render.js";

export const setupGestionnaire = () => {
    //Récupérer les éléments dans le DOM
    const toogleFormBtn = document.querySelector("#toggleFormBtn")
    const FormSection = document.querySelector("#formSection")
    const formCollapse = new bootstrap.Collapse(formSection, {toggle : false})
    const livreForm = document.querySelector("#bookForm")

    //Gestionnaire clic bouton toogleFormBtn
    toogleFormBtn.addEventListener("click",  () => {
        console.log("click !")
        formCollapse.toggle()
    })

    //Onn reset le formulaire lorsque celui ci est caché
    formSection.addEventListener("hidden.bs.collapse", () => {
        livreForm.reset()
    })

    //Traitement du formulaire
    livreForm.addEventListener("submit", (evt) => {
        //empecher le rechargement de la page
        evt.preventDefault()
        //console.log(evt.target)
        //récuperer les éléments
        const titre = livreForm.title.value
        const auteur = livreForm.author.value
        const resume = livreForm.summary.value
        const estlu = livreForm.isRead.checked
        //console.log(titre,auteur,resume,estlu)

        //**************************************
        //Sauvegarder les données saisies
        //**************************************
        insererLivre(titre,auteur,resume,estlu)
        //Cacher (collapse) le formulaire
        formCollapse.hide()
        // Afficher la liste des livres
        afficherLivres()
    })

    // Traitement de la suppression d'un livre
    // Délégation d'événement
    const listeLivre = document.querySelector("#booksList")
    listeLivre.addEventListener("click", (evt) => {
        // récupérer l'élément sur lequel on a cliqué
        const target = evt.target.closest(".delete-btn , .toggle-read-btn")
        if (target === null) return;
        //Récupérer l'id du livre à supprimer
        const idLivre = target.dataset.id
        //Déterminer sur quel élément on a cliqué
        if (target.classList.contains("delete-btn")){
            supprimerLivre(idLivre)
            afficherLivres()
        } else if (target.classList.contains("toggle-read-btn"))  {

            afficherLivres()
        }
    })

}