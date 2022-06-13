import { GrapheListeAdjacence } from "./GrapheListeAdjacence";
import { InteractionListe } from "./interactionListe";


const graphe = new GrapheListeAdjacence(7);
const interactionListe = new InteractionListe();
const sommet0 = graphe.sommets.find((s) => s.nom === "0")!;

// Lancer Djikstra
graphe.rechercheDjisktra(sommet0);


// Ajouter un arc de poids 7 au sommet 6 de destination sommet 2;
const sommet6 = graphe.sommets.find((s) => s.nom === "6")!;
const sommet2 = graphe.sommets.find((s) => s.nom === "2")!;
sommet6.ajouterArc(sommet2, 7);


// Details sur le graphe
console.log("Nombre d'arcs : ", graphe.getNbreArcs());
console.log(sommet6!.existeArc(sommet2!));
console.log(sommet6!.getPoidsArc(sommet2!));