import {MatriceAdjacence} from './MatriceAdjacence';


// class BellmanMatrice
export class BellmanMatrice extends MatriceAdjacence{


    // Initialisation des variables
    private dicoPotentiel : {[key : number] : number} = {};
    private dicoPere : {[key : number] : number | string} = {};
    public depart : number;
    public destination : number;


    // Initialisation de la class
    constructor(lien:string, depart : number = 0, destination : number = 0){
        super(lien)
        this.depart = depart;
        this.destination = destination;
    }


    // Examiner le sommet pour trouver le predecesseur avec le plus petit poids (arc et chemin)
    public examinerPoint(s : number) : Array<number>{

        // Initialisation des variables
        let listePredecesseur : Array<number> = this.predecesseurSommet(s);
        let potentielSommet : number;
        let pereSommet : number;

        // Cas 0, Initialisation de Bellman
        if (s === this.depart){
            return [0, -1];
        }

        // Cas général
        else{

            // Valeur des variables par défauts
            potentielSommet = Infinity;
            pereSommet = s;

            // Recherche du predecesseur dont le chemin et poids de l'arc est le plus petit
            for (let predecesseur : number = 0 ; predecesseur < listePredecesseur.length ; predecesseur++){

                // Si le poids de l'arc et le poids du chemin est inférieur à la valeur sauvegarder, alors on sauvegarde les données
                if ((this.dicoPotentiel[listePredecesseur[predecesseur]] + this.poidsArc(listePredecesseur[predecesseur], s)) < potentielSommet){

                    // Sauvegarde du plus petit sommet
                    potentielSommet = this.dicoPotentiel[listePredecesseur[predecesseur]] + this.poidsArc(listePredecesseur[predecesseur], s);
                    pereSommet = Number(listePredecesseur[predecesseur]);
                }
            }

            // Renvoyer le poids du sommet et son père
            return [potentielSommet, pereSommet];
        }
    }


    // Vérifier si dans la liste des successeurs du sommet, certais ne peuvent pas devenir des sommets potentiels
    public verifRacine(listeVisite : Array<number>, s : number) : Array<number>{

        // Intialisation des variables
        let listeSuccesseur : Array<number> = this.successeurSommet(s);
        let nouvRacine : Array<number> = [];

        // Si la liste est vide alors, on retourne l'ensemble vide
        if (listeSuccesseur.length === 0){
            return [];
        }

        else{

            // Pour chaque successeur du sommet
            for (let successeur : number = 0 ; successeur < listeSuccesseur.length ; successeur++){

                // Récupérer la liste des précédesseurs du sommet étant présent dans la liste des sommets qui ont déjà été visités
                let intersection = listeVisite.filter(x => this.predecesseurSommet(listeSuccesseur[successeur]).includes(x));

                // Si l'intersection des deux listes et de la meme taille que la liste des prédecesseurs, cela signifie que toutes les valeurs d'intersection sont préséntes dans la liste des prédécesseur
                if (intersection.length === this.predecesseurSommet(listeSuccesseur[successeur]).length){
                    nouvRacine.push(listeSuccesseur[successeur]);
                }
            }

            // Retourner la liste
            return nouvRacine;
        }
    }


    // Intialisation de la liste des racines
    public initRacine() : Array<number>{

        // Initialisation des variables
        let listeRacine : Array<number> = [];

        // Ajouter toutes les racines qui n'ont aucun prédécesseur
        for(let racine : number = 0; racine < this.nbreSommet ; racine++){
            if (this.predecesseurSommet(racine).length === 0){
                listeRacine.push(racine);
            }
        }

        // Retourner la liste
        return listeRacine;
    }


    // Programme principal Bellman
    public existeLienRecursif(listeRacine : Array<number>, listeVisite : Array<number>, index : number) : boolean{

        // Cas 0, initialisation de Bellman
        if (index === 0){

            // Initialisation des racines
            listeRacine = this.initRacine();

            // Renvoyer la fonction
            return this.existeLienRecursif(listeRacine, listeVisite, index+1);
        }

        // Condition d'arret
        else if (listeRacine.length === 0){

            // Si tous les sommets ont visité alors, renvoyer true
            if (listeVisite.length === this.nbreSommet){
                return true;
            }

            // Sinon false
            else{
                return false;
            }
        }

        // Algorithme Bellman
        else{

            // Récupère la première Racine de la liste
            let racine : number = listeRacine[0];

            // Retirer la racine de la liste
            listeRacine.shift();

            // Ajouter la racine à la liste des visites
            listeVisite.push(racine);
            
            // Examiner le sommet
            let temp : Array<number> = this.examinerPoint(racine);

            // Ajouter les données au dictionnaire
            this.dicoPotentiel[racine] = temp[0];

            // Si temp[1] === -1, alors renvoyer None, car -1 <=> None
            if (temp[1] === -1){
                this.dicoPere[racine] = "None";
            }
            else{
                this.dicoPere[racine] = temp[1];
            }
            
            // Recherche de nouveaux sommets potentiels
            temp = this.verifRacine(listeVisite, racine);

            // Ajout de ses nouveau sommets à la liste
            listeRacine = [...listeRacine, ...temp];
            
            // Renvoyer la fonction
            return this.existeLienRecursif(listeRacine, listeVisite, index+1);
        }
    }
}