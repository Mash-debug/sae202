import { DijkstraMatrice } from "./DijkstraMatrice";
import { BellmanMatrice } from './BellmanMatrice';


// class ResultatMatrice
export class ResultatMatrice{

    
    // Initialisation des variables
    public dijkstra : DijkstraMatrice;
    public bellman : BellmanMatrice;


    // Initialisation de la class Bellman
    public initBellman(lien : string, depart : number, destination : number){
        this.bellman = new BellmanMatrice(lien, depart, destination);
    }


    // Affichage du résultat et lancement de l'algorithme de Bellman
    public resultatBellman() : void{
        try{
            // Si l'algorithme renvoie false, alors on affiche une erreur
            if(!this.bellman.existeLienRecursif([],[],0)){
                console.log("Erreur : Bellman ne peut pas etre utilisé dans ce graphe parce qu'il y a un circuit !");
            }

            // Sinon on lit le résultat
            else{
                // Si la destination est égal au départ, alors on affiche "Le départ et la destination sont le meme point !"
                if (this.bellman.depart === this.bellman.destination){
                    console.log("Le départ et la destination sont le meme point !");
                }

                // Sinon, on recherche si il existe un chemin entre les deux points
                else{

                    // Si oui, alors on affiche "Un chemin existe !"
                    if(this.rechercheChemin(this.bellman.successeurSommet(this.bellman.depart), this.bellman.destination)){
                        console.log("Un chemin existe !");
                    }

                    // Sinon, on affiche "Il n'existe pas de chemin entre le depart et la destination !"
                    else{
                        console.log("Il n'existe pas de chemin entre le depart et la destination !");
                    }
                }
            }
        }

        catch (Error){
            console.log(Error);
        }
    }


    // Algorithme permettant de rechercher si il existe un chemin
    public rechercheChemin(listeSuccesseur : Array<number>, destination : number) : boolean{

        // Si il n'y plus de successeur dans liste, cela signifie qu'on arrive à la fin du graphe et donc qu'on n'a pas trouvé la destination avec ce chemin
        if (listeSuccesseur.length === 0){
            return false;
        }

        // Si la destination appartient à la liste des successeurs alors on revoie true
        else if (listeSuccesseur.includes(destination)){
            return true;
        }

        // Sinon on réeffectue ces opérations pour de nouveau successeur
        else{
            for(let successeur : number = 0 ; successeur < listeSuccesseur.length ; successeur++){

                // Renvoyer la fonction pour chaque sucesseur de sommet dans la listeSucesseur
                // Si la fonction renvoie lors d'une des itérations, cela signifique que la destination a été trouvée. On peut donc mettre fin à la boucle en revoyant true
                if (this.rechercheChemin(this.bellman.successeurSommet(listeSuccesseur[successeur]), destination)){
                    return true;
                }
            }

            // Sinon, si rien n'a été trouvé, alors on renvoie false
            return false;
        }
    }


    // Initialisation de la class Dijkstra
    public initDijkstra(lien :string, depart : number = 0, isochrone : number = 0){
        this.dijkstra = new DijkstraMatrice(lien, depart, isochrone);
    }


    // Affichage du résultat et lancement de l'algorithme de Dijkstra
    public resultatDijkstra() : void{

        // Lancement de l'algorithme
        this.dijkstra.rechercheDijkstraRecursif([], 0);

        // Mise en forme du résultat
        let chaineResultat : string = ""
        for (let element : number = 0 ; element < this.dijkstra.bordureMatrice.listeSommetLongueur.length ; element ++){
            if (element === this.dijkstra.depart){
                chaineResultat += "s"+element+":|"+this.dijkstra.bordureMatrice.listeSommetLongueur[element].longueur+",none| ";
            }

            else{
                chaineResultat += "s"+element+":|"+this.dijkstra.bordureMatrice.listeSommetLongueur[element].longueur+","+this.dijkstra.bordureMatrice.listeSommetLongueur[element].sommet+"| ";
            }
        }
        console.log(chaineResultat);
    }
}