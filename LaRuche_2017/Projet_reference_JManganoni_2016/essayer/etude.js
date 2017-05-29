/**
 * Created by yan on 16/2/22.
 */

/**
 * Comment ecrire le javascript lisible
 */

wg.lib.getPresentAnnee = function () {
    return 2016
};

wg.class.Etudiant = function (nom, anneeDeNaissance, sexe) {
    var presentAnnee = wg.lib.getPresentAnnee();
    this.nom = nom; // un propriete
    var age = 0; // un variable privee, mais resist dans la closure, meme chose pour les argument
    var self = this; // option: eviter le conflict de "this"
    // ecrire tout les methode possible ici
    this.updateAge = function () {
        age = presentAnnee - anneeDeNaissance
    };
    this.getAge = function () {
        return age
    };
    this.isAdult = function () {
        return age >= 18
    };
    this.changeAge = function (newAge) {
        age = newAge;
        anneeDeNaissance = presentAnnee - age
    };
    this.getAnneeDeNaissance = function () {
        return anneeDeNaissance
    }
};

// utiliser un "namespace" et un endroit privee
/**
 * xxx.prototype.yyy est pour Ajouter les methode et propriete dehor le class quand nous avons besoin
 * et actuellement pour les autres programmeurs
 * comme Array.prototype.xxx = func...
 */

(function (pt) {
    pt.getNom = function () {
        return this.nom
    }
})(wg.class.Etudiant.prototype);

