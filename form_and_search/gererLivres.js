// module pattern ou classe qui gère un tableau de livres

let gererLivres = (function(){

//fonction de filtrage
    function filtrer()
    {
        let titreArray = [];
        let auteurArray = [];
        let anneeArray = [];
    
    
        if(document.frm.titreContient.value != "")
        {
            let titreInput = document.frm.titreContient.value;
            for (i = 0; i < livres.length; i++)
            {
                if(livres[i].titre.toUpperCase().includes(titreInput.toUpperCase()))
                {                   
                    titreArray.push(livres[i]); 
                }
                afficherLivres(titreArray);
            }
            
        }
        if(document.frm.auteurContient.value != "")
        {
            let auteurInput = document.frm.auteurContient.value;
            for (i = 0; i < livres.length; i++)
            {
                if(livres[i].auteur.toUpperCase().includes(auteurInput.toUpperCase()))
                {                   
                    auteurArray.push(livres[i]); 
                }
                afficherLivres(auteurArray);
            }
        }

        if(document.frm.annee.value != "")
        {
            let anneeInput = document.frm.annee.value;
            for (i = 0; i < livres.length; i++)
            {
                if(livres[i].annee == anneeInput)
                {                   
                    anneeArray.push(livres[i]); 
                }
            }
            afficherLivres(anneeArray);
        }
//si tous les champs sont vides, tout afficher
        if(document.frm.titre == "" && document.frm.auteur == "" && document.frm.annee == "")
        {
            afficherLivres(livres);
        }
    }

 //Fonction pour afficher le tableau des livres seleon la selection   
    function afficherLivres(type)
    {
        let listeHTML = "<table>";
        listeHTML += "<tr><th>Titre</th><th>Auteur</th><th>Année</th><th>Nbr emprunts</th></tr>";     
        for (let i = 0; i < type.length; i++) 
        {    
            let l = type[i];
            listeHTML += `<tr><td>${l.titre}</td><td>${l.auteur}</td><td>${l.annee}</td><td>${l.nbEmprunts}</td>`;	       
        }
        listeHTML += "</table>";
        document.getElementById("result").innerHTML = listeHTML;
    }

 //Fonction pour calculer les statistiques   
    function calculerStats(){
        let compteur = 0;
        let nbEmprunts = 0;  
        let empruntMoyen;  

        for(var i = 0; i < livres.length;i++)
        {
            compteur++;   
            nbEmprunts = nbEmprunts + livres[i].nbEmprunts;

            console.log("livres.length : " + livres.length);
            console.log("nbEmprunt: " + nbEmprunts);
            console.log("compteur: " + compteur);
            
        }   
        empruntMoyen = nbEmprunts / compteur;
        liste = "Le prix moyen d'emprunt par livre est : " + empruntMoyen;
        
        console.log(liste);
        return liste;
    }
 
//fonction pour afficher les statistiques
    function afficherStats(){
        let liste = calculerStats();
        document.getElementById("result").innerHTML = liste;
   
    } 
// obj est publique    
    var obj = 
    {
        afficher: function()
        {
            button.addEventListener('click', filtrer());                        
        },
        statistiques: function()
        {
            afficherStats();
        }   
            
    }
    
    return obj;        

})();  // IIFE