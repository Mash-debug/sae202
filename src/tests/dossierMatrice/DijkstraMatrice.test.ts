import { DijkstraMatrice } from "./../../metier/dossierMatrice/DijkstraMatrice";

let dijkstraMatrice : DijkstraMatrice = new DijkstraMatrice("src/tests/dossierMatrice/grapheTest2.txt", 0, 10);

// Initialisation de la class
test("Vérifier la valeur de depart (correct)", () => {
    expect(dijkstraMatrice.depart).toBe(0);
});

test("Vérifier la valeur de depart (incorrect)", () => {
    expect(dijkstraMatrice.depart).not.toBe(1);
});

test("Vérifier la valeur de isochrone (correct)", () => {
    expect(dijkstraMatrice.isochrone).toBe(10);
});

test("Vérifier la valeur de isochrone (incorrect)", () => {
    expect(dijkstraMatrice.isochrone).not.toBe(9);
});


// Test du programme principal
test("test du programmee principal", () => {
    expect(dijkstraMatrice.rechercheDijkstraRecursif([],0)).toBe(true);
});
