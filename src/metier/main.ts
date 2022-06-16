import {Verif} from './verificationmain';
import {InteractionMatrice} from './dossierMatrice/interactionMatrice'
import { InteractionListe } from "./dossierListe/classes/interactionListe";

// Class Main
class Main extends Verif{
    

    // Initialisation des class Menu (matrice et liste)
    private interactionMatrice : InteractionMatrice = new InteractionMatrice();
    private interactionListe : InteractionListe = new InteractionListe();

    // Lancement du programme, ouverture du premier menu
    public main(){
        console.log("\n\n---------------------------");
        console.log("---- SAé 2.02 : Graphe ----");
        console.log("---------------------------\n");

        console.log("Ce programme vous permet de faire :");
        console.log("0 - Utiliser les Matrices d'adjacence")
        console.log("1 - Utiliser les Listes d'adjacence");
        console.log("2 - Quitter le programme\n");

        // Vérification de saisie : vérifier si le nombre est bien compris entre 0 et 2
        let choix = this.choixBordure(0, 2, "Que souhaitez-vous faire ? : ");
        this.choixUser(choix);
    }


    //Execution du choix de l'utilisateur
    public choixUser(choix : number){
        switch (choix){
            case 0 :
                // Si 0, alors on ouvre le menu Matrice
                this.interactionMatrice.main()
                this.main()
                break;
            
            case 1 :
                // Si 1, alors on ouvre le menu Liste
                this.interactionListe.main()
                this.main()
                break;
            
            case 2 :
                // Si 2, alors on quitte le programme
                console.log("A bientot !");
                break;
        }
    }
}

// Lancement et initialisation de la class
let main : Main = new Main();
main.main();