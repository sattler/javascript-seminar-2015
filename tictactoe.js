
var TICTACTOEAreaObject = (function () {
    var object = {};
    area = {lo: null, mo: null, ro: null, lm: null, mm: null, rm: null, lu: null, mu: null, ru: null};

    object.gameOver = false;
    object.winner = "nobody";
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

        for (var prop in area) {
            if (area.hasOwnProperty(prop)) {
                var indexX = -1;
                switch (prop.charAt(0)) {
                    case 'l':
                        indexX = 0;
                        break;
                    case 'm':
                        indexX = 1;
                        break;
                    case 'r':
                        indexX = 2;
                        break;
                }
                var indexY = -1;
                switch (prop.charAt(1)) {
                    case 'o':
                        indexY = 0;
                        break;
                    case 'm':
                        indexY = 1;
                        break;
                    case 'u':
                        indexY = 2;
                        break;
                }
                if (indexX < 0 || indexY < 0) {
                    alert("checkThreeRow: index error");
                }

                if (position === prop){//transform position -> coords
                    posx = indexX;
                    posy = indexY;
                    field[indexX][indexY] = user ? 'X' : 'O';
                    area[prop] = user ? 'X' : 'O';
                } else {
                    field[indexX][indexY] = area[prop];
                }

            }
        }

        //now we actually do what this function(method?) is supposed to do
        //check column
       /* if(userIcon==1){
            alert("position: "+posx+" "+posy);
            alert(field);
            alert("3rd row: "+field[2][0] +" "+ field[2][1] +" "+ field[2][2]+" posx: "+posx)
        }*/
        var currentIcon = user ? 'X' : 'O';

        var checkRow = function(row) {
            if (row < 0 || row > field.length) {
                console.log("checkRow: Index out of bounds");
                return;
            }
            for (var i = 0; i < field.length; i++) {
                if (field[i][row] !== currentIcon) {
                    return false;
                }
            }
            return true;
        };
        var checkColumn = function(column) {
            if (column < 0 || column > field[0].length) {
                console.log("checkRow: Index out of bounds");
                return;
            }
            for (var i = 0; i < field[0].length; i++) {
                if (field[column][i] !== currentIcon) {
                    return false;
                }
            }
            return true;
        };
        var checkDiagonals = function() {
            var ret = true;
            for (var i = 0; i < field.length; i++) {
                if (field[i][i] !== currentIcon) {
                    ret = false;
                    break;
                }
            }
            if (ret) {
                return true;
            }
            ret = true;
            for (i = field.length -1; i >= 0; i--) {
                if (field[i][field.length - 1 - i] !== currentIcon) {
                    ret = false;
                    break;
                }
            }
            return ret;
        };

        for (i = 0; i < field.length; i++) {
            if (checkRow(i) || checkColumn(i)) {
                object.gameOver = true;
                object.winner = user ? 'player' : 'computer';
                alert(object.winner + " wins");
                return true;
            }
        }
        if (checkDiagonals()) {
            object.gameOver = true;
            object.winner = user ? 'player' : 'computer';
            alert(object.winner + " wins");
            return true;
        }



        // for(var y = 0; y < 3; y++) {
        //     if(field[posx][y] != userIcon)
        //         break;
        //     if(y == 2){
        //         object.gameOver = true;
        //         object.winner = user ? 'player' : 'computer';
        //         alert(object.winner+" wins");
        //     }
        // }
        //
        // //check row
        // for(var x = 0; x < 3; x++){
        //     if(field[x][posy] != userIcon)
        //         break;
        //     if(x == 2){
        //         object.gameOver = true;
        //         object.winner = user ? 'player' : 'computer';
        //         alert(object.winner+" wins");
        //     }
        // }
        //
        // //check diagonals
        //
        // if(posx == posy){
        //     for(var d = 0; d < 3; d++){
        //         if(field[d][d] != userIcon){
        //             break;
        //         }
        //         if(d == 2){
        //             object.gameOver = true;
        //             object.winner = user ? 'player' : 'computer';
        //             alert(object.winner+" wins");
        //         }
        //     }
        // }
        //
        // for(var d = 0; d < 3; d++){
        //     if(field[d][2-d] != userIcon){
        //         break;
        //     }
        //     if(d == 2){
        //         object.gameOver = true;
        //         object.winner = user ? 'player' : 'computer';
        //         alert(object.winner+" wins");
        //     }
        // }

    };

    object.checkIfFieldIsAvailable = function (position) {
        return area[position] === null;
    };
    object.selectField = function (position, user) {
        if (area[position] === null) {
            area[position] = user ? 'X' : 'O';

            moveCounter++;
        }
        return checkThreeRow(position, user); //check if this move was the winning (or last) move
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

    if (TICTACTOEAreaObject.gameOver || !TICTACTOEAreaObject.checkIfFieldIsAvailable(elem.id)) {
        return;
    }
    var image = document.getElementById(elem.id + "img");
    image.src = "img/tictactoeX.png";
    elem.onclick = null;
    if (TICTACTOEAreaObject.selectField(elem.id, true)) {
        return;
    }

    //compute pc strategy
    var kiField = TICTACTOEAreaObject.selectNextKiField();
    document.getElementById(kiField + "img").src = "img/tictactoeO.png";
    document.getElementById(kiField).onclick = null;

}
