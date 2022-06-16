import * as readlineSync from "readline-sync";

export class Verif {
    choix : number = 0;
    continuer : boolean = true;
    s : number = 0;
    lien : string = "";


    choixBordure(bornInf : number, bornSup : number, texteQuestion : string) : number{
        this.continuer = true;
        
        do{
            try{
                this.choix = Number(readlineSync.question(texteQuestion));

                if (isNaN(this.choix)){
                    throw new Error("Le choix doit etre un nombre !");
                }

                else if (Math.round(this.choix) != this.choix){
                    throw new Error("Le choix doit etre un entier !");
                }

                else if (this.choix < bornInf){
                    throw new Error("Le choix doit etre strictement supérieur à " + bornInf + " !");
                }

                else if(this.choix > bornSup){
                    throw new Error("Le choix doit strictement inférieur à " + bornSup + " !");
                }

                this.continuer = false;
            }

            catch(Error){
                console.log(Error);
            }
        } while (this.continuer);

        return this.choix;
    }

    sommetExiste(nbreSommet : number, texteQuestion : string) : number{
        this.continuer = true;
        
        do{
            try{
                this.s = Number(readlineSync.question(texteQuestion));

                if (isNaN(this.s)){
                    throw new Error("Le sommet doit etre un nombre !");
                }

                else if (Math.round(this.s) != this.s){
                    throw new Error("Le choix doit etre un entier !");
                }

                else if (this.s < 0){
                    throw new Error("Le sommet n'existe pas. Le sommet doit etre strictement supérieur à 0 !");
                }

                else if(this.s > nbreSommet -1){
                    throw new Error("Le sommet n'existe pas. Le sommet doit strictement inférieur à " + nbreSommet + " !");
                }

                this.continuer = false
            }

            catch(Error){
                console.log(Error);
            }
        } while (this.continuer);

        return this.s;
    }

    fichierExiste(texteQuestion : string) : string{
        this.continuer = true;

        do{
            this.lien = String(readlineSync.question(texteQuestion));
            const fs = require("fs");

            try{
                if(!(fs.existsSync(this.lien))){
                    throw new Error("le fichier n'existe pas !");
                }

                this.continuer = false;
            }

            catch(Error){
                console.log(Error);
            }

        } while (this.continuer);

        return this.lien;
    }

    messageContinuer(texteQuestion : string) : void{
        readlineSync.question(texteQuestion);
    }
}