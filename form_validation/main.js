import {formulaire} from "./formulaire.js";

let monModuleValidation = (function() {
    'use strict';
    function _validate(){
        let messageValide = '';
        form1.addEventListener("change", function(e)
        {

/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/   

            var target = e.target;      //<input type="text" id="unNom" name="nom" ...> //console.log("target :" + target);           
            var tName = target.name;    //<input name="nom">//console.log("tName :" + tName);
            var nameInput = form1[tName].value;     //outputs: Grimala  //console.log("nameInput : " + nameInput);
            var tType = formulaire[tName].type;
            let regex = formulaire[tName].regex;        //console.log("regex : " + regex);
            var formulaireName = formulaire[tName].name.name;       //console.log("formulaireName : " + formulaireName);
            var formulaireMessage = formulaire[tName].message;
                  
/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/           
            
            nameInput.replace(/(<([^>]+)>)/ig,""); //enlève les tag html dans les champs 'input'
            
/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/
            //on valide les champs selon le type de inputs
            _validerChamps();
            //si le nom dans l'objet formulaire = au nom en input
            messageValide = '';
            function _validerChamps(){
                /*if(formulaireName === tName)
                {  */
                    if(tType == "text" || tType == "number" || tType == "textarea" || tType == "date")
                    {
                        //console.log("c'est le type text: " + tType);
                        validerStrings(tName, regex, nameInput, formulaireMessage);
                        if(!validerStrings(tName, regex, nameInput, formulaireMessage) || (nameInput == ''))
                        {
                            messageValide = messageValide + formulaireMessage;
                            console.log("champs text invalide: " + messageValide);
                        }       
                    }
                    
                    
               /* }*/
                return messageValide; 
            }
            
/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/

            function validerStrings(name, regex, nameInput, message)
            {
                if(!regex.test(nameInput))
                { //teste le regex, si no match
                    _enleverElementDom(name); //on enleve la div et le message 
                    _creerElementDom(name, message); //on ajoute une div avec message          
                    return false;
                }
                else
                {
                    _enleverElementDom(name); //on enleve la div et le message               
                    return true;
                }   
            }

            function validerRadio(name, message)
            {
                var radios = document.getElementsByName(name);
                var radioValide = false;
            
                var i = 0;
                while (!radioValide && i < radios.length) 
                {
                    if(radios[i].checked)
                    {
                        radioValide = true;
                        console.log("Une option est checked!");
                        i++;                   
                        return true;
                    }        
                }
                if (!radioValide) 
                {
                    console.log(message);
                    return true;
                }
                else
                {
                    return false;
                }
            }

            function validerSelect(name, message)
            {            
                if(!name.value) {  
                    console.log(name, message);     
                    return false;  
                }
                else{
                    message="";
                    return true;
                }
            }
/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/

            function _creerElementDom(name, message) 
            {
                //_enleverElementDom(tName)
                var element = document.getElementById(name);
                var newElement = document.createElement('div');
                newElement.innerHTML = message;
                newElement.setAttribute("id", "newElement_" + tName);
                newElement.setAttribute("style", "color: red; font-style: italic; font-size: 0.8em");
                var elementParent = element.parentNode;
                elementParent.insertBefore(newElement, element.nextSibling);
            }
        
            function _enleverElementDom(tName)
            {
                var elementId = "newElement_" + tName;
                var element = document.getElementById(elementId);
                if(element !== null)
                {
                    element.innerHTML = "";
                    element.remove();
                }  
            }
/* ------------------------------------------------------------------*/
            // unfinished function for the submit button  :(
/* ------------------------------------------------------------------*/
            form1.envoi.addEventListener('click', function(){
                _validate();
                if(tType == "radio") // :(
                    {
                        //console.log("c'est le type radio: " + tType);
                        validerRadio(tName, formulaireMessage);
                        if(!validerRadio(tName, formulaireMessage))
                        {
                            messageValide = messageValide + formulaireMessage;
                            console.log("champs radio invalide: " + messageValide);
                        }
                    }
                    if(tType == "select") // :(
                    {
                        //console.log("c'est le type select: " + tType);
                        validerSelect(tName, formulaireMessage);
                        if(!validerSelect(tName, formulaireMessage))
                        {
                            messageValide = messageValide + formulaireMessage;
                            console.log("champs select invalide: " + messageValide);   
                        }
                    }
                if(messageValide == '')
                {  
                    console.log("Felicitations, formulaire valide");
                }
                else
                {
                    console.log("Veuillez vérifier votre formulaire");
                }
                /*var elements = document.querySelectorAll("form input[type]")

                for (var i = 0, element; element = elements[i++];) {
                    tName = element.name;
                    //console.log(tName);
                    formulaireMessage = formulaire[tName].message;
                    //console.log(formulaireMessage);
                    _validerChamps();
                    //console.log(element);
                }
                if(messageValide == ''){
                    console.log("Tout est valide!!!");
                }
                else
                {
                    console.log("un ou plusieurs champs sont invalides");
                }*/ 
            })          
/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/

        })
         
    }
    

return {       
        valider: function()
        {
            _validate();
            
        }
    };

}());

/* ------------------------------------------------------------------*/
/* ------------------------------------------------------------------*/

monModuleValidation.valider();
