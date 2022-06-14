import { Sommet } from "../classes/Sommet";

const sommet = new Sommet("0");
const sommet2 = new Sommet("1");

test("Sommet", () => {
    expect(sommet.nom).toBe("0");
    expect(sommet.pere).toBe(sommet);
    expect(sommet.potentiel).toBe(Number.POSITIVE_INFINITY);
    expect(sommet.sommetArc.length).toBe(0);
    expect(sommet.poidsArc).toEqual({});
})

test("Méthodes", () => {
    sommet.ajouterArc(sommet2, 4);
    expect(sommet.sommetArc.length).not.toBe(0);

    sommet.retirerArc(sommet2);
    expect(sommet.sommetArc.length).toBe(0);

    expect(sommet.existeArc(sommet2)).toBe(false);
    expect(sommet.getPoidsArc(sommet2)).toBe(0);
    sommet.ajouterArc(sommet2, 4);
    expect(sommet.getPoidsArc(sommet2)).toBe(4);
})