import { readFileSync, createWriteStream } from "fs";

//class GestionFichier
export class GestionFichier{ 


    // Initialisation des variables
    protected nbreSommet: number = 0;
    protected nbreArc : number = 0;


    //getter des variables
    public get getNbreSommet(): number {
        return this.nbreSommet;
    }

    public get getNbreArc(): number {
        return this.nbreArc;
    }

    // Lecture du contenu du fichier nomFichier
    public lecture(nomFichier : string) : Array<string>{
        let lecture : Array<string> = readFileSync(nomFichier, "utf8").split("\n");

        // Si le fichier ne passe pas la vérification de saisie, alors on arrete le programme
        if (!this.verifierFichier(lecture)){
            process.exit(1);
        }

        // Renvoyer le résultat
        return lecture;
    }


    // Formatage des données sous la forme de tableau de tableau
    public formaterDonnees(contenu : Array<string>){

        // Initialisation des variables
        let tabInfo : Array<string> = []
        let tabContenu : Array<Array<string>> = [];

        // Formater l'ensemble des données exceptées la première ligne
        for (let info = 1; info < contenu.length ; info++){

            // Enregistrer le nbre de Sommet et le nbre d'arc dans des variables à part
            if (info === 1){
                tabInfo = contenu[info].split(" ");
                this.nbreSommet = Number(tabInfo[2]);
                this.nbreArc = Number(tabInfo[3]);
            }
                
            // Enresgistrer les données en retirant le a dans le tableau tabContenu
            else{
                tabInfo = contenu[info].split(" ");
                tabContenu.push(tabInfo.splice(1,tabInfo.length));
            }
        }

        // Renvoyer le résultat
        return tabContenu;
    }


    // Vérifier si les données du fichier son correcte
    public verifierFichier(lecture: Array<string>) : boolean{

        // Initialisation des variables
        let fichier : Array<Array<string>> = this.formaterDonnees(lecture);
        let pointMax : number = 0;
        let point : number;
        
        try {
            // Vérification du nombre d'arc
            // Si le nombre d'arc est trop grand alors, on arret le programme
            if (this.nbreArc > (fichier.length -1)){
                throw Error("Erreur : le nombre d'arc est supérieur à ce qui a été renseigné. Il devrait etre égal à " + String(fichier.length-1));
            }

            // Si le nombre d'arc est trop petit alors, on arret le programme
            else if (this.nbreArc < (fichier.length -1)){
                throw Error("Erreur : le nombre d'arc est inférieur à ce qui a été renseigné. Il devrait etre égal à " + String(fichier.length-1));
            }

            //vérification du nombre de point
            for (point = 0 ; point < fichier.length-1 ; point++){
                if (pointMax < Number(fichier[point][0])){
                    pointMax = Number(fichier[point][0]);
                }

                if (pointMax < Number(fichier[point][1])){
                    pointMax = Number(fichier[point][1]);
                }
            }
            pointMax += 1;

            // Si le nombre de sommet est trop grand alors, on arret le programme
            if (this.nbreSommet > pointMax){
                throw Error("Erreur : le nombre de point est supérieur à ce qui a été renseigné. Il devrait etre égal à " + String(pointMax));
            }

            // Si le nombre de sommet est trop petit alors, on arret le programme
            else if (this.nbreSommet < pointMax){
                throw Error("Erreur : le nombre de point est inférieur à ce qui a été renseigné. Il devrait etre égal à " + String(pointMax));
            }

            // Sinon on retourne true
            return true;
        }

        catch (Error){
            console.log(Error);
            return false;
        }
    }


    // Sauvegarder la matrice
    public sauvegardeMatrice(texte : Array<string>, nomSave : string) : void{

        // Initialisation des variables
        let nomSauvegarde : string = "save-"+nomSave+".txt";

        // créer le fichier si nécessaire et lien vers le fichier texte
        let ecrire = createWriteStream(nomSauvegarde, {flags : 'w'});

        //Ecrire l'ensemble des informations
        for (let info = 0 ; info < texte.length ; info++){
            ecrire.write(texte[info]+"\n");
        }
        ecrire.end();
    }
}