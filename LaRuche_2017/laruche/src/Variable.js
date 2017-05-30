var Variable = (function () {
    function Variable(name, type) {
        this.name = name;
        this.type = type;
    }
    Variable.prototype.getName = function () {
        return this.name;
    };
    Variable.prototype.toString = function () {
        return "Variable " + this.name + " of type " + this.type;
    };
    return Variable;
}());
var myV = new Variable("test1", typeVariable.Real);
console.log(myV.toString());
