/******************************FICHIER CENTRAL****************************************/

/*****************************LES IMPORTATIONS DE MODULES*****************************/	
import {Fenetre} from './Fenetre.mjs';
import {AnimMot} from './animMot.mjs';
import {AnimDetails} from './animDetails.mjs';
import {Intro} from './Intro.mjs';
import {quizQuestions} from './quizQuestions.mjs';


/*************************************LES VARIABLES*************************************/	
let noQuestionEnCours, //no de la question en cours
	laQuestion, //La question à afficher
	type, //type de question
	titreConteneur, //Conteneur du titre
	lesChoixDeReponses, //un tableau des div unChoix dans sectionChoix")
	reponseTexte, //div contenant le tag input pour les questions de type "texte"
	reponseInput, //champs texte pour les questions de type texte
	reponse,
	boutonConfirmer, //bouton/div pour confirmer le champs texte des questions a type "texte"
	sectionChoix, //la div id="lesChoix"
	unChoix , //une div class="choix" a ajouter avec appenchild a div sectionChoix"
	nbChoix, //le nombre de unChoix dans une question

	boutonSuivant, //Bouton pour afficher les questions suivantes
	score, //Le score du jeu
	scorePourcent, //le score en pourcentage
	pourcentQuiz, //pourcentage du quiz complete
	leCercle, //le score en cercle graphique
	contCercle, //conteneur du cercle
	meilleurScore; //Le meilleur score du joueur...
	


/*************************************LES BALISESS*************************************/	
	//On récupère les balises où seront affichées les infos ou autres
	titreConteneur = document.querySelector("#titreConteneur");
	unChoix = document.querySelector(".choix");
	sectionChoix = document.getElementById("lesChoix");

	boutonSuivant = document.querySelector("#suivant");
	leCercle = document.getElementById("bar");
	contCercle = document.getElementById("cont");
	scorePourcent = 0; //score courant en pourcentage
	reponseTexte = document.getElementById('reponseTexte');

	
	//On vérifie s'il y a un meileur score déjà enregistré
	meilleurScore = localStorage.getItem("scoreCalcul") === null ? 0 : localStorage.getItem("scoreCalcul");

/*************************************LES FONCTIONS*************************************/		
	//On initialise les valeurs du quiz
	initialiserQuiz();

/*Fonction permettant de mettre le quiz à son état initial*/	
	function initialiserQuiz(evt) 
	{
		//Initialiser les variables
		noQuestionEnCours = 0;
		score = 0;
		pourcentQuiz = 0;
		localStorage.clear();
		afficherIntro();
		//On affiche la première question		
	}

	
/*Fonction permettant d'afficher une fenêtre à la fin du jeu et qui offre un message et un compte rendu du quiz'*/	
	function afficherIntro() {
		let laPage = document.querySelector("body");
		let largeur = laPage.offsetWidth,
			hauteur = laPage.offsetHeight,
			texte = "<h1>Pesez et Mesurez vos connaissances!</h1>";
			texte += "<h2>Cliquez pour commencer!</h2>";
		//Instancier une fenêtre
		let uneIntro = new Intro(0, 0, largeur, hauteur, "intro", texte, laPage, afficherProchaineQuestion);
		
	}


