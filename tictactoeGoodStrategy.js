var TICTACTOEAreaObject = (function (object) {

    var _private = object._private = object._private || {};
	var _seal = object._seal = object._seal || function () {
			delete object._private;
			delete object._seal;
			delete object._unseal;
		};
	var _unseal = object._unseal = object._unseal || function () {
			object._private = _private;
			object._seal = _seal;
			object._unseal = _unseal;
		};

    _private.getWinField = function(user) {
        if ((user && _private.moveCounter < 3) ||  (!user && _private.moveCounter <5)) {
            return null;
        }
        var field = _private.generateFieldArray();
        var currentIcon = user ? 'X' : 'O';
        var opponentIcon = user ? 'O' : 'X';
        var check2Row = function(row) {
            var fst = true;
            var fst_field = null;
            if (row < 0 || row > field.length) {
                console.log("checkRow: Index out of bounds");
                return;
            }
            for (var i = 0; i < field.length; i++) {
                if (field[i][row] !== currentIcon) {
                    if (field[i][row] == opponentIcon) {
                        return null;
                    }
                    if (fst) {
                        fst = false;
                        fst_field = {x: i, y: row};
                    } else {
                        return null;
                    }
                }
            }
            return fst_field;
        };

        var check2Column = function(column) {
            var fst = true;
            var fst_field = null;
            if (column < 0 || column > field[0].length) {
                console.log("checkRow: Index out of bounds");
                return;
            }
            for (var i = 0; i < field[0].length; i++) {
                if (field[column][i] !== currentIcon) {
                    if (field[column][i] == opponentIcon) {
                        return null;
                    }
                    if (fst) {
                        fst = false;
                        fst_field = {x: column, y: i};
                    } else {
                        return null;
                    }
                }
            }
            return fst_field;
        };
        var check2Diagonals = function() {
            var fst = true;
            var fst_field = null;
            for (var i = 0; i < field.length; i++) {
                if (field[i][i] !== currentIcon) {
                    if (field[i][i] === opponentIcon) {
                        fst_field = null;
                        break;
                    }
                    if (fst) {
                        fst = false;
                        fst_field = {x: i, y:i};
                    } else {
                        fst_field = null;
                        break;
                    }
                }
            }
            if (fst_field) {
                return fst_field;
            }
            fst = true;
            for (i = field.length -1; i >= 0; i--) {
                if (field[i][field.length - 1 - i] !== currentIcon) {
                    if (field[i][field.length - 1 - i] === opponentIcon) {
                        return null;
                    }
                    if (fst) {
                        fst = false;
                        fst_field = {x: i, y: field.length - 1- i};
                    } else {
                        return null;
                    }
                }
            }
            return fst_field;
        };

        for (i = 0; i < field.length; i++) {
            var rowField = check2Row(i);
            var columnField = check2Column(i);
            if (rowField) {
                return rowField;
            }
            if (columnField) {
                return columnField;
            }
        }
        var diagonalsField = check2Diagonals();
        if (diagonalsField) {
            return diagonalsField;
        }
        return null;

    };

    object.selectNextKiField = function () {
        //1. check if ki could win -> win
        var field = _private.getWinField(false);
        if (field !== null) {
            var position_code = _private.getCodeFromPosition(field);
            object.selectField(position_code, false);
            return position_code;
        }
        //2. check if player could win -> block
        field = _private.getWinField(true);
        if (field !== null) {
            var position_code2 = _private.getCodeFromPosition(field);
            object.selectField(position_code2, false);
            return position_code2;
        }
        //3. check mid -> take mid if free
        if (object.checkIfFieldIsAvailable("mm")) {
            object.selectField("mm", false);
            return "mm";
        }
        //4. check corner -> take corner if free
        if (object.checkIfFieldIsAvailable("lo")) {
            object.selectField("lo", false);
            return "lo";
        }
        if (object.checkIfFieldIsAvailable("ro")) {
            object.selectField("ro", false);
            return "ro";
        }
        if (object.checkIfFieldIsAvailable("lu")) {
            object.selectField("lu", false);
            return "lu";
        }
        if (object.checkIfFieldIsAvailable("ru")) {
            object.selectField("ru", false);
            return "ru";
        }
        //5. check edges -> take edge
        if (object.checkIfFieldIsAvailable("mo")) {
            object.selectField("mo", false);
            return "mo";
        }if (object.checkIfFieldIsAvailable("lm")) {
            object.selectField("lm", false);
            return "lm";
        }if (object.checkIfFieldIsAvailable("rm")) {
            object.selectField("rm", false);
            return "rm";
        }if (object.checkIfFieldIsAvailable("mu")) {
            object.selectField("mu", false);
            return "mu";
        }
    };

    return object;
}(TICTACTOEAreaObject || {}));
