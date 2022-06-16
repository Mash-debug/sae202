import { ResultatMatrice } from './ResultatMatrice';
import { Verif } from "./verificationSaisieMatrice";
import * as readlineSync from "readline-sync";


// class Interaction Matrice
export class InteractionMatrice extends ResultatMatrice{


    // Intialisation des variables et des class
    private verif : Verif = new Verif();
    private lien : string = "grapheTest.txt";
    private depart : number = 0;
    private isochrone : number = 0;
    private destination : number = 0;

    
    // Initialisation des constructor des class fils
    constructor(){
        super();
        this.initDijkstra(this.lien);
        this.initBellman(this.lien, 0, 0);
    }


    // Lancement du menu Matrice
    public main(){
        console.log("\n\n---------------------------");
        console.log("--- Interaction Matrice ---");
        console.log("---------------------------\n");

        console.log("Ce programme vous permet de faire :");
        console.log("0  - Modifier le lien du fichier")
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
        console.log("14 - Appliquer l'algorithme de Bellman");
        console.log("15 - Revenir au menu précédent\n");


        // Vérification de saisie : vérifier si le nombre est bien compris entre 0 et 15
        let choix = this.verif.choixBordure(0, 15, "Que souhaitez-vous faire ? : ");
        this.choixUser(choix);
    }


    //Execution du choix de l'utilisateur
    public choixUser(choix : number){

        //Initalisation des variables
        let sauv : string = "";
        let s1 : number = 0;
        let s2 : number = 0;
        let pa : number = 0;
        let depart : number = 0;
        let isochrone : number = 0;
        let destination : number = 0;
        let successeur : Array<number> = [];
        let predecesseur : Array<number> = [];


        switch (choix){
            case 0 :
                // Si 0, alors on demande un nouveau lien
                // Vérification de saisie : on vérifie si le lien existe
                let lien = this.verif.fichierExiste("Inscrivez le nouveau lien : ");

                // Réinitialisation des class fils
                this.initDijkstra(lien, this.depart, this.isochrone);
                this.initBellman(lien, this.depart, this.destination);
                this.lien = lien;

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 1 :
                // Si 1, alors on ajoute un sommet
                this.dijkstra.ajouterSommet();
                console.log("Le sommet a été ajouté avec succès");

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 2 :
                // Si 2, alors on supprime le dernier sommet
                this.dijkstra.retirerSommet();
                console.log("Le sommet a été retiré avec succès");

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 3 :
                // Si 3, alors on affiche le nombre de sommet
                console.log("Le nombre de sommet du graphe =", this.dijkstra.nbreSommet);

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 4 :
                // Si 4, alors on affiche le nomber d'arc
                console.log("Le nombre d'arc du graphe =", this.dijkstra.nbreArc);

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 5 :
                // Si 5, alors on ajoute un arc
                // Vérfication de saisie : on vérifie si les deux sommets existent
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 1 : ");
                s2 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 2 : ");
                pa = Number(readlineSync.question("Poids Arc : "));

                // Ajouter l'arc
                this.dijkstra.ajouterArc([s1, s2, pa]);
                
                if (this.dijkstra.testArc(s1,s2)){
                    console.log("Le poids de l'arc a été modifié avec succès");
                }
                else{
                    console.log("L'arc a été ajouté avec succès");
                }

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 6 :
                // Si 5, alors on supprime un arc
                // Vérfication de saisie : on vérifie si les deux sommets existent
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 1 : ");
                s2 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 2 : ");

                if (this.dijkstra.testArc(s1,s2)){
                    this.dijkstra.supprimerArc([s1, s2]);
                    console.log("L'arc a été supprimé avec succès");
    
                }
                else{
                    console.log("L'arc n'existe pas !");
                }

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 7 :
                // Si 7, alors on affiche si le sommet existe
                // Vérfication de saisie : on vérifie si les deux sommets existent
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 1 : ");
                s2 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 2 : ");

                console.log("L'arc existe : ",this.dijkstra.testArc(s1, s2));

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 8 :
                // Si 8, alors on affiche le poids de l'arc
                // Vérfication de saisie : on vérifie si les deux sommets existent
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 1 : ");
                s2 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez le sommet 2 : ");

                if (this.dijkstra.testArc(s1,s2)){
                    console.log("Le poid de l'arc : ",this.dijkstra.poidsArc(s1, s2));
    
                }
                else{
                    console.log("L'arc n'existe pas !");
                }

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 9 :
                // Si 9, alors, on affiche les successeurs d'un sommet
                // Vérfication de saisie : on vérifie si le sommet existe
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un sommet : ");

                console.log("Les successeurs du sommet ", s1, " : ", this.dijkstra.successeurSommet(s1));

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 10 :
                // Si 10, alors, on affiche les prédecesseur d'un sommet
                // Vérfication de saisie : on vérifie si le sommet existe
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un sommet : ");

                console.log("Les prédecesseurs du sommet ", s1, " : ", this.dijkstra.predecesseurSommet(s1));

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 11 :
                // Si 11, alors, on affiche les voisins d'un sommet
                // Vérfication de saisie : on vérifie si le sommet existe
                s1 = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un sommet : ");
                
                successeur = this.dijkstra.successeurSommet(s1);
                predecesseur = this.dijkstra.predecesseurSommet(s1);
                console.log("Les voisins de ", s1, " : ", [...new Set([...successeur, ...predecesseur])]);

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 12:
                // Si 12, alors, on sauvegarde le graphe d'un fichier
                sauv = String(readlineSync.question("Nom de la sauvegarde: "));
                let texte : Array<string> = this.dijkstra.RecupererMatrice(this.lien);
                this.dijkstra.sauvegardeMatrice(texte, sauv);

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 13 :
                // Si 13, alors, on applique l'algorithme de Dijkstra
                // Vérfication de saisie : on vérifie si le sommet existe
                depart = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un point de départ : ");
                isochrone = Number(readlineSync.question("Valeur de l'isochrone : "));

                this.dijkstra.depart = depart;
                this.dijkstra.isochrone = isochrone;
                this.depart = depart;
                this.isochrone = isochrone;
                this.resultatDijkstra();

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;

            case 14 :
                // Si 14, alors, on applique l'algorithme de Bellman
                // Vérfication de saisie : on vérifie si le sommet existe
                depart = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un point de départ : ");
                destination = this.verif.sommetExiste(this.dijkstra.nbreSommet, "Entrez un point d'arrivé : ");

                this.bellman.depart = depart;
                this.depart = depart;
                this.bellman.destination = destination;
                this.destination = destination;
                this.resultatBellman();

                // Message pour continuer
                this.verif.messageContinuer("\nAppuyer sur Entrée pour continuer... ");
                this.main();
                break;
            
            case 15 :
                // Si 15, alors, on quitte le menu pour revenir au menu précédent
                console.log("A bientot !");
                break;
        }
    }
}

/*
let texte : Array<string> = ['c grid graphe .......','p sp 12 24','a 0 1 2','a 0 4 6','a 0 5 4','a 1 2 7','a 1 5 1','a 1 6 3','a 2 3 4','a 2 7 1','a 4 8 4','a 5 4 1','a 5 6 5','a 5 9 2','a 5 10 6','a 6 1 3','a 6 2 3','a 6 7 6','a 6 10 3','a 7 3 2','a 7 11 3','a 8 5 3','a 9 8 1','a 9 10 2','a 10 5 6','a 10 7 3','a 11 10 4'];
interactionMatrice.dijkstra.sauvegardeMatrice(texte, "test");
*/