/*Fonction permettant de d'afficher la prochaine question ou de terminer le quizQuestions*/		
	function afficherProchaineQuestion(evt) {
		//S'il reste une question on l'affiche, sinon c'est la fin du jeu...
		//On affiche les choix de réponse ou champs texte
		//On désactive le bouton suivant	
		console.log('la question en cours : ' + noQuestionEnCours);

		if (noQuestionEnCours < quizQuestions.listeQuestions.length) 
		{
			type = quizQuestions.listeQuestions[noQuestionEnCours].type;
			laQuestion = document.createElement("div");
			laQuestion.setAttribute("id","titreQuestion");
			titreConteneur.appendChild(laQuestion);
			//On affiche la question
			
			laQuestion.innerHTML = quizQuestions.listeQuestions[noQuestionEnCours].probleme;

			if(type === "multiples")
			{
				//On affiche dynamiquement les choix 
				for (let i = 0; i < quizQuestions.listeQuestions[noQuestionEnCours].choix.length; i++) 
				{
					lesChoixDeReponses = '';
					nbChoix = quizQuestions.listeQuestions[noQuestionEnCours].choix.length;
					console.log("nbChoix : "+ nbChoix );
					
					//Le nb de choix qui s'affiche sont crees dynamiquement ici
					if (i < nbChoix) 
					{
						unChoix = document.createElement("div");
						unChoix.setAttribute("class","choix");
						sectionChoix.appendChild(unChoix);
						
						lesChoixDeReponses = document.querySelectorAll(".choix");
						//On met un écouteur pour choisir la réponse			
						lesChoixDeReponses[i].addEventListener('mousedown', choisirReponse, false);	
					
						console.log('les choix : ' + quizQuestions.listeQuestions[noQuestionEnCours].choix[i]);
						//On affecte dynamiquement l'index à chaque choix 
						lesChoixDeReponses[i].innerHTML = quizQuestions.listeQuestions[noQuestionEnCours].choix[i];
						lesChoixDeReponses[i].id = i;
						console.log("les choixDeReponses: " + lesChoixDeReponses[i]);
					}
				}	
			}
			if(type === "texte")
			{
				reponseTexte = document.createElement("div");
				reponseTexte.setAttribute("id","reponseTexte");
				sectionChoix.appendChild(reponseTexte);

				reponseInput = document.createElement("input");		
				reponseInput.setAttribute("type","text");
				reponseInput.setAttribute("id","reponseInput");
				//reponseInput.setAttribute("value", "");
				reponseTexte.appendChild(reponseInput);
				//console.log("reponseInput.value : " + reponseInput.value);
			
				boutonConfirmer = document.createElement("button");				
				boutonConfirmer.setAttribute("id", "boutonConfirmer");
				reponseTexte.appendChild(boutonConfirmer);
				boutonConfirmer.innerHTML = "confirmez";

				boutonConfirmer.addEventListener('mousedown', choisirReponse, false)
			}			
		}	
		else 
		{
			finJeu();
		}
		
		//On désactive le bouton suivant
		gererBoutonSuivant(false, 0.3);	
	};

/*Fonction permettant de lire les réponses aux questions, modifier le score et activer ou désactiver les choix*/	
	function choisirReponse(evt) {
		//On enlève les écouteurs sur les boutons pour enregistrer la réponse et empecher de selectionner une autre reponse

		//SI question à choix multiples...
		if(type === "multiples")
		{
			reponse = parseInt(evt.target.id);
		}

		//Si question avec réponse à entrer
		if(type === "texte")
		{	
			localStorage.setItem('reponseInput', JSON.stringify(reponseInput.value));
			
			reponse = JSON.parse(localStorage.getItem('reponseInput'));
		}
		if ( reponse === quizQuestions.listeQuestions[noQuestionEnCours].bonneReponse)
		{
			//On incrémente le score
			score++;
			//On affiche un message en haut du bouton cliqué
			afficherMessage(evt.target, quizQuestions.commentaires.bonneReponse);
		}
		else
		{
			afficherMessage(evt.target, quizQuestions.commentaires.mauvaiseReponse);
		}
	
		let details = quizQuestions.listeQuestions[noQuestionEnCours].details;
		scorePourcent = score * 100 / quizQuestions.listeQuestions.length;
		pourcentQuiz = (noQuestionEnCours+1) * 100 / quizQuestions.listeQuestions.length;
		contCercle.setAttribute('data-pct', pourcentQuiz);
	
		//On vérifie s'il s'agit de la bonne réponse
		cercleProgression(pourcentQuiz);
		afficherDetails(details);
		//On incrémente le no de la prochaine question à afficher
		noQuestionEnCours++;	

		//On affiche le score et on ré-active le bouton suivant
		gererBoutonSuivant(true, 1);
	};  

