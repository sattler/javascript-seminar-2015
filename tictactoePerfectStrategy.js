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

    return module;
}(TICTACTOEAreaModule || {}));
