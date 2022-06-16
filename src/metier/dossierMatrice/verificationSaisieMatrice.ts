import * as readlineSync from "readline-sync";

// Class verif
export class Verif{


    // Initialisation des variables
    private choix : number = 0;
    private continuer : boolean = true;
    private s : number = 0;
    private lien : string = "";


    // Demander un nombre tant que ce nombre n'est pas compris entre 2 bornes
    public choixBordure(bornInf : number, bornSup : number, texteQuestion : string) : number{
        this.continuer = true;
        
        do{
            try{
                // Demander un nombre
                this.choix = Number(readlineSync.question(texteQuestion));

                // Si la valeur n'est pas un nombre, alors on renvoie une erreur
                if (isNaN(this.choix)){
                    throw new Error("Le choix doit etre un nombre !");
                }

                // Si la valeur n'est pas un entier, alors on renvoie une erreur
                else if (Math.round(this.choix) != this.choix){
                    throw new Error("Le choix doit etre un entier !");
                }

                // Si la valeur est inférieur à la valeur minimum, alors on renvoie une erreur
                else if (this.choix < bornInf){
                    throw new Error("Le choix doit etre strictement supérieur à " + bornInf + " !");
                }

                // Si la valeur est supérieur à la valeur maximum, alors on renvoie une erreur
                else if(this.choix > bornSup){
                    throw new Error("Le choix doit strictement inférieur à " + bornSup + " !");
                }

                // Sinon on quitte la boucle
                this.continuer = false;
            }

            catch(Error){
                console.log(Error);
            }
        } while (this.continuer);

        // Renvoyer le résultat
        return this.choix;
    }


    // Demander un sommet tant que ce sommet n'appartient pas à l'ensemble des sommets (0 - nbreSommet-1)
    public sommetExiste(nbreSommet : number, texteQuestion : string) : number{
        this.continuer = true;
        
        do{
            try{
                // Demander un sommet
                this.s = Number(readlineSync.question(texteQuestion));

                // Si la valeur n'est pas un nombre, alors on renvoie une erreur
                if (isNaN(this.s)){
                    throw new Error("Le sommet doit etre un nombre !");
                }

                // Si la valeur n'est pas un entier, alors on renvoie une erreur
                else if (Math.round(this.s) != this.s){
                    throw new Error("Le choix doit etre un entier !");
                }

                // Si la valeur est inférieur à 0, alors on renvoie une erreur
                else if (this.s < 0){
                    throw new Error("Le sommet n'existe pas. Le sommet doit etre strictement supérieur à 0 !");
                }

                // Si la valeur est supérieur au nombre de sommet -1, alors on renvoie une erreur
                else if(this.s > nbreSommet -1){
                    throw new Error("Le sommet n'existe pas. Le sommet doit strictement inférieur à " + nbreSommet + " !");
                }

                // Sinon on quitte la boucle
                this.continuer = false
            }

            catch(Error){
                console.log(Error);
            }
        } while (this.continuer);

        // Renvoyer le résultat
        return this.s;
    }


    // Demander un nom de fichier tant que celui-ci n'est pas correcte
    public fichierExiste(texteQuestion : string) : string{
        this.continuer = true;

        do{
            // Demander un nom de fichier avec extension
            this.lien = String(readlineSync.question(texteQuestion));

            // Initialisation de la bibliothèque fs
            const fs = require("fs");

            try{
                // Si le lien ne mène à rien, alors on revoie une erreur
                if(!(fs.existsSync(this.lien))){
                    throw new Error("le fichier n'existe pas !");
                }

                // Sinon on quitte la boucle
                this.continuer = false;
            }

            catch(Error){
                console.log(Error);
            }

        }while (this.continuer);

        // Renvoyer le résultat
        return this.lien;
    }


    // Message pour continuer
    public messageContinuer(texteQuestion : string) : void{
        readlineSync.question(texteQuestion);
    }
}