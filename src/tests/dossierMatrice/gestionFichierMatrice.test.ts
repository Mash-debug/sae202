import { GestionFichier } from "./../../metier/dossierMatrice/GestionFichierMatrice";


// Inittialisation de la class
let gestionFichier : GestionFichier = new GestionFichier()


// Test de la fonction lecture(nomFichier: string)
test('Lecture du fichier texte test', () => {
    expect(gestionFichier.lecture("src/tests/dossierMatrice/grapheTest2.txt")).toStrictEqual(["c grid graphe .......", "p sp 7 11","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""]);
});


// Test de la fonction formaterDonnees(données : Array<string>)
let lecture : Array<string> = gestionFichier.lecture("src/tests/dossierMatrice/grapheTest2.txt");
test('Formater les données', () => {
    expect(gestionFichier.formaterDonnees(lecture)).toStrictEqual([["0", "1", "1"], ["0", "3", "3"], ["1", "2", "2"], ["1", "3", "1"], ["1", "4", "5"], ["2", "4", "4"], ["2", "5", "2"], ["2", "6", "4"], ["3", "5", "1"], ["4", "5", "1"], ["5", "6", "2"], []]);
});

test('Vérifier si les données sont bien formatées', () => {
    expect(gestionFichier.formaterDonnees(lecture)).not.toStrictEqual([["0", "1", "1"], ["1", "4", "5"], ["1", "3", "1"], ["0", "3", "3"], ["1", "2", "2"], ["2", "4", "4"], ["5", "6", "2"], ["2", "5", "2"], ["2", "6", "4"], ["3", "5", "1"], ["4", "5", "1"], []]);
});

test('Sauvegarder le nombre de sommet', () => {
    gestionFichier.formaterDonnees(lecture)
    expect(gestionFichier.getNbreSommet).toBe(7)
});

test('Vérifier si le nombre de sommet a bien été sauvegardé', () => {
    gestionFichier.formaterDonnees(lecture)
    expect(gestionFichier.getNbreSommet).not.toBe(10)
});

test("Sauvegarder le nombre d'arc", () => {
    gestionFichier.formaterDonnees(lecture)
    expect(gestionFichier.getNbreArc).toBe(11)
});

test("Vérifier si le nombre d'arc a bien été sauvegardé", () => {
    gestionFichier.formaterDonnees(lecture)
    expect(gestionFichier.getNbreArc).not.toBe(42)
});


// Test de la fonction verifierFichier(lecture: Array<string>)
test('Vérifier un fichier correcte', () => {
    lecture  = ["c grid graphe .......", "p sp 7 11","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(true);
});

test('Vérifier un fichier incorrecte', () => {
    lecture = ["c grid graphe .......", "p sp 0 0","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(false);
});

test("Renvoyer false si le nombre d'arc est inférieur à ce qui a été renseigné", () => {
    lecture = ["c grid graphe .......", "p sp 7 10","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(false);
});

test("Renvoyer false si le nombre d'arc est supérieur à ce qui a été renseigné", () => {
    lecture = ["c grid graphe .......", "p sp 7 12","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(false);
});

test("Renvoyer false si le nombre de sommet est inférieur à ce qui a été renseigné", () => {
    lecture = ["c grid graphe .......", "p sp 6 11","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(false);
});

test("Renvoyer false si le nombre de sommet est supérieur à ce qui a été renseigné", () => {
    lecture = ["c grid graphe .......", "p sp 8 11","a 0 1 1","a 0 3 3","a 1 2 2","a 1 3 1","a 1 4 5","a 2 4 4","a 2 5 2","a 2 6 4","a 3 5 1","a 4 5 1","a 5 6 2",""];
    expect(gestionFichier.verifierFichier(lecture)).toBe(false);
});