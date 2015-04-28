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

    module.selectNextKiField = function () {
        for (var prop in _private.area) {
            if (_private.area.hasOwnProperty(prop)) {
                if (_private.area[prop] === null) {
                    module.selectField(prop, false);
                    return prop;
                }
            }
        }
    };

    return module;
}(TICTACTOEAreaModule || {}));