/*fonction du cercle de progression*/
	function cercleProgression(pourcentQuiz){
		
		if (isNaN(pourcentQuiz)) 
		{
			pourcentQuiz = 100; 
		}
		else
		{
			let r = leCercle.getAttribute('r');
	
			console.log("r : " + r);
			var c = Math.PI*(r*2);
		}
		if(pourcentQuiz < 0) 
		{ 
			pourcentQuiz = 0;
		}
		if(pourcentQuiz > 100) 
		{ 
			pourcentQuiz = 100;
		}
		var pct = ((100-pourcentQuiz)/100)*c;
		console.log("pct : " + pct);
		leCercle.setAttribute('style', 'stroke-dashoffset:'+pct);
		contCercle.setAttribute('data-pct', pourcentQuiz);

		let progression = document.getElementById('progression');
		progression.innerHTML = pourcentQuiz.toFixed(0) + "%";
	}


/*Fonction permettant d'afficher un message un fois que l'usager répond à une question*/	
	function afficherMessage(boutonSuivant, message) {
		//console.log("afficherMessage", bouton, message);
		//On affiche le message au dessus du bouton avec la même fonte que la section
		let elmSection = document.querySelector("section");
		elmSection.setAttribute('id', 'sectionMessage');
		
		let unMessage = new AnimMot( message, elmSection);
	}


/*Fonction permettant d'afficher des renseignements supplementaires un fois que l'usager répond à une question*/	
	function afficherDetails(details) {	
		//On retire les elements dans la div sectionChoix
		while(sectionChoix.hasChildNodes())
		{               
			sectionChoix.removeChild(sectionChoix.lastChild);
		} 
		titreConteneur.removeChild(titreConteneur.lastChild);					
		//console.log("afficherMessage", bouton, message);
		//On affiche le message au dessus du bouton avec la même fonte que la section
		let elmSection2 = document.querySelector("section");
		let unMessage = new AnimDetails(details, elmSection2);
	}

/*Fonction permettant de conclure le jeu*/		
	function finJeu() {
		gererBoutonSuivant(false, 0.3);

		//Enregistrement du meilleur score
		meilleurScore = Math.max(meilleurScore, scorePourcent);
		localStorage.setItem("scoreCalcul", meilleurScore);

		//On affiche une fenêtre pour indiquer que le jeu est complété
		afficherFenetre();
	};

/*Fonction permettant d'afficher une fenêtre à la fin du jeu et qui offre un message et un compte rendu du quiz'*/	
	function afficherFenetre() {
		let laPage = document.querySelector("body");
		let largeur = laPage.offsetWidth,
			hauteur = laPage.offsetHeight,
			texte = "Le quiz est terminé!";
		meilleurScore = meilleurScore.toFixed(0);
		scorePourcent = scorePourcent.toFixed(0);
		//Texte additionnel...
		texte += "<br><br>Votre score est de " + scorePourcent + "%" + "!";
		texte += "<br>Votre meilleur score est de " + meilleurScore +  "%" + ".";		
		texte += "<br><br>Fermer la fenêtre pour rejouer!";

		//Instancier une fenêtre
		let uneFenetre = new Fenetre(0, 0, largeur, hauteur, "fenetre", texte, laPage, rejouer);
		
	};

/*Fonction permettant de d'activer ou désactiver le bouton suivant et de gèrer son apparence*/	
	function gererBoutonSuivant(actif, transparence) {
		//console.log("gererBoutonSuivant", actif, transparence);
		if (actif == true) {
			boutonSuivant.addEventListener("mousedown", afficherProchaineQuestion, false);
			boutonSuivant.addEventListener("mousedown", enleveDetails, false);
			

		} else {
			boutonSuivant.removeEventListener("mousedown", afficherProchaineQuestion, false);
		}
		boutonSuivant.style.opacity = transparence + "";
	}
/*Fonction qui permet de retirer les informations complémentaires données après une réponse*/
	function enleveDetails() 
    {
		let detailsAffiches = document.getElementById("details");
		//Enlever l'élément HTML de l'affichage
		detailsAffiches.parentNode.removeChild(detailsAffiches);
	
		//Détruire les références
		detailsAffiches = "";
	}

/*Fonction permettant de rejouer au jeu*/	
	function rejouer() {
		//On réinitialise le quiz
		initialiserQuiz();
	};
