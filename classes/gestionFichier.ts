import { readFileSync, createWriteStream } from "fs";
import { writeFile } from 'fs/promises'

export class GestionFichier {
  nbreSommet: number = 0;
  nbreArc: number = 0;

  async creerFichier(nomFichier: string) {
    return writeFile(nomFichier, "", { flag: "w" });
  }

  // lecture du contenu du fichier nomFichier
  lecture(nomFichier: string): Array<string> {
    return readFileSync(nomFichier, "utf8").split("\n");
  }

  // Formatage des données sous la forme de tableau de tableau
  formaterDonnees(contenu: Array<string>) {
    let tabInfo: Array<string> = [];
    let tabContenu: Array<Array<string>> = [];
    for (let info = 1; info < contenu.length; info++) {
      if (info === 1) {
        //Enregistrer le nbre de Sommet et le nbre d'arc dans des variables à part
        tabInfo = contenu[info].split(" ");
        this.nbreSommet = Number(tabInfo[2]);
        this.nbreArc = Number(tabInfo[3]);
      } else {
        //Enresgistrer les données en retirant le a dans le tableau tabContenu
        tabInfo = contenu[info].split(" ");
        tabContenu.push(tabInfo.splice(1, tabInfo.length));
      }
    }

    return tabContenu;
  }
  
}

