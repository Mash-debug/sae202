import { ResultatMatrice } from "./../../metier/dossierMatrice/ResultatMatrice";

let resultatMatrice : ResultatMatrice = new ResultatMatrice();



// Initialisation de l'agorithme de Bellman
resultatMatrice.initBellman("src/tests/dossierMatrice/grapheTest2.txt", 0, 6);

test("Vérifier la valeur de depart (correct)", () => {
    expect(resultatMatrice.bellman.depart).toBe(0);
});

test("Vérifier la valeur de depart (incorrect)", () => {
    expect(resultatMatrice.bellman.depart).not.toBe(1);
});

test("Vérifier la valeur de destination (correct)", () => {
    expect(resultatMatrice.bellman.destination).toBe(6);
});

test("Vérifier la valeur de destination (incorrect)", () => {
    expect(resultatMatrice.bellman.destination).not.toBe(5);
});


// Algorithme de recherche
test("Algorithme de recherche", () => {
    expect(resultatMatrice.rechercheChemin(resultatMatrice.bellman.successeurSommet(resultatMatrice.bellman.depart), resultatMatrice.bellman.destination)).toBe(true);
});


// Afficher résultat de Bellman
test("Afficher le résultat Bellman", () => {
    expect(resultatMatrice.resultatBellman()).toBeUndefined();
});



// Initialisation de l'agorithme de Dijkstra
resultatMatrice.initDijkstra("src/tests/dossierMatrice/grapheTest2.txt", 0, 10);
test("Vérifier la valeur de depart (correct)", () => {
    expect(resultatMatrice.dijkstra.depart).toBe(0);
});

test("Vérifier la valeur de depart (incorrect)", () => {
    expect(resultatMatrice.dijkstra.depart).not.toBe(1);
});

test("Vérifier la valeur de isochrone (correct)", () => {
    expect(resultatMatrice.dijkstra.isochrone).toBe(10);
});

test("Vérifier la valeur de isochrone (incorrect)", () => {
    expect(resultatMatrice.dijkstra.isochrone).not.toBe(9);
});


// Afficher résultat de Dijkstra
test("Afficher le résultat Dijkstra", () => {
    expect(resultatMatrice.resultatDijkstra()).toBeUndefined();
});