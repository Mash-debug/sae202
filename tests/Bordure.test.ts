import { Bordure } from "../classes/Bordure";
import { Sommet } from "../classes/Sommet";

test("Bordure", () => {
    const bordure = new Bordure();

    expect(bordure.sommets).toEqual([]);
    expect(bordure.estVide()).toBe(true);

    const sommet1 = new Sommet("5");
    const sommet2 = new Sommet("4");
    const sommet3 = new Sommet("3");

    bordure.sommets.push(sommet1, sommet2, sommet3);

    for(let i = 0; i < bordure.sommets.length; i++) {
        bordure.sommets[i].potentiel = i;
    }

    bordure.sommets.reverse(); // On renverse le tableau pour bien voir si le tableau est bien retrié après
    bordure.trierBordure();
    expect(bordure.sommets).toEqual([sommet1, sommet2, sommet3]);

})