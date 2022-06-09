import { GrapheListeAdjacence } from "./GrapheListeAdjacence";
import { GestionFichier } from "./gestionFichier";


const graphe = new GrapheListeAdjacence(7);

const sommet5 = graphe.sommets.find((s) => s.nom === "5")!;
const gestionFichier = new GestionFichier();

console.log(graphe.sommets);

// gestionFichier.creerFichier("grapheNew.txt"); 
// gestionFichier.ecritureFin("grapheNew.txt", graphe.sauvegarder());


