
var TICTACTOEAreaModule = (function (module) {

    var _private = module._private = module._private || {};
	var _seal = module._seal = module._seal || function () {
			delete module._private;
			delete module._seal;
			delete module._unseal;
		};
	var _unseal = module._unseal = module._unseal || function () {
			module._private = _private;
			module._seal = _seal;
			module._unseal = _unseal;
		};

    _private.area = {lo: null, mo: null, ro: null, lm: null, mm: null, rm: null, lu: null, mu: null, ru: null};
    _private.moveCounter = 0;

    _private.getPositionFromCode = function(code) {
        var indexX = -1;
        switch (code.charAt(0)) {
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
        switch (code.charAt(1)) {
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
        return {x: indexX, y:indexY};
    };

    _private.getCodeFromPosition = function(position) {
        var ret = "";
        switch (position.x) {
            case 0:
                ret = ret + "l";
                break;
            case 1:
                ret = ret + "m";
                break;
            case 2:
                ret = ret + "r";
                break;
            default:
                return null;
        }
        switch (position.y) {
            case 0:
                ret = ret + "o";
                break;
            case 1:
                ret = ret + "m";
                break;
            case 2:
                ret = ret + "u";
                break;
            default:
                return null;
        }
        return ret;
    };

    _private.generateFieldArray = function() {
        var field = new Array(3);//define array to be filled with numbers (0 = empty, 1 = player/X, 2 = AI/O)
        for (var i = 0; i < 3; i++) {
            field[i] = new Array(3);
        }

        for (var prop in _private.area) {
            if (_private.area.hasOwnProperty(prop)) {
                var pos = _private.getPositionFromCode(prop);
                field[pos.x][pos.y] = _private.area[prop];

            }
        }
        return field;
    };

    _private.checkThreeRow = function(user) { //check if game is over
        if(_private.moveCounter < 5) { //can't win before turn #5
            return;
        }

        var field = _private.generateFieldArray();

        //now we actually do what this function(method?) is supposed to do
        //check column
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
            for (i = field.length -1; i >= 0; i--) {
                if (field[i][field.length - 1 - i] !== currentIcon) {
                    return false;
                }
            }
            return true;
        };
        var i = 0;
        for (i = 0; i < field.length; i++) {
            if (checkRow(i) || checkColumn(i)) {
                module.gameOver = true;
                module.winner = user ? 'player' : 'computer';
                alert(module.winner + " wins");
                return true;
            }
        }

        if (checkDiagonals()) {
            module.gameOver = true;
            module.winner = user ? 'player' : 'computer';
            alert(module.winner + " wins");
            return true;
        }

        if(_private.moveCounter == 9) {
            alert("Nobody wins!");
            module.gameOver = true;
        }

    };

    module.gameOver = false;
    module.winner = "nobody";

    module.checkIfFieldIsAvailable = function (position) {
        return _private.area[position] === null;
    };
    module.selectField = function (position, user) {
        if (_private.area[position] === null) {
            _private.area[position] = user ? 'X' : 'O';

            _private.moveCounter++;
        }
        return _private.checkThreeRow(user); //check if this move was the winning (or last) move
    };

    var strategy = GetURLParameter("strategy");
    if (!strategy) {
        $LAB.script('tictactoeNoStrategy.js')
            .script('tictactoeStrategyRandom.js')
            .script('tictactoeGoodStrategy.js')
            .script('tictactoePerfectStrategy.js').wait(function () {
            TICTACTOEAreaModule._seal();
        });
    } else if (strategy === "none") {
        $LAB.script('tictactoeNoStrategy.js').wait(function () {
            TICTACTOEAreaModule._seal();
        });
    } else if (strategy === "random") {
        $LAB.script('tictactoeStrategyRandom.js').wait(function () {
            TICTACTOEAreaModule._seal();
        });
    } else if (strategy === "good") {
        $LAB.script('tictactoeGoodStrategy.js').wait(function () {
            TICTACTOEAreaModule._seal();
        });
    }

    return module;
}(TICTACTOEAreaModule || {}));

function GetURLParameter(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

//elem = button (defined in index.html)
function tictactoeclick(elem) {

    if (TICTACTOEAreaModule.gameOver || !TICTACTOEAreaModule.checkIfFieldIsAvailable(elem.id)) {
        return;
    }
    var image = document.getElementById(elem.id + "img");
    image.src = "img/tictactoeX.png";
    if (TICTACTOEAreaModule.selectField(elem.id, true)) {
        return;
    }

    //compute pc strategy
    var kiField = TICTACTOEAreaModule.selectNextKiField();
    document.getElementById(kiField + "img").src = "img/tictactoeO.png";

}
