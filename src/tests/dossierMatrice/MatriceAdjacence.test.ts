import { MatriceAdjacence } from "./../../metier/dossierMatrice/MatriceAdjacence";


// Initialisation de la class
let matriceAdjacence : MatriceAdjacence = new MatriceAdjacence("src/tests/dossierMatrice/grapheTest2.txt");


// Test de la fonction initMatrice(lien: string)
matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");

test('Vérifier si le nombre de sommet a bien été sauvegardé (correct)', () => {
    expect(matriceAdjacence.affNbreSommet()).toBe(7);
});

test('Vérifier si le nombre de sommet a bien été sauvegardé (incorrect)', () => {
    expect(matriceAdjacence.affNbreSommet()).not.toBe(8);
});

test("Vérifier si le nombre d'arc' a bien été sauvegardé (correct)", () => {
    expect(matriceAdjacence.affNbreArc()).toBe(11);
});

test('Vérifier si le nombre de sommet a bien été sauvegardé (incorrect)', () => {
    expect(matriceAdjacence.affNbreArc()).not.toBe(12);
});

test('Vérifier si le tableau a bien été initialisé (correct)', () => {
    expect(matriceAdjacence.affgrapheMatrice()).toStrictEqual([[0, 1, 0, 3, 0, 0, 0],[0, 0, 2, 1, 5, 0, 0],[0, 0, 0, 0, 4, 2, 4],[0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 2],[0, 0, 0, 0, 0, 0, 0]]);
});

test('Vérifier si le tableau a bien été initialisé (incorrect)', () => {
    expect(matriceAdjacence.affgrapheMatrice()).not.toStrictEqual([[2, 1, 0, 3, 0, 0, 0],[0, 0, 2, 1, 5, 0, 0],[0, 0, 0, 0, 4, 2, 4],[0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 2],[0, 0, 0, 0, 0, 0, 0]]);
});


// Test de la fonction ajouterSommet()
test('Ajouter un sommet (vérifier graphe)', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.ajouterSommet();
    expect(matriceAdjacence.affgrapheMatrice()).toStrictEqual([[0, 1, 0, 3, 0, 0, 0, 0],[0, 0, 2, 1, 5, 0, 0, 0],[0, 0, 0, 0, 4, 2, 4, 0],[0, 0, 0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 0, 1, 0, 0],[0, 0, 0, 0, 0, 0, 2, 0],[0, 0, 0, 0, 0, 0, 0, 0],[0, 0, 0, 0, 0, 0, 0, 0]]);
});


test('Ajouter un sommet (vérifier nombre sommet)', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.ajouterSommet();
    expect(matriceAdjacence.affNbreSommet()).toBe(8);
});


// Test de la fonction retirerSommet()
test('Ajouter un sommet (vérifier graphe)', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.retirerSommet();
    expect(matriceAdjacence.affgrapheMatrice()).toStrictEqual([[0, 1, 0, 3, 0, 0],[0, 0, 2, 1, 5, 0],[0, 0, 0, 0, 4, 2],[0, 0, 0, 0, 0, 1], [0, 0, 0, 0, 0, 1],[0, 0, 0, 0, 0, 0]]);
});


test('Ajouter un sommet (vérifier nombre sommet)', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.retirerSommet();
    expect(matriceAdjacence.affNbreSommet()).toBe(6);
});


// Afficher les données
test('Afficher le nombre de sommet', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.affNbreSommet()).toBe(7);
});

test("Afficher le nombre d'arc", () => {
    expect(matriceAdjacence.affNbreArc()).toBe(11);
});

test('Afficher le graphe', () => {
    expect(matriceAdjacence.affgrapheMatrice()).toStrictEqual([[0, 1, 0, 3, 0, 0, 0],[0, 0, 2, 1, 5, 0, 0],[0, 0, 0, 0, 4, 2, 4],[0, 0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1, 0],[0, 0, 0, 0, 0, 0, 2],[0, 0, 0, 0, 0, 0, 0]]);
});


// Ajouter Arc
test('Ajouter un arc', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.ajouterArc([0,2,5])
    expect(matriceAdjacence.poidsArc(0,2)).toBe(5);
});

test("Modifier le poids de l'arc", () => {
    matriceAdjacence.ajouterArc([0,2,3])
    expect(matriceAdjacence.poidsArc(0,2)).toBe(3);
});


// Retirer Arc
test('Supprimer un arc', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    matriceAdjacence.supprimerArc([0,1])
    expect(matriceAdjacence.testArc(0,1)).toBe(false);
});


// Tester si un arc existe
test('Tester si un arc existe (existe)', () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.testArc(0,1)).toBe(true);
});

test("Tester si un arc existe (n'existe pas)", () => {
    expect(matriceAdjacence.testArc(0,2)).toBe(false);
});


// Retourner le poids d'un arc
test("Retourner le poids d'un arc (existe)", () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.poidsArc(0,1)).toBe(1);
});

test("Retourner le poids d'un arc (n'existe pas)", () => {
    expect(matriceAdjacence.poidsArc(0,2)).toBe(0);
});


// Afficher la liste des successeurs d'un sommet
test("Liste des successeurs d'un sommet ayant plusieurs successeurs", () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.successeurSommet(0)).toStrictEqual([1,3]);
});

test("Liste des successeurs d'un sommet ayant aucuns successeurs", () => {
    expect(matriceAdjacence.successeurSommet(6)).toStrictEqual([]);
});


// Afficher la liste des predecesseurs d'un sommet
test("Liste des predecesseurs d'un sommet ayant plusieurs successeurs", () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.predecesseurSommet(6)).toStrictEqual([2,5]);
});

test("Liste des predecesseurs d'un sommet ayant aucuns successeurs", () => {
    expect(matriceAdjacence.predecesseurSommet(0)).toStrictEqual([]);
});


// Afficher la liste des voisins d'un sommet
test("Liste des voisins d'un sommet ayant plusieurs successeurs et plusieurs predecesseurs", () => {
    matriceAdjacence.initMatrice("src/tests/dossierMatrice/grapheTest2.txt");
    expect(matriceAdjacence.voisinSommet(4)).toStrictEqual([5,1,2]);
});

test("Liste des voisins d'un sommet ayant plusieurs successeurs", () => {
    expect(matriceAdjacence.voisinSommet(0)).toStrictEqual([1,3]);
});

test("Liste des voisins d'un sommet ayant plusieurs predecesseurs", () => {
    expect(matriceAdjacence.voisinSommet(6)).toStrictEqual([2,5]);
});


// Retranscrire les données présentes dans la matrice
test("Retranscrire les données présentes dans la matrice", () => {
    expect(matriceAdjacence.RecupererMatrice("src/tests/dossierMatrice/grapheTest2.txt")).toStrictEqual(["c grid graphe .......", "p sp 7 11","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""]);
});