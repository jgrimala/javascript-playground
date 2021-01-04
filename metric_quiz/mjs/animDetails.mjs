//Classe AnimDetail: les messages complémentaires après avoir choisi une réponse
//Classe permettant de créer et d'animer des éléments textuels
export class AnimDetails {
	/**
	 * @param {String} details  - chaîne indiquant la chaine à animer
	 * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les chaines animées
	 */

	constructor(details, conteneurParent) {
		this.details = details;
		this.conteneurParent = conteneurParent;

		//Autres propriétés de la chaine animée
		this.pourcentageOpacite = 2;

		//Créer la chaine
		this.creerDetails();
	}

/**
 * Méthode pour créer chaque instance de la classe AnimDetails et pour débuter leur animation
 */
	creerDetails () {
		//Créer une balise <div> pour la chaine et lui attribuer des styles
		this.elHTML = document.createElement('div');
		this.elHTML.style.position = "absolute";
		this.elHTML.style.display = "flex";
		this.elHTML.style.margin = "auto";
		this.elHTML.style.marginBottom = "40px";
		this.elHTML.id = "details";
		
		//Afficher le mot transféré et mettre l'élément HTML dans son conteneur parent
		this.elHTML.innerHTML = this.details;
		this.conteneurParent.appendChild(this.elHTML);
	}
	





/**
 * Méthode pour animer le mot et le détruire à la fin de son animation
 */	
	enleveDetails() 
    {
		//Enlever l'élément HTML de l'affichage
		this.conteneurParent.removeChild(this.elHTML);
			
		//Détruire les références
		this.elHTML = null;
		this.conteneurParent = null;
	}
} //Fin animDetails