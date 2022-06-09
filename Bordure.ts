import { Sommet } from "./Sommet";

export class Bordure {
  sommets: Sommet[];

  constructor() {
    this.sommets = [];
  }

  estVide(): boolean {
    return this.sommets.length === 0;
  }

  // extraireMin(): Sommet {}

  insertion(somme: number, longueur: number): void {}

  trierBordure() {
    this.sommets.sort((a, b) => a.potentiel - b.potentiel);
  }
}
