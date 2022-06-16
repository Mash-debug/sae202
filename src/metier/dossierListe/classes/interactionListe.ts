import { GrapheListeAdjacence } from "./GrapheListeAdjacence";
import { Verif } from "./verificationSaisieListe";
import { Sommet } from './Sommet';
import * as readlineSync from "readline-sync";


export class InteractionListe {
    verif : Verif = new Verif();
    graphe: GrapheListeAdjacence = new GrapheListeAdjacence(7);

    async main(){
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
        await this.choixUser(choix);
    }


    async choixUser(choix : number){
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
                poids = Number(readlineSync.question("Veuillez entrer le poids de l'arc : ")); 

                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;
                sommetDest = this.graphe.sommets.find((s) => s.nom === sommetDest.toString())!;

                sommetSource.ajouterArc(sommetDest, poids);
                console.log("L'arc a bien été ajouté !");

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 6 :
                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetDest = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet destination (nombre) : ");

                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;
                sommetDest = this.graphe.sommets.find((s) => s.nom === sommetDest.toString())!;

                sommetSource.retirerArc(sommetDest);
                console.log("L'arc a bien été supprimé !");

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 7 :

                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetDest = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet destination (nombre) : ");

                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;
                sommetDest = this.graphe.sommets.find((s) => s.nom === sommetDest.toString())!;

                sommetSource.existeArc(sommetDest) ? console.log("Un arc existe entre ces deux sommets !") : console.log("Aucun arc n'existe entre ces deux sommets !");


                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 8 :
                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetDest = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet destination (nombre) : ");

                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;
                sommetDest = this.graphe.sommets.find((s) => s.nom === sommetDest.toString())!;

                console.log(`Le poids de cet arc est de ${sommetSource.getPoidsArc(sommetDest)}`);

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 9 :
                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;

                console.log("Voici la liste des successeurs de ce sommet : ");
                for(const successeur of this.graphe.getSuccesseurs(sommetSource)) {
                    console.log(successeur);
                }

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 10 :

                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;

                console.log("Voici la liste des prédecesseurs de ce sommet : ");
                for(const predecesseur of this.graphe.getPredecesseurs(sommetSource)) {
                    console.log(predecesseur);
                }

                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 11 :

                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;

                console.log("Voici la liste des voisins de ce sommet : ");
                for(const voisin of this.graphe.getVoisins(sommetSource)) {
                    console.log(voisin);
                }
                
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 12:
                await this.graphe.sauvegarder();
                console.log("Graphe sauvegardé ! => grapheSave.txt");
                this.verif.messageContinuer("Appuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 13 :
                sommetSource = this.verif.sommetExiste(this.graphe.nbreSommets, "Veuillez entrer le sommet source (nombre) : ");
                sommetSource = this.graphe.sommets.find((s) => s.nom === sommetSource.toString())!;

                await this.graphe.rechercheDjisktra(sommetSource);
                console.log("L'algorithme de Djisktra a bien été appliqué ! => grapheDjikstra.txt");
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