import { GrapheListeAdjacence } from "./GrapheListeAdjacence";
import { Verif } from "./verificationSaisieListe";
import { Sommet } from './Sommet';
import * as readlineSync from "readline-sync";


export class InteractionListe {
    verif : Verif = new Verif();
    graphe: GrapheListeAdjacence = new GrapheListeAdjacence(7);

    main(){
        console.log("\n\n---------------------------");
        console.log("--- Interaction Liste ----");
        console.log("---------------------------\n");

        console.log("Ce programme vous permet de faire :");
        console.log("1  - Ajouter un sommet");
        console.log("2  - Supprimer le dernier sommet");
        console.log("3  - Récupérer le nombre de sommets");
        console.log("4  - Récupérer le nombre d'arc");
        console.log("5  - Ajouter un arc");
        console.log("6  - Supprimer un arc");
        console.log("7  - Tester si un arc existe");
        console.log("8  - Récupérer le poids d'un arc");
        console.log("9  - Récupérer les successeurs d'un sommet");
        console.log("10 - Récupérer les prédécesseurs d'un sommet");
        console.log("11 - Récupérer les voisins d'un sommet");
        console.log("12 - Sauvegarder le graphique");
        console.log("13 - Appliquer l'algorithme de Dijkstra");
        console.log("14 - Revenir au menu précédent\n");

        let choix = this.verif.choixBordure(0, 14, "Que souhaitez-vous faire ? : ");
        this.choixUser(choix);
    }


    choixUser(choix : number){
        let sommetSource: number | Sommet;
        let sommetDest: number | Sommet;
        let poids: number;

        switch (choix){
            case 1 :
                this.graphe.ajouterSommet();
                console.log("Un nouveau sommet a bien été ajouté ! ")
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            case 2 :
                this.graphe.retirerSommet();
                console.log("Le dernier sommet a bien été retiré !");
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            case 3 :
                console.log(`Le graphe contient ${this.graphe.nbreSommets} sommets.`);
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            case 4 :
                console.log(`Le graphe possède ${this.graphe.getNbreArcs()} arcs.`);
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            case 5 :    
                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetDest = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet destination (nombre) : ");
                poids = readlineSync.question() // continuer ici
                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;
                sommetDest = this.graphe.sommets.find((s) => s.nom === sommetDest.toString())!;

                sommetSource.ajouterArc(sommetDest, 0)
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 6 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 7 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 8 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 9 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 10 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 11 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 12:

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 13 :

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 14 :
                console.log("A bientot !");
                break;
            
            default:
                console.log("A bientot !");
                break;
        }
    }
}