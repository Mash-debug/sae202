import { BellmanMatrice } from "./../../metier/dossierMatrice/BellmanMatrice";

let bellmanMatrice : BellmanMatrice = new BellmanMatrice("src/tests/dossierMatrice/grapheTest2.txt", 0, 6);

// Vérifier l'initialisation
test("Vérifier la valeur de depart (correct)", () => {
    expect(bellmanMatrice.depart).toBe(0);
});

test("Vérifier la valeur de depart (incorrect)", () => {
    expect(bellmanMatrice.depart).not.toBe(1);
});

test("Vérifier la valeur de destination (correct)", () => {
    expect(bellmanMatrice.destination).toBe(6);
});

test("Vérifier la valeur de destination (incorrect)", () => {
    expect(bellmanMatrice.destination).not.toBe(5);
});


// Test de la fonction examinerPoint(s: number)
test("Cas 0 : Initialisation de l'algorithme", () => {
    expect(bellmanMatrice.examinerPoint(0)).toStrictEqual([0, -1]);
});

test('Cas général', () => {
    expect(bellmanMatrice.examinerPoint(1)).toStrictEqual([Infinity, 1]);
});


// Test de la fonction verifRacine(s: number)
test("Cas général", () => {
    expect(bellmanMatrice.verifRacine([0,1],1)).toStrictEqual([2,3]);
});

test('Cas si la liste des successeurs est vide', () => {
    expect(bellmanMatrice.verifRacine([0,1,2,3,4,5,6],6)).toStrictEqual([]);
});


// Affiche la liste des sources du graphe
test("Affiche la liste des sources du graphe", () => {
    expect(bellmanMatrice.initRacine()).toStrictEqual([0]);
});


// Lancement de l'agorithme
test("Lancement de l'agorithme (graphe possible)", () => {
    expect(bellmanMatrice.existeLienRecursif([], [], 0)).toBe(true);
});

// Lancement de l'agorithme
test("Lancement de l'agorithme (graphe impossible)", () => {
    bellmanMatrice.ajouterArc([6,0,5]);
    expect(bellmanMatrice.existeLienRecursif([], [], 0)).toBe(false);
});