import {MatriceAdjacence} from './MatriceAdjacence';
import {BordureMatrice} from './BordureMatrice';


// class DijkstraMatrice
export class DijkstraMatrice extends MatriceAdjacence{


    // Initialisation des variables
    public bordureMatrice : BordureMatrice = new BordureMatrice();
    public depart : number;
    public isochrone : number;


    // Initialisation de la class
    constructor(lien:string, depart : number = 0, isochrone : number = 0){
        super(lien)
        this.depart = depart;
        this.isochrone = isochrone;
    }


    // Examiner l'ensemble des successeurs d'un sommet et actualiser le tableau
    public examinerPoint(s : number) : void{

        // Cas s = -1, initialisation du tableau
        if (s === -1){
            this.bordureMatrice.initTableau(this.depart, this.nbreSommet);
        }

        // Pour les autres cas, éxécuter le programme normalement
        else{

            // Récupération de la liste des successeurs
            let listeSuccesseur : Array<number> = this.examinerSuccesseur(this.successeurSommet(s), s, 1);

            // Pour chaque successeur, si le poids de l'arc et le poids du chemin est inférieur à la valeur dans le tableau, alors on actualise le tableau
            for (let sommet : number = 0 ; sommet < listeSuccesseur.length ; sommet++){
                if ((this.poidsArc(s, listeSuccesseur[sommet]) + this.bordureMatrice.listeSommetLongueur[s].longueur) < this.bordureMatrice.listeSommetLongueur[listeSuccesseur[sommet]].longueur){
                    this.bordureMatrice.actualiserTableau(s, (this.poidsArc(s, listeSuccesseur[sommet]) + this.bordureMatrice.listeSommetLongueur[s].longueur), listeSuccesseur[sommet]);
                }
            }
        }
    }


    // Examiner l'ensemble des successeurs du sommet et conserver uniquement ceux qui sont inférieur ou égal à l'isochrone
    public examinerSuccesseur(listeSuccesseur : Array<number>, s : number, index : number) : Array<number>{

        // Initialisation des variables
        let sucesseur : Array<number> = [];

        // Vérification en prenant en compte le poids de l'arc et le poids du chemin
        if (index != 0){
            for (let sommet : number = 0 ; sommet < listeSuccesseur.length ; sommet++){
                if ((this.poidsArc(s, listeSuccesseur[sommet]) + this.bordureMatrice.listeSommetLongueur[s].longueur) <= this.isochrone){
                    sucesseur.push(listeSuccesseur[sommet]);
                }
            }
        }

        // Cas 0, vérification en prenant uniquement le compte le poids de l'arc
        else{
            for (let sommet : number = 0 ; sommet < listeSuccesseur.length ; sommet++){
                if (this.poidsArc(s, listeSuccesseur[sommet]) <= this.isochrone){
                    sucesseur.push(listeSuccesseur[sommet]);
                }
            }
        }

        // Retourner la liste des successeurs
        return sucesseur;
    }


    // Algorithme principal Dijkstra
    public rechercheDijkstraRecursif(listeVisite : Array<number>, index : number) : boolean{

        // Cas 0, Initialisation du programme
        if (index === 0){

            // Initialisation de la matrice
            this.bordureMatrice.initSommet(this.examinerSuccesseur(this.successeurSommet(this.depart), this.depart, index));

            // Intialisation de la première ligne du tableau
            this.examinerPoint(-1);

            // Retourner la fonction
            return this.rechercheDijkstraRecursif(listeVisite, index+1);
        }

        // Condidition d'arret de la boucle
        else if (this.bordureMatrice.estVide()){
            return true;
        }

        // Sinon, Continuer le programme
        else{

            // Recherche du Sommet minimum dans liste des sommets potentiels
            let sommet : number = this.bordureMatrice.rechercheMin(listeVisite);

            // Ajouter le sommet sélectionné à la liste des sommets visités
            listeVisite.push(sommet);

            // Examiner le sommet et actualisation de la ligne du tableau
            this.examinerPoint(sommet);
            
            // Actualiser la liste des sommets potentiels
            this.bordureMatrice.actualiserListe(listeVisite, this.examinerSuccesseur(this.successeurSommet(sommet), sommet, index));

            // Rtourner la fonction
            return this.rechercheDijkstraRecursif(listeVisite, index+1);
        }
    }
}