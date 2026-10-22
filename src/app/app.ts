import { Component, signal, computed, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LeaveCounter } from './leave-counter/leave-counter';
import { EmployeeCard } from './employee-card/employee-card';
import { SearchBox } from './search-box/search-box';
import { TeamStore } from './team-store';

// Un type qui n'accepte que ces trois textes : une faute de frappe sera refusée.
type Status = 'sur site' | 'en télétravail' | 'absent';
@Component({
  imports: [RouterOutlet, UpperCasePipe, LeaveCounter, EmployeeCard, SearchBox],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
  // inject() : Angular fournit l'instance unique du service.
  private readonly store = inject(TeamStore);

  protected readonly appName = 'TechCorp Équipe';
  protected readonly userName = 'Romain';
  protected message = '';
  protected monChamp = signal<string>('');

  // Un signal qui contient le statut du jour, "sur site" au départ.
  protected readonly status = signal<Status>('sur site');

  protected readonly totalDays = 25;
  protected readonly daysTaken = signal(0);

  protected readonly remainingDays = computed(() => this.totalDays - this.daysTaken());
  protected readonly isEmpty = computed(() => this.remainingDays() === 0);

  protected sayHello(): void {
    this.message = `Bienvenue dans l'équipe TechCorp, ${this.userName} !`;
  }

  protected onType(message: string): void {
    this.monChamp.set(message);
  }

  protected changeStatus(newStatus: Status): void {
    // set() remplace la valeur : l'écran se met à jour tout seul.
    this.status.set(newStatus);
  }

  protected clearMessage(): void {
    this.message = '';
  }

  protected readonly search = signal('');

  protected readonly employeesCount = computed(() => this.store.employees().length);
  protected readonly employeesRemoteCount = computed(
    () => this.store.employees().filter((e) => e.remote).length,
  );
  protected readonly filteredEmployees = computed(() => {
    const text = this.search().trim().toLowerCase();
    // employees est maintenant un signal : on le lit avec ().
    return this.store
      .employees()
      .filter((employee) =>
        (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(text),
      );
  });

  protected remove(id: number): void {
    this.store.remove(id);
  }
}
