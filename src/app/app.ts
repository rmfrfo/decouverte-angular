import { Component, signal, computed } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UpperCasePipe } from '@angular/common';
import { LeaveCounter } from './leave-counter/leave-counter';
import { EmployeeCard } from './employee-card/employee-card';
import { Employee } from './models/employee';
import { SearchBox } from './search-box/search-box';

// Un type qui n'accepte que ces trois textes : une faute de frappe sera refusée.
type Status = 'sur site' | 'en télétravail' | 'absent';
@Component({
  imports: [RouterOutlet, UpperCasePipe, LeaveCounter, EmployeeCard, SearchBox],
  selector: 'app-root',
  styleUrl: './app.css',
  templateUrl: './app.html',
})
export class App {
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
  readonly employees = signal<Employee[]>([
    {
      id: 1,
      firstName: 'Claire',
      lastName: 'Martin',
      email: 'claire.martin@techcorp.fr',
      job: 'Développeuse front-end',
      department: 'Informatique',
      remote: true,
    },
    {
      id: 2,
      firstName: 'Julien',
      lastName: 'Bernard',
      email: 'julien.bernard@techcorp.fr',
      job: 'Chef de projet',
      department: 'Informatique',
      remote: false,
    },
    {
      id: 3,
      firstName: 'Sarah',
      lastName: 'Lefèvre',
      email: 'sarah.lefevre@techcorp.fr',
      job: 'Chargée RH',
      department: 'Ressources humaines',
      remote: false,
    },
  ]);
  protected readonly search = signal('');

  protected readonly employeesCount = computed(() => this.employees().length);
  protected readonly employeesRemoteCount = computed(
    () => this.employees().filter((e) => e.remote).length,
  );
  protected readonly filteredEmployees = computed(() => {
    const text = this.search().trim().toLowerCase();
    return this.employees().filter((employee) =>
      (employee.firstName + ' ' + employee.lastName).toLowerCase().includes(text),
    );
  });
}
