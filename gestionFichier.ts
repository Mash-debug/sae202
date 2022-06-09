import { readFileSync, createWriteStream, writeFile } from "fs";


export class GestionFichier {
    nbreSommet : number = 0;
    nbreArc : number = 0;

    creerFichier(nomFichier: string) {
        writeFile(nomFichier, "", { flag: 'w' }, function (err) {
            if (err) throw err;
        });
    }

    //lecture du contenu du fichier nomFichier
    lecture(nomFichier : string) : Array<string>{
        return readFileSync(nomFichier, "utf8").split("\n");
    }


    //Formatage des données sous la forme de tableau de tableau
    formaterDonnees(contenu : Array<string>){
        let tabInfo : Array<string> = []
        let tabContenu : Array<Array<string>> = [];
        for (let info = 1; info < contenu.length ; info++){
            if (info === 1){

                //Enregistrer le nbre de Sommet et le nbre d'arc dans des variables à part
                tabInfo = contenu[info].split(" ");
                this.nbreSommet = Number(tabInfo[2]);
                this.nbreArc = Number(tabInfo[3]);
            }

            else {

                //Enresgistrer les données en retirant le a dans le tableau tabContenu
                tabInfo = contenu[info].split(" ");
                tabContenu.push(tabInfo.splice(1,tabInfo.length));
            }
        }

        return tabContenu;
    }
    
    //Test
    ecritureFin(nomFichier : string, donnees : string) : void{

        //Récupérer les données précédentes pour ajouter à la fin la donnée
        let document : Array<string> = this.lecture(nomFichier);

        let ecrire = createWriteStream(nomFichier);
        for (let info = 0; info < document.length ; info++){
            ecrire.write(document[info]);
        }
        ecrire.write(donnees+ "\n");

        ecrire.end();
    }

    
}

//Test
let gestionFichier = new GestionFichier();

// //Lecture
// let contenu = gestionFichier.lecture("grapheTest.txt");
// console.log(contenu);

//Formater
let tabContenu = gestionFichier.formaterDonnees(gestionFichier.lecture("grapheTest.txt"));
// console.log(tabContenu, gestionFichier.nbreSommet, gestionFichier.nbreArc);

// //Ecriture
// gestionFichier.ecritureFin("grapheTest.txt", "a 12 13 14");