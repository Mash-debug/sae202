import { GrapheListeAdjacence } from "./GrapheListeAdjacence";
import { GestionFichier } from "./gestionFichier";

const graphe = new GrapheListeAdjacence(7);

const sommet0 = graphe.sommets.find((s) => s.nom === "0")!;

graphe.rechercheDjisktra(sommet0);


// gestionFichier.creerFichier("grapheNew.txt");
// gestionFichier.ecritureFin("grapheNew.txt", graphe.sauvegarder());
