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

    object.selectNextKiField = function() {
        var x, y, field_code;
        do {
            x = Math.floor(Math.random()*3);
            y = Math.floor(Math.random()*3);
            field_code = _private.getCodeFromPosition({x: x,y: y});
        } while (!object.checkIfFieldIsAvailable(field_code));
        object.selectField(field_code);
        return field_code;
    };

    return object;
}(TICTACTOEAreaObject || {}));
