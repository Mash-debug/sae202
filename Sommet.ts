export class Sommet {
    nom: string;
    sommetArc : Array<Sommet> = [];
    poidsArc : {[key : string] : number} = {}; // clé: sommet, valeur: poids de l'arc

    constructor(nom: string) {
        this.nom = nom;
    }
    // Liste d'adjacence

    ajouterArc(sommet : Sommet, poids : number){
        if(!this.existeArc(sommet)) {
            this.sommetArc.push(sommet);
            this.poidsArc[sommet.nom] = poids;
        }
    }

    retirerArc(sommetDest: Sommet) {
        if(this.existeArc(sommetDest)) {
            let indexSommet = this.sommetArc.indexOf(sommetDest);
            this.sommetArc.splice(indexSommet, 1);
            delete this.poidsArc[sommetDest.nom];
        }
    }

    existeArc(sommetDest: Sommet) {
        let existe = false;
        for(const sommetArc of this.sommetArc) {
            if(sommetArc.nom === sommetDest.nom) {
                existe = true;
            }
        }
        return existe;
    }
    
    getPoidsArc(sommetDest: Sommet) {
        if(this.existeArc(sommetDest)) {
            return this.poidsArc[sommetDest.nom];
        } else return 0;
    }

    

}

