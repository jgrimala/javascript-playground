
//Objet littéral pour les questions du quizQuestions
/* Création des questions de façon dynamique */
/* Questions à choix multiples et à réponses textuelles*/
export let quizQuestions = 
{
	listeQuestions : 
	[
		{
			type: "multiples",
			probleme: "Quel est le système de mesure officiel du Canada?",
			choix: ['européen', 'métrique', 'impérial', 'américain'],
			bonneReponse: 1,
			details: "Le système métrique est également le système de mesure international."
		},

		{
			type: "multiples",
			probleme: "En quelle année le Canada a-t'il adopté le système métrique?",
			choix: [1930, 1970, 1995, 2005],
			bonneReponse: 1,
			details: "En 1970, le Canada adopte le système métrique cependant, les canadiens le découvriront seulement 5 années plus tard alors que le Celsius fait son entré dans le domaine de la météorologie."
		},

		{
			type: "texte",
			probleme: "En combien de parts égales sont divisés le pied le pouce?",
			bonneReponse: "12",
			details: "12 parts! On parle alors de douzièmes de pouce."
		},

		{
			type: "multiples",
			probleme: "En quelle année les Canadiens ont-ils vu pour la première fois des panneaux de signalisation utilisant le système métrique?",
			choix: [1963, 1970, 1977, 1981],
			bonneReponse: 2,
			details: "En 1977. Parallèlement,  des voitures avec des compteurs de vitesse et des compteurs kilométriques gradués en unités métriques font leur apparition."
		},

		{
			type: "multiples",
			probleme: "À l'époque, combien de temps le Canada avait prévu pour une transition complète vers le système métrique?",
			choix: ['2 ans', '5 ans', '10 ans', '20 ans', '50 ans'],
			bonneReponse: 3,
			details: "Le ministre de l’Industrie et du Commerce, Jean-Luc Pépin , estimait alors que le Canada prendrait environ 20 ans avant de se convertir entièrement au système métrique. Presque 50 ans plus tard, la conversion n’est que partielle dans plusieurs secteurs."
		},

		{
			type: "multiples",
			probleme: "Une livre équivaut à combien de grammes?",
			choix: ['354g', '454g', '1254g', '2040g', '2050g',],
			bonneReponse: 1,
			details: "Une livre équivaut à 454 grammes tout comme un gallon canadien équivaut à 4,54 litres."
		},

		{
			type: "texte",
			probleme: "Aujourd'hui, combien de pays utilisent encore le système impérial?",
			bonneReponse: "6",
			details: "6 pays! Les États-Unis, la Birmanie, la Liberia Palaos, les îles Marshall et les États fédérés de Micronésie utilisent encore en 2019 le système d'unité imprérial"
		},

		{
			type: "multiples",
			probleme: "Vrai ou faux? la pinte britannique vaut un peu moins qu’un litre, et la pinte américaine, un peu plus... ",
			choix: ['vrai', 'faux'],
			bonneReponse: 1,
			details: "C'est faux! La pinte américaine vaut un peu moins qu’un litre, et la pinte britannique, un peu plus."
		},

		{
			type: "multiples",
			probleme: "Indiquez le point d'ébullition de l'eau en fahrenheit",
			choix: ['-212℉', '0℉', '454 ℉', '100 ℉', '212 ℉', '-38 ℉'],
			bonneReponse: 4,
			details: "Le point d'ébullition de l'eau est à 212 °FFahrenheit (°F) alors que son point de congélation est à 32 °F (sous une pression atmosphérique normale)."
		},

		{
			type: "texte",
			probleme: "Combien de doigts possèdent normalement l'humain?",
			bonneReponse: "10",
			details: "Dix... comme dans décimal..."
		},

	],

	commentaires: 
	{
		bonneReponse: "Génial!",
		mauvaiseReponse: "Non!!!"
	}
}
