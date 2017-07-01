var Variable = (function () {
    function Variable(name, type) {
        this.name = name;
        this.type = type;
    }
    Variable.prototype.getName = function () {
        return this.name;
    };
    Variable.prototype.getType = function () {
        return this.type;
    };
    Variable.prototype.setType = function (type) {
        this.type = type;
    };
    Variable.prototype.getValue = function () {
        return this.value;
    };
    Variable.prototype.setValue = function (val) {
        this.value = val;
    };
    Variable.prototype.setName = function (name) {
        this.name = name;
    };
    Variable.prototype.toString = function () {
        return "Variable " + this.name + " of type " + this.type;
    };
    return Variable;
}());
