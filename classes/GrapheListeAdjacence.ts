import { Sommet } from "./Sommet";
import { GestionFichierListe } from "./gestionFichierListe";
import { Bordure } from './Bordure';
import { writeFile } from "fs/promises";

export class GrapheListeAdjacence {
  nbreSommets: number;
  sommets: Array<Sommet> = [];
  bordure: Bordure;

  constructor(nbreSommets: number) {
    this.nbreSommets = nbreSommets;
    this.bordure = new Bordure();
    this.initListeAdjacence();
  }

  private initListeAdjacence(): void {
    for (let i = 0; i < this.nbreSommets; i++) {
      this.sommets.push(new Sommet(i.toString()));
    }

    let gestionFichier = new GestionFichierListe();

    let tabContenu = gestionFichier.formaterDonnees(
      gestionFichier.lecture("grapheTest.txt")
    );

    for (let i = 0; i < this.nbreSommets; i++) {
      const sommetSource = this.sommets.find((s) => s.nom === i.toString());
      const arcsSommet = tabContenu.filter((arc) => arc[0] === i.toString());

      for (const arc of arcsSommet) {
        const sommetDest = this.sommets.find((s) => s.nom === arc[1]);
        sommetSource!.ajouterArc(sommetDest!, Number(arc[2]));
      }
    }
  }

  ajouterSommet() {
    this.sommets.push(
      new Sommet(
        (Number(this.sommets[this.sommets.length - 1].nom) + 1).toString()
      )
    );
    this.nbreSommets = this.sommets.length;
  }

  retirerSommet() {
    // Retirer le dernier sommet du graphe
    const sommetRetire = this.sommets.pop();

    // Retirer tous les arcs qui lui sont associés
    for (const sommet of this.sommets) {
      sommet!.retirerArc(sommetRetire!);
      sommetRetire!.retirerArc(sommet!);
    }

    this.nbreSommets = this.sommets.length;
  }

  getNbreArcs() {
    let nbArcs = 0;
    for (const sommet of this.sommets) {
      nbArcs += sommet.sommetArc.length;
    }
    return nbArcs;
  }

  getSuccesseurs(sommetSource: Sommet) {
    return sommetSource.sommetArc;
  }

  getPredecesseurs(sommetSource: Sommet) {
    let listePredecesseurs: Sommet[] = [];

    for (const sommetGraphe of this.sommets) {
      const estPredecesseur = sommetGraphe.sommetArc.some(
        (sommet) => sommet.nom === sommetSource.nom
      );
      if (estPredecesseur) {
        listePredecesseurs.push(sommetGraphe);
      }
    }

    return listePredecesseurs;
  }

  getVoisins(sommetSource: Sommet) {
    return [
      ...new Set([
        ...this.getPredecesseurs(sommetSource),
        ...this.getSuccesseurs(sommetSource),
      ]),
    ]; // Set pour éliminer les doublons
  }

  async sauvegarder() {
    let arcs: (string | number)[][] = [];
    let stringFichier = "";

    // Sauvegarder le nombre de sommets et le nombre d'arcs

    stringFichier += "c grid graphe .......\n";
    stringFichier += `p sp ${this.nbreSommets} ${this.getNbreArcs()}\n`;

    for (const sommet of this.sommets) {
      for (const s of sommet.sommetArc) {
        arcs.push(["a", sommet.nom, s.nom, sommet.getPoidsArc(s)]);
      }
    }

    for (const arc of arcs) {
      stringFichier += arc.join(" ");
      stringFichier += "\n";
    }

    // Ecrire le resultat dans un fichier save a part
    const gestionFichier = new GestionFichierListe();
    await gestionFichier.creerFichier("grapheSave.txt");
    await writeFile("grapheSave.txt", stringFichier);
  }

  

  async rechercheDjisktra(sommetRacine: Sommet, isochrone: number = 0) {
    // Le potentiel par défaut est +Infini (défini dans le constructeur de la classe Sommet)
    // Le père de chaque sommet est par défaut lui meme (défini dans le constructeur de la classe Sommet)
    
    sommetRacine.potentiel = 0;
    sommetRacine.pere = null;
    this.bordure.sommets.push(sommetRacine);

    while(!this.bordure.estVide()) {
      // Chercher le sommet de la bordure ayant le plus petit potentiel (tableau déjà trié croissant)
      // Le retirer de la bordure
      this.bordure.trierBordure();
      const sommetPlusPetitPotentiel = this.bordure.sommets.shift()!;

      // Application de l'algorithme de Djikstra

      const successeurs = this.getSuccesseurs(sommetPlusPetitPotentiel);

      if(isochrone) {

        for(const succcesseur of successeurs) {
          const poids = sommetPlusPetitPotentiel.potentiel + sommetPlusPetitPotentiel.getPoidsArc(succcesseur);
          if(poids <= isochrone) {
            succcesseur.potentiel = poids;
            succcesseur.pere = sommetPlusPetitPotentiel;
  
            // Chercher si le successeur en question appartient à la bordure ; si non, on l'ajoute
  
            if(!this.bordure.sommets.includes(succcesseur)) {
              this.bordure.sommets.push(succcesseur);
            }
          }
        }

      } else {
        for(const succcesseur of successeurs) {
          const poids = sommetPlusPetitPotentiel.potentiel + sommetPlusPetitPotentiel.getPoidsArc(succcesseur);
          if(poids < succcesseur.potentiel) {
            succcesseur.potentiel = poids;
            succcesseur.pere = sommetPlusPetitPotentiel;
  
            // Chercher si le successeur en question appartient à la bordure ; si non, on l'ajoute
  
            if(!this.bordure.sommets.includes(succcesseur)) {
              this.bordure.sommets.push(succcesseur);
            }
          }
        }
      }

      
    }
    
    // Afficher pour chaque sommet son potentiel et son père
    let stringFichier = "";
    stringFichier += `Arborescence des CPM du sommet ${sommetRacine.nom}\n`;

    for(const sommet of this.sommets) {
      stringFichier += `a ${sommet.pere ? sommet.pere.nom : "none"} ${sommet.nom} ${sommet.pere ? sommet.pere.getPoidsArc(sommet) : 0}\n`
      console.log(`Sommet ${sommet.nom}: ${sommet.potentiel} | ${sommet.pere ? sommet.pere.nom : "none"}`);
    }


    // Ecrire le résultat de l'algo dans un nouveau fichier grapheNew.txt
    const gestionFichier = new GestionFichierListe();
    await gestionFichier.creerFichier("grapheDjisktra.txt");
    await writeFile("grapheDjisktra.txt", stringFichier);
  }
}


