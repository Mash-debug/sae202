import { BordureMatrice, SommetLongueur } from "./../../metier/dossierMatrice/BordureMatrice";


let sommetLongueur : SommetLongueur = new SommetLongueur(5, 2);

//Vérification de la class Longueur
test("Vérifier la valeur de longueur (correct)", () => {
    expect(sommetLongueur.longueur).toBe(5);
});

test("Vérifier la valeur de longueur (incorrect)", () => {
    expect(sommetLongueur.longueur).not.toBe(4);
});

test("Vérifier la valeur de sommet (correct)", () => {
    expect(sommetLongueur.sommet).toBe(2);
});

test("Vérifier la valeur de sommet (incorrect)", () => {
    expect(sommetLongueur.sommet).not.toBe(3);
});


let bordureMatrice : BordureMatrice = new BordureMatrice();

// Test de la fonction initSommet(successeur: number[])
test("Initialisation des sommets", () => {
    bordureMatrice.initSommet([2,3,4])
    expect(bordureMatrice.getListeSommet).toStrictEqual([2,3,4]);
});

test("Initialisation des longueurs", () => {
    bordureMatrice.initSommet([2,3,4])
    expect(bordureMatrice.listeSommetLongueur).toStrictEqual([]);
});


// Test de la fonction estVide()
test("Retourner si la liste est vide (non)", () => {
    bordureMatrice.initSommet([2,3,4])
    expect(bordureMatrice.estVide()).toBe(false);
});

test("Retourner si la liste est vide (oui)", () => {
    bordureMatrice.initSommet([])
    expect(bordureMatrice.estVide()).toBe(true);
});


// Actualiser la liste des sommets
test("Actualiser la liste des sommets", () => {
    bordureMatrice.initSommet([2,3,4])
    bordureMatrice.actualiserListe([1,2,3], [3,4,5]);
    expect(bordureMatrice.getListeSommet).toStrictEqual([4,5]);
});

test("Actualiser la liste des sommets", () => {
    bordureMatrice.initSommet([2,3,4])
    bordureMatrice.actualiserListe([1,2,3], [3,4,5]);
    expect(bordureMatrice.getListeSommet).not.toStrictEqual([2,3,4,5]);
});