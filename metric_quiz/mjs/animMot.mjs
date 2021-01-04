//Classe permettant de créer et d'animer des éléments textuels
export class AnimMot {

	/**
	 * @param {String} mot  - chaîne indiquant le mot à animer
	 * @param {HTMLElement} conteneurParent -  balise HTML pour afficher les mots animés
	 */

	constructor(mot, conteneurParent) {
		//Récupérer les valeurs passées en paramètre			

		this.mot = mot;
		this.conteneurParent = conteneurParent;

		//Autres propriétés du mot animé
		this.pourcentageOpacite = 1.5;
		this.pourcentageEchelle = 2;

		//Créer le mot
		this.creerMot();
	}

/**
 * Méthode pour créer chaque instance de la classe Mot et pour débuter leur animation
 */
	creerMot () {
		//Créer une balise <div> pour le mot et lui attribuer des styles
		this.elHTML = document.createElement('div');
		this.elHTML.style.position = "absolute";
		this.elHTML.style.margin = "auto";
		this.elHTML.style.marginTop = "40px";
		
		//Afficher le mot transféré et mettre l'élément HTML dans son conteneur parent
		this.elHTML.innerHTML = this.mot;
		this.conteneurParent.appendChild(this.elHTML);

		//Partir la première RequestAnimationFrame
		window.requestAnimationFrame(()=> {this.animerMot()});
	}

/**
 * Méthode pour animer le mot et le détruire à la fin de son animation
 */
    animerMot (tempsActuel) 
    {
		//console.log("AnimMot", this);
		//Décrémenter le pourcentage d'animation pour l'opacité
		this.pourcentageOpacite -= 0.05;
		//Incrémenter le pourcentage d'animation pour l'échelle
		this.pourcentageEchelle += 0.05;

		//Si le pourcentage de l'opacité est > 0, on anime le mot et on repart une nouvelle requête d'animation
		//Sinon, on enlève l'élément HTML de l'affichage et +

        if (this.pourcentageOpacite > 0) 
        {
			//Animer l'échelle et l'opacité du mot (i.e. de l'élément HTML)
			this.elHTML.style.opacity = this.pourcentageOpacite + "";
			this.elHTML.style.transform = `scale(${this.pourcentageEchelle})`;

			//Prochaine requête d'animation
			this.requeteID = window.requestAnimationFrame(()=> {this.animerMot()});	
        } 
        else 
        {
			//Enlever l'élément HTML de l'affichage
			this.conteneurParent.removeChild(this.elHTML);
			
			//Détruire les références
			this.elHTML = null;
			this.conteneurParent = null;
		}
	}
} //Fin animMot