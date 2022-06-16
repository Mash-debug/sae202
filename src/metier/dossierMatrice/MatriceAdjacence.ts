import { text } from 'stream/consumers';
import {GestionFichier} from './GestionFichierMatrice';


//class MatriceAdjacence
export class MatriceAdjacence extends GestionFichier{

    // Initisalition des variables
    public nbreSommet : number;
    public nbreArc : number;
    protected grapheMatrice : Array<Array<number>> = [];


    // Initialisation de la class et des class fils
    constructor(lien : string){
        super();
        this.initMatrice(lien);        
    }


    // initialiser la matrice
    public initMatrice(lien : string) : void{

        // Lecture des données  
        let tabData : Array<Array<string>> = this.formaterDonnees(this.lecture(lien));
        
        // Actualsier le nombre d'arc et le nombre de sommet
        this.nbreSommet = this.getNbreSommet;
        this.nbreArc = this.getNbreArc;

        // (Ré)initialisation de la matrice
        this.grapheMatrice = [];
        for (let i = 0 ; i < this.nbreSommet ; i++){
            let tab = new Array<number>(this.nbreSommet);
            tab = tab.fill(0);
            this.grapheMatrice.push(tab);
        }

        // Remplir la matrice$
        let info : number;
        let element : Array<string>;

        for (info = 0 ; info < tabData.length-1 ; info++){
            element = tabData[info];

            // Vérifier si l'élément n'est pas présent dans la liste
            if (!(this.testArc(Number(element[0]),Number(element[1])))){
                this.grapheMatrice[Number(element[0])][Number(element[1])] = Number(element[2]);
            }
        }
    }


    // Ajouter un sommet à la matrice
    public ajouterSommet() : void{

        // Ajouter un sommet
        this.nbreSommet++;

        // Ajouter les colonnes
        for (let ligne : number = 0 ; ligne < this.nbreSommet-1 ; ligne++){
            this.grapheMatrice[ligne].push(0);
        }

        // Ajouter une ligne
        let tab = new Array<number>(this.nbreSommet);
        tab = tab.fill(0);
        this.grapheMatrice.push(tab);
    }


    // Retirer un sommet à la matrice
    public retirerSommet() : void{

        // Supprimer un sommet
        this.nbreSommet--;

        // Supprimer une colonne
        for (let ligne : number = 0 ; ligne < this.nbreSommet ; ligne++){
            this.grapheMatrice[ligne].pop();
        }

        // Supprimer ligne
        this.grapheMatrice.pop();
    }


    // Retourner le nombre de sommet
    public affNbreSommet() : number{
        return this.nbreSommet;
    }


    // Retourner le nombre de arc
    public affNbreArc() : number{
        return this.nbreArc;
    }

     // Retourner le nombre de arc
     public affgrapheMatrice() : Array<Array<number>>{
        return this.grapheMatrice;
    }


    // Ajouter un arc
    public ajouterArc(element : Array<number>){

        // Vérifier si l'élément n'est pas présent dans la liste
        if (!(this.testArc(element[0],element[1]))){

            // Ajouter un arc
            this.grapheMatrice[element[0]][element[1]] = element[2];
            this.nbreArc++;
        }

        // Si l'arc existe, on modifie son poids
        else{

            // Modifier le poids de l'arc
            this.grapheMatrice[element[0]][element[1]] = element[2];
        }
    }


    // Supprimer un arc
    public supprimerArc(element : Array<number>){

        // Vérifier si l'élément est présent dans la liste
        if (this.testArc(element[0],element[1])){

            // Supprimer un arc
            this.grapheMatrice[element[0]][element[1]] = 0;
            this.nbreArc--;
        }
    }

    
    // Tester si un Arc existe
    public testArc(s1 : number, s2 : number) : boolean{
        
        // Vérifier si l'élément est présent dans la liste
        if ((this.grapheMatrice[s1][s2]) != 0){
            return true;
        }

        else{
            return false;
        }
    }


    // Récupérer le poids d'un arc
    public poidsArc(s1 : number, s2 : number) : number{

        // Vérifier si l'élément est présent dans la liste
        if (this.testArc(s1,s2)){
            return this.grapheMatrice[s1][s2];
        }

        else{
            return 0;
        }
    }


    // Retouner la liste des succeurs d'un sommet
    public successeurSommet(sommet : number) : Array<number>{

        // Initisalition des variables
        let successeur : Array<number> = [];
        let testSommet : number = 0;

        // Si il est existe un arc entre le sommet indiqué et la liste des sommets alors, on l'ajoute dans le tableau successeur
        for (testSommet = 0 ; testSommet < this.nbreSommet ; testSommet++){
            if (this.testArc(sommet,testSommet)){
                successeur.push(testSommet);
            }
        }

        // Renvoyer le résultat
        return successeur;
    }


    // Retouner la liste des predecesseurs d'un sommet
    public predecesseurSommet(sommet : number) : Array<number>{

        // Initialisation des variables
        let predecesseur : Array<number> = [];
        let testSommet : number = 0;

        // Si il est existe un arc entre le sommet indiqué et la liste des sommets alors, on l'ajoute dans le tableau predecesseur
        for (testSommet = 0 ; testSommet < this.nbreSommet ; testSommet++){
            if (this.testArc(testSommet, sommet)){
                predecesseur.push(testSommet);
            }
        }

        // Renvoyer le résultat
        return predecesseur;
    }


    // Retouner la liste des predecesseurs d'un sommet
    public voisinSommet(sommet : number) : Array<number>{

        // Intialisation des variables et récupération la liste des successeurs et des prédecesseurs
        let successeur : Array<number> = this.successeurSommet(sommet);
        let predecesseur : Array<number> = this.predecesseurSommet(sommet);
        let voisin : Array<number> = successeur;
        let present : boolean;
        let i : number;
        let j : number;

        for (i = 0 ; i < predecesseur.length ; i++){

            // Vérifier si le prédecesseur est déjà présent dans la liste
            present = false;
            for (j = 0 ; j < successeur.length ; j++){
                if (predecesseur[i] === successeur[i]){
                    present = true;
                }
            }

            // Si il n'est pas présent, on l'ajotue
            if (!present){
                voisin.push(predecesseur[i]);
            }
        }

        // Renvoyer le résultat
        return voisin;
    }


    // Sauvegarder la matrice dans le fichier txt
    public RecupererMatrice(lien : string) : Array<string>{

        // Initialisation des variables
        let texteData : Array<string>;
        let texte : Array<string> = [];
        let i : number;
        let j : number;

        // Récupérer les données fichier texte
        texteData = this.lecture(lien);

        // Ecrire l'en tete
        texte.push(texteData[0]);
        
        // Ecrire les informations (deuxième ligne)
        texte.push("p sp "+String(this.nbreSommet)+" "+String(this.nbreArc));

        // Ecrire l'ensemble des arcs
        for (i = 0 ; i < this.nbreSommet ; i++){
            for (j = 0 ; j < this.nbreSommet ; j++){

                // Vérifier si l'élément est présent dans la liste
                if (this.testArc(i, j)){
                    texte.push("a "+String(i)+" "+String(j)+" "+String(this.poidsArc(i, j)));
                }
            }
        }

        texte.push("");

        // Renvoyer le résultat
        return texte;
    }
}