
var TICTACTOEAreaObject = (function () {
    var object = {};
    area = {lo: null, mo: null, ro: null, lm: null, mm: null, rm: null, lu: null, mu: null, ru: null};

    object.gameOver = false;
    object.winner = "nobody"
    moveCounter = 0;

    var checkThreeRow = function(position, user) { //check if game is over
        if(moveCounter < 5){return;} //can't win before turn #5
        if(moveCounter == 9) {
            object.gameOver = true;
        }

        var field = new Array(3);//define array to be filled with numbers (0 = empty, 1 = player/X, 2 = AI/O)
        for (var i = 0; i < 3; i++) {
            field[i] = new Array(3);
        }
        

        var posx = 0; //position turned into coordinates
        var posy = 0;

        var iterator = 0;
        for (var prop in area) { //fill array with numbers (0 = empty, 1 = player/X, 2 = AI/O); really hope this for loop iterates over area in the correct order.. :s
            if (area.hasOwnProperty(prop)) { //is this part really necessary?
                
                switch(area[prop]) {
                    case null:
                        field[iterator % 3][Math.floor(iterator / 3)] = 0; //"iterator % 3" should be "x" and "Math.floor(iterator / 3)" should be "y" but for some reason it's inverted..
                        break;
                    case 'X':
                        field[iterator % 3][Math.floor(iterator / 3)] = 1;
                        break;
                    case 'O':
                        field[iterator % 3][Math.floor(iterator / 3)] = 2;
                        break;
                }
                

                if (position === prop){//transform position -> coords
                    posx = iterator % 3;
                    posy = Math.floor(iterator / 3);
                }

                iterator++;
            }
        }

        var userIcon = user ? 1 : 2; //X for player, O for AI

        //now we actually do what this function(method?) is supposed to do
        //check column
       /* if(userIcon==1){
            alert("position: "+posx+" "+posy);
            alert(field);
            alert("3rd row: "+field[2][0] +" "+ field[2][1] +" "+ field[2][2]+" posx: "+posx)
        }*/
        for(var y = 0; y < 3; y++) {
            if(field[posx][y] != userIcon)
                break;
            if(y == 2){
                object.gameOver = true;
                object.winner = user ? 'player' : 'computer';
                alert(object.winner+" wins");
            }
        }

        //check row
        for(var x = 0; x < 3; x++){
            if(field[x][posy] != userIcon)
                break;
            if(x == 2){
                object.gameOver = true;
                object.winner = user ? 'player' : 'computer';
                alert(object.winner+" wins");
            }
        }

        //TODO: Check diagonals
    };

    object.fieldWasAvailable = false;
    object.selectField = function (position, user) {
        object.fieldWasAvailable = false;
        if (area[position] === null) {
            area[position] = user ? 'X' : 'O';
            
            object.fieldWasAvailable = true;
            moveCounter++;
        }
        checkThreeRow(position, user); //check if this move was the winning (or last) move
    };

    object.selectNextKiField = function () {
        for (var prop in area) {
            if (area.hasOwnProperty(prop)) {
                if (area[prop] === null) {
                    object.selectField(prop, false);
                    return prop;
                }
            }
        }
    };

    return object;
}());

//elem = button (defined in index.html)
function tictactoeclick(elem) {
    //alert(1);
    TICTACTOEAreaObject.selectField(elem.id, true);
    if(TICTACTOEAreaObject.fieldWasAvailable) {//prevents overwriting of O fields with an X (previously image would be set to X regardless of whether area[position] belonged to user or AI; this solution is a little clumsy and so is this comment. both should probably be reviewed and altered)
        var image = document.getElementById(elem.id + "img");
        image.src = "img/tictactoeX.png";
        elem.onclick = null;
        
        //compute pc strategy
        var kiField = TICTACTOEAreaObject.selectNextKiField();
        document.getElementById(kiField + "img").src = "img/tictactoeO.png";

    }
    
}