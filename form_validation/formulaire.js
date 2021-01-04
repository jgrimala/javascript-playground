export let formulaire = {
    nom:
        {
            
            type: "text",
            name: nom,
            regex: /^[a-z][a-z\s\-\']*[a-z]$/i,
            message: "Doit contenir un ou plusieurs mots alphabétiques séparés par un espace, un tiret ou une apostrophe. "
        },
    prenom:
        {
            type: "text",
            name: prenom,
            regex: /^[a-z][a-z\s\-\']*[a-z]$/i,
            message: "Doit contenir un ou plusieurs mots alphabétiques séparés par un espace ou un tiret. "
        },
    courriel:
        {
            type: "text",
            name: courriel,
            regex: /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i,
            message: "Veuillez entrer une adresse courriel valide. "
        },
    codeConfidentiel:
        {
            type: "text",
            name: codeConfidentiel,
            regex: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])*([^\s]){8,16}$/,
            message: "Doit contenir 8 caractères minimum sans espace, avec au moins un chiffre, une majuscule et une minuscule. "
        },
    sexe: 
        {
            type: "radio",
            name: "sexe",
            regex: "",
            message: "Veuillez sélectionner un genre. "
        },
    locationAchat: 
        {
            type: "radio",
            name: "locationAchat",
            regex: "",
            message: "Veuillez sélectionner une option. "
        },
    type: 
        {
            type: "select",
            name: "text",
            regex: "",
            message: "Veuillez sélectionner un type de logement. "
        },
    codePostal: 
        {
            type: "text",
            name: codePostal,
            regex: /^[a-zA-Z][0-9][a-zA-Z]\s{1}[0-9][a-zA-Z][0-9]$/,
            message: "Veuillez entrer un code postal valide. "
        },
    anneeConstruction: 
        {
            type: "date",
            name: anneeConstruction,
            regex: /^[0-9]{4}$/,
            message: "Veuillez entrer une année de construction. "
        },
    superficie: 
        {
            type: "number",
            name: superficie,
            regex: /^[0-9]{1,8}$/,
            message: "Veuillez entrer une superficie. "
        },
    nbPieces: 
        {
            type: "number",
            name: nbPieces,
            regex: /^[0-9]{2}([\ ]{1}(1\/2)){0,1}$/,
            message: "Veuillez entrer un nombre de pièces. "
        },
    'aProximiteDe[]': 
        {
            type: "select",
            name: 'aProximiteDe[]',
            regex: "",
            message: "Veuillez sélectionner au moins une option. "
        },
    presentation: 
        {
            type: "textarea",
            name: "presentation",
            regex: "",
            message: "Décrivez les atouts de votre logement. "
        }
}