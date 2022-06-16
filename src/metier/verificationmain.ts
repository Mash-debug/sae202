import * as readlineSync from "readline-sync";

// Class verif
export class Verif{


    // Initialisation des variables
    private choix : number = 0;
    private continuer : boolean = true;


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
}