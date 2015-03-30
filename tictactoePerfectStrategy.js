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

    return object;
}(TICTACTOEAreaObject || {}));
