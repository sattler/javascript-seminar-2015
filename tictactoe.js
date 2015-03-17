
var TICTACTOEAreaObject = (function () {
    var object = {};
    area = {lo: null, mo: null, ro: null, lm: null, mm: null, rm: null, lu: null, mu: null, ru: null};

    object.selectField = function (position, user) {
        if (area[position] === null) {
            area[position] = user ? 'X' : 'O';
        }
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

function tictactoeclick(elem) {
    var image = document.getElementById(elem.id + "img");
    image.src = "img/tictactoeX.png";
    elem.onclick = null;
    TICTACTOEAreaObject.selectField(elem.id, true);
    //compute pc strategy
    var kiField = TICTACTOEAreaObject.selectNextKiField();
    document.getElementById(kiField + "img").src = "img/tictactoeO.png";
}
