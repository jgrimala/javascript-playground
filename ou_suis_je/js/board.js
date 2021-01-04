
var moduleBoard = (function(){
    let compteurCoups = 0;
    let compteurJeu = 0;
    var values = []
    

    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  METHODES PRIVES - CONSTRUCTION DU JEU
     */ 
    //Etabli au hasard la case recherchee
    function _winCell(){
        let rowCount = document.getElementById("setRows").value;
        let columnCount = document.getElementById("setColumns").value;

        let coordinates = [];

        //position x et y au hasard
        let maxX = rowCount;  
        let randomX = Math.floor(Math.random() * maxX) + 1; 
        coordinates[0] = randomX; //console.log("x = " + randomX);
        let maxY = columnCount;  
        let randomY = Math.floor(Math.random() * maxY) + 1; 
        coordinates[1] = randomY; 
        return coordinates;         
    }

    //Etabli la distance maximale entre la case actuelle et celle recherchee
    let maxDistance = function(winCellCoord, cellCoordinates){
        //extraction des corrdonnees x,y de la case recherchee
        let wRow = winCellCoord[0]; /* console.log("wRow : " + wRow); */
        let wCol = winCellCoord[1]; /* console.log("wCol : " + wCol); */
 
        //extraction des corrdonnees de la case actuelle
        let cRow = cellCoordinates[0]; /* console.log("cRow : " + cRow); */
        let cCol = cellCoordinates[1]; /* console.log("cCol : " + cCol); */
        
        //calculdes distance x et y
        let distanceRow = wRow - cRow;
        let distanceCol = wCol - cCol;
        
        //conversion en entier positif
        if(distanceRow < 0){
            distanceRow = distanceRow * -1;
        }
        if(distanceCol < 0){
            distanceCol = distanceCol * -1;
        }
        if(distanceRow >= distanceCol){
            maxDist = distanceRow;
        }
        else{
            maxDist = distanceCol;
        } 
        return maxDist;       
    }
    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  METHODES PRIVEES - CHRONOMETRE
     */  
    
    let interval;   
    function _startTimer() // fontion pour demarrer le chrono
    {
        var second = 0, minute = 0, hour = 0;
        var timer = document.querySelector(".timer");
        
        
        hour = hour < 10 ? "0" + hour : hour;
        interval = setInterval(function()
        {
            second = second < 10 ? "0" + second : second;
            
            timer.innerHTML = minute + ": " + second;
            second++;
            if(second == 60)
            {
                minute++;
                second = 0;
            }
            if(minute == 60)
            {
                hour++;
                minute = 0;
            }
        },1000); 
    }
    function _stopTimer() // fontion pour arreter le chrono
    {
        clearInterval(interval);
        var timer = document.querySelector(".timer");
        var timeEnd = timer.innerHTML; //console.log(timeEnd);
        return timeEnd;        
    }

    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  METHODES PRIVEES - FORMULES MATH
    */
    
    // Calcul du score
    function _calculeScore(temps, nbCoups){
        let score = 0;
        secondes = _convertTime(temps);
        secondes = 100 - parseInt(secondes)*10;
        console.log("100 - seconde : " + secondes)
        nbCoups = 100 - parseInt(nbCoups)*10;
     
        score = secondes * nbCoups;
        if(score < 0)
        {
            score = 0;
        }
        return score;
    }

    // Conversion du temps en secondes
    function _convertTime(temps){
        tempsArr = temps.split(':');
        let minutes = parseInt(tempsArr[0]); // Outputs: Harry
        let secondes = parseInt(tempsArr[1]);
        let totalSescondes = minutes * 60 + secondes;
        return totalSescondes;
    }
    
    // Calcule de moyenne
    function calculeMoy(total, compteur){
        let moyenne = total / compteur;
        moyenne = parseFloat(moyenne.toFixed(1));
        return moyenne;
    }

    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  METHODES PRIVEES - DONNEES DU JEU
    */

    //Collection des data du jeu en cours
    function _jeuData(dimensions, temps, nbCoups)
   {
        jeu = {
            dimensions: dimensions,
            temps: temps,
            nbCoups: nbCoups,
            score : _calculeScore(temps, nbCoups)
        };
        //creation d'un id
        dataKey = Object.keys(localStorage).length;
        window.localStorage.setItem(dataKey, JSON.stringify(jeu));
        let score = _calculeScore(temps, nbCoups);
        score = score.toFixed(0);
        let record = _getRecord(dimensions);
        record = parseFloat(record.toFixed(1));
        if(score == record)
        {
            let messageRecord = "Vous avez battu le record pour cette dimensions de grille!"
            _creerElementDom('statistics', messageRecord) ; 
        }
        let message = "Votre score est de " + score + " . Vous avez gagné cette partie en " + temps + " minutes avec " + nbCoups + " coups. Le record pour une partie de " + dimensions + " est " + record + "."; 
        _creerElementDom('statistics', message) ; 
    }

    function _getRecord(dimensions)
    {
        record = 0;
        values = _grouperDimensions();
        for(var i in values)
        {
            if(i == dimensions)
            {
                for(var j = 0; j < values[i].length; j++)
                {
                    let score = values[i][j].score;
                    if(score > record)
                    {
                        record = score;
                    }
                }
            }            
        }
        return record;
    }
    // Recupere les donnees du localstorage
    function _getStorageValues(){
        var  keys = Object.keys(localStorage),
        i = keys.length;
        let valeurs = [],
        array = [];
        while ( i-- ) 
        {
            array = JSON.parse(localStorage.getItem(keys[i]));
            valeurs.push(array);
        }
        return valeurs;
        
    }
    function _grouperDimensions() {            
        values = _getStorageValues();
        var jeuxDimensions = values,
        // Grouper les donnees par dimensions
        result = jeuxDimensions.reduce(function (r, a) 
        {
            r[a.dimensions] = r[a.dimensions] || [];
            r[a.dimensions].push(a);
            return r;
        }, Object.create(null));
        return result;  
    } 


    // Caluler les statistiques et les afficher
    function _calculerStats(){
        let result = _grouperDimensions(); //console.log(result);
        for(var i in result)
        {   // Boucle pour une dimension de jeu
            let compteur = 0,
            dimensions,
            temps,
            tempsSecondes,
            tempsTotal = 0,
            tempsMoyens, 
            nbCoups,
            nbCoupsTotal = 0,
            nbCoupsMoyen,
            score,
            scoreTotal = 0,
            scoreMoyen,
            record = 0;

            for(var j = 0; j < result[i].length; j++)
            {  
                //Incrementation du compteur pour calculer le nb de parties jouees de cette dimension
                compteur++;

                dimensions = result[i][j].dimensions;
                nbCoups = result[i][j].nbCoups; 
                temps = result[i][j].temps;
                score = result[i][j].score;

                tempsSecondes = _convertTime(temps);

                tempsTotal += tempsSecondes;
                nbCoupsTotal += nbCoups;
                scoreTotal += score;

                
                tempsMoyens = calculeMoy(tempsTotal, compteur); // Calcul du temps moyen pour les parties de cette dimension
                nbCoupsMoyen = calculeMoy(nbCoupsTotal, compteur); // Calcul du nombre de coups moyen pour cette dimension de jeu
                scoreMoyen = calculeMoy(scoreTotal, compteur); // Calcul du scores moyen pour cette dimension de jeu
            
                record = _getRecord(dimensions);
            } 
            message = "Pour une grille de " + dimensions + ", il y a eu " + compteur + " parties de jouée(s). Le nombre de coups joués moyen est " + nbCoupsMoyen + " coups. Le temps moyen est " + tempsMoyens + " seconde(s). Le score moyen est " + scoreMoyen + " et le meilleur score enregistré est " + record + ".";
            
            _creerElementDom('statistics', message);
        }   
    }

    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  METHODES PRIVEES - AFFICHER/RETIRER LES MESSAGES
    */
    //Creation d'un element pour afficher un message
    function _creerElementDom(name, message) 
    {   
        var element = document.getElementById(name);
        var newElement = document.createElement('div');
        //newElement.setAttribute('class', "messages")
        newElement.innerHTML = message;    
        element.appendChild(newElement)       
    }

    // Supprimer tous les enfants d'un parent
    function _enleverElementDom(name)
    {
        var element = document.getElementById(name);
        if(element.hasChildNodes())
        {
            while (element.hasChildNodes()) 
            {
                element.removeChild(element.firstChild);
            }
        }
    }


    /**
     * ******************************************************************************************
     * ******************************************************************************************
     *  OBJET PUBLIQUE
     */
        
    var board = {

        createBoard: function(){ //Creation du board avec ses parametres
            // Reinitialiser la table
            _enleverElementDom("mess");
            _enleverElementDom("statistics");
            _enleverElementDom("gameboard");

            // Recupere les entrees pour les rangees et les colonnes
            let rowCount = document.getElementById("setRows").value;
            let columnCount = document.getElementById("setColumns").value;
            let cellSize = 60;
            // Determine au hasard une case gagnante
            let winCellCoord = _winCell(rowCount, columnCount);
            let distance; // la distance de la case courante et celle gagante
            let board = []; //Initialisation d'un tableau
            compteurCoups = 0;
            
            
            //Creer des rangees et des colonnes de 5 a 20
            if(rowCount < 5 || rowCount > 20 || columnCount < 5 || columnCount > 20)
            {
                var message = "<p>Veuillez choisir des nombres en 5 et 20</p>";
                _creerElementDom('mess', message);
            }
            else {
                //Calculer le width de la grille
                //Boucle for dans boucle for
                //Pour chaque colonne de chaque rangee, on assigne les attributs de la cell
                for(let i = 1; i <= rowCount; i++)
                {
                    for(let j = 1; j <= columnCount; j++)
                    {           
                        var square = document.createElement("div");
                        square.setAttribute("class", "square");
                        // creation d'un id pour chaque square
                        square.id = 's' + i + j;   
                
                        // position de chaque cell = multiple de row ou column par la taille 
                        let topPosition = j * cellSize;
                        let leftPosition = i * cellSize;			           
                        square.style.top = topPosition + 20 + 'px';
                        square.style.left = leftPosition - 10 + 'px';
        
                        // creation de des coordonnees x,y
                        let thisCell = [];
                        thisCell[0] = i;
                        thisCell[1] = j;
                        board.push(thisCell);
                        
                        // calcul de la distance avec la case recherchee
                        distance = maxDistance(winCellCoord, thisCell);
        
                        //inscription dans la case si case recherchee
                        if(distance == "0"){
                            square.innerHTML = "<p class='distance'>Win</p>"; /* console.log("this is the winning tile: " + thisCell) */
                        }
                        else{
                            //inscription de la distance dans la case
                            square.innerHTML = "<p class='distance'>" + distance + "</p>"; /* console.log("this tile is a max distance of the winning tile by " + distance + " tile(s)"); */   
                        }
                        //ajout de la div dans le board
                        gameBoardContainer.appendChild(square);                 
                    }
                }
            }
        }, // fin de createTable
       
        jouer: function(event){  //fonction qui demarre le jeu et permet de jouer
            
            if(compteurCoups === 0){
                _startTimer(); // Demarrage du chrono
            } 

            if(event.target.firstChild.innerHTML === "Win"){
                compteurCoups++;
                let temps = _stopTimer(); //Si case gagnante est trouvee, on arrete le chrono
                rowCount = document.getElementById("setRows").value;
                columnCount = document.getElementById("setColumns").value;
                dimensions = rowCount + "x" + columnCount;
                _jeuData(dimensions, temps, compteurCoups);             

                event.target.style.background = 'red';
                event.target.firstChild.style.color = "#bbb";
                event.target.firstChild.style.visibility = "visible";
            }
            else
            {
                event.target.style.background = '#bbb';
                event.target.style.color = "rgb(63, 58, 58)";
                event.target.firstChild.style.visibility = "visible";
                compteurCoups++;               
            }         
        }, // Fin de jouer

        statistiques: function(){
            // initialiser et afficher les statistiques et enlever le jeu de l'ecran          
            _enleverElementDom('statistics');
            _enleverElementDom('gameboard');
            _calculerStats();           
        } // fin de statistiques

    } // fin de board

return board //rendu publique pour pouvoir appeller les methodes de cet objet de l'exterieur 


})(); //IIFE







			
		
