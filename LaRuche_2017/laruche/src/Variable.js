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
    Variable.prototype.getValue = function () {
        return this.value;
    };
    Variable.prototype.toString = function () {
        return "Variable " + this.name + " of type " + this.type;
    };
    return Variable;
}());
