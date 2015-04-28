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

    module.selectNextKiField = function () {
        //1. check if ki could win -> win
        var field = _private.getWinField(false);
        if (field !== null) {
            var position_code = _private.getCodeFromPosition(field);
            module.selectField(position_code, false);
            return position_code;
        }
        //2. check if player could win -> block
        field = _private.getWinField(true);
        if (field !== null) {
            var position_code2 = _private.getCodeFromPosition(field);
            module.selectField(position_code2, false);
            return position_code2;
        }
        //3. check mid -> take mid if free
        if (module.checkIfFieldIsAvailable("mm")) {
            module.selectField("mm", false);
            return "mm";
        }
        //4. check corner -> take corner if free
        if (module.checkIfFieldIsAvailable("lo")) {
            module.selectField("lo", false);
            return "lo";
        }
        if (module.checkIfFieldIsAvailable("ro")) {
            module.selectField("ro", false);
            return "ro";
        }
        if (module.checkIfFieldIsAvailable("lu")) {
            module.selectField("lu", false);
            return "lu";
        }
        if (module.checkIfFieldIsAvailable("ru")) {
            module.selectField("ru", false);
            return "ru";
        }
        //5. check edges -> take edge
        if (module.checkIfFieldIsAvailable("mo")) {
            module.selectField("mo", false);
            return "mo";
        }if (module.checkIfFieldIsAvailable("lm")) {
            module.selectField("lm", false);
            return "lm";
        }if (module.checkIfFieldIsAvailable("rm")) {
            module.selectField("rm", false);
            return "rm";
        }if (module.checkIfFieldIsAvailable("mu")) {
            module.selectField("mu", false);
            return "mu";
        }
    };

    return module;
}(TICTACTOEAreaModule || {}));
