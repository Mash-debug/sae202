import { GestionFichier } from "../classes/gestionFichier";

const gestionFichier = new GestionFichier();

test("GestionFichier", () => {
    expect(gestionFichier.nbreArc).toBe(0);
    expect(gestionFichier.nbreSommet).toBe(0);
})

test("Méthodes", () => {
    expect(gestionFichier.creerFichier("fichierTest.txt")).resolves.toBeUndefined();
    expect(gestionFichier.lecture("fichierTest.txt").length).toBe(1); // Chaine vide considéré comme un caractère
    expect(gestionFichier.formaterDonnees(["a", "dcefefzf", "éééé"]).length).toBe(1);
})