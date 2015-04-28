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

    module.selectNextKiField = function() {
        var x, y, field_code;
        do {
            x = Math.floor(Math.random()*3);
            y = Math.floor(Math.random()*3);
            field_code = _private.getCodeFromPosition({x: x,y: y});
        } while (!module.checkIfFieldIsAvailable(field_code));
        module.selectField(field_code);
        return field_code;
    };

    return module;
}(TICTACTOEAreaModule || {}));
