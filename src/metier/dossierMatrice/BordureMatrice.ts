// class SommetLongueur
export class SommetLongueur{

    
    // Initialisation des variables
    public longueur : number;
    public sommet : number;


    // Initialisation de la class
    constructor(longueur : number = 0, sommet : number = 0){
        this.longueur = longueur;
        this.sommet = sommet;
    }
}


// class BordureMatrice
export class BordureMatrice extends SommetLongueur{


    // Initialisation des variables
    private listeSommet: Array<number> = [];
    
    public listeSommetLongueur : Array<SommetLongueur> = [];

    public get getListeSommet(): Array<number> {
        return this.listeSommet;
    }

    // Initialisation de la liste des sommets potentiels
    public initSommet(successeur:Array<number>) : void{
        this.listeSommet = successeur;
        this.listeSommetLongueur = [];
    }


    // Initialisation du tableau
    public initTableau(depart : number, nbreSommet : number) : void{
        for (let i : number = 0 ; i < nbreSommet ; i++){
            if (i != depart){
                this.listeSommetLongueur.push(new SommetLongueur(Infinity, i));
            }
            else{
                this.listeSommetLongueur.push(new SommetLongueur(0, i));
            }
        }
    }


    // Vérifier si la liste des sommets potentiels est vide
    public estVide() : boolean{
        if (this.listeSommet.length === 0 ){
            return true;
        }

        else{
            return false;
        }
    }


    // Rechercher le sommet avec le poids minimum dans le tableau
    public rechercheMin(listeVisite : Array<number>) : number{

        // Initialisation des variables
        let sommetPotentiel : number = -1;
        let sommetPoids : number = Infinity

        // Recherche du sommet Minimum
        for (let sommet : number = 0 ; sommet < this.listeSommetLongueur.length ; sommet++){

            // Si le sommet n'appartient pas à l'ensemble des sommets dans liste Visite
            if ((listeVisite.filter(x => [sommet].includes(x))).length === 0){

                // Vérifier si le poids du sommet est inférieur au poids du sommet sauvegarder
                if (sommetPoids > this.listeSommetLongueur[sommet].longueur){

                    // Sauvegarder le plus petitt sommet
                    sommetPotentiel = sommet;
                    sommetPoids = this.listeSommetLongueur[sommet].longueur;
                }
            }
        }

        // Retirer de la liste des sommets, le plus petit sommet
        this.listeSommet = this.listeSommet.filter(x => ![sommetPotentiel].includes(x));

        // Renvoyer le sommet
        return sommetPotentiel;
    }


    // Actualiser la liste des sommets
    public actualiserListe(listeVisite : Array<number>, successeur : Array<number>) : void{
        
        // Ajouter la liste des successeurs à la liste des sommets
        this.listeSommet = [...new Set([...this.listeSommet, ...successeur])];

        // Retirer les sommets qui ont déjà visité de la liste
        this.listeSommet = this.listeSommet.filter( x => !listeVisite.includes(x));
    }

    // Actualiser le tableau
    public actualiserTableau(s : number, longueur : number, index : number) : void{
        this.listeSommetLongueur[index].longueur = longueur
        this.listeSommetLongueur[index].sommet = s;
    }
}