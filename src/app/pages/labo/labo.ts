import { Component, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';

@Component({
  imports: [MatButton],
  selector: 'app-labo',
  styleUrl: './labo.css',
  templateUrl: './labo.html',
})
export class Labo {
  // Module 1 : l'ordre d'exécution.
  protected readonly logs = signal<string[]>([]);

  protected runTimeout(): void {
    this.logs.set([]);
    this.log('1. Avant setTimeout');
    setTimeout(() => this.log('3. Dans setTimeout, une seconde plus tard'), 1000);
    this.log('2. Après setTimeout');
  }

  private log(message: string): void {
    this.logs.update((list) => [...list, message]);
  }
}
