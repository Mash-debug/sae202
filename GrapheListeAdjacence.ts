import { Sommet } from "./Sommet";
import { GestionFichier } from "./gestionFichier";
import { Bordure } from './Bordure';

export class GrapheListeAdjacence {
  nbreSommets: number;
  sommets: Array<Sommet> = [];
  bordure: Bordure;

  constructor(nbreSommets: number) {
    this.nbreSommets = nbreSommets;
    this.bordure = new Bordure();
    this.initListeAdjacence();
  }

  initListeAdjacence(): void {
    for (let i = 0; i < this.nbreSommets; i++) {
      this.sommets.push(new Sommet(i.toString()));
    }

    let gestionFichier = new GestionFichier();

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
  }

  retirerSommet() {
    // Retirer le dernier sommet du graphe
    const sommetRetire = this.sommets.pop();

    // Retirer tous les arcs qui lui sont associés
    for (const sommet of this.sommets) {
      sommet!.retirerArc(sommetRetire!);
      sommetRetire!.retirerArc(sommet!);
    }
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

  sauvegarder() {
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

    return stringFichier;
  }

  rechercheDjisktra() {
    while(!this.bordure.estVide()) {
      
    }
  }
}

// Ajouter un arc de poids 7 au sommet 6 de destination sommet 2;
// const sommet6 = graphe.sommets.find((s) => s.nom === "6")!;
// const sommet2 = graphe.sommets.find((s) => s.nom === "2")!;

// sommet6.ajouterArc(sommet2, 7);
// console.log("Nombre d'arcs : ", graphe.getNbreArcs());
// // console.log(sommet6!.existeArc(sommet2!));
// // console.log(sommet6!.getPoidsArc(sommet2!));
