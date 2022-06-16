import { GrapheListeAdjacence } from "../classes/GrapheListeAdjacence";
import { Sommet } from "../classes/Sommet";
import { readFile } from "fs/promises";

const graphe = new GrapheListeAdjacence(7);

test("GrapheListeAdjacence", () => {
    expect(graphe.nbreSommets).toBe(7);
    expect(graphe.sommets.length).toBe(7);
    expect(graphe.bordure).not.toBeFalsy();
})

test("Méthodes", async () => {
    graphe.ajouterSommet();
    expect(graphe.nbreSommets).toBe(8);
    expect(graphe.sommets.length).toBe(8);

    graphe.retirerSommet();
    expect(graphe.nbreSommets).toBe(7);
    expect(graphe.sommets.length).toBe(7);

    expect(graphe.getNbreArcs()).toBe(11);
    expect(graphe.getSuccesseurs(new Sommet("15"))).toEqual([]);   // Sommet n'existant pas
    expect(graphe.getPredecesseurs(graphe.sommets[3]).length).not.toBeFalsy();
    expect(graphe.getVoisins(graphe.sommets[2]).length).not.toBeFalsy();

    await graphe.sauvegarder();
    const buffer = await readFile("grapheSave.txt");
    expect(buffer).not.toBeFalsy(); // On vérifie si le fichier n'est pas vide
})

test("Djisktra", async () => {
    await graphe.rechercheDjisktra(graphe.sommets[0]);
    const buffer = await readFile("grapheDjisktra.txt");
    expect(buffer).not.toBeFalsy();
})