import { Component, inject, signal } from '@angular/core';
import { FormField, form } from '@angular/forms/signals';
import { MatButton } from '@angular/material/button';
import { Router } from '@angular/router';
import { TeamStore } from '../../team-store';

// Le modèle du formulaire : une propriété par champ.
interface EmployeeDraft {
  firstName: string;
  lastName: string;
  email: string;
  job: string;
  department: string;
  remote: boolean;
}

// Les valeurs de départ, réutilisées pour vider le formulaire (module 19).
const EMPTY_DRAFT: EmployeeDraft = {
  firstName: '',
  lastName: '',
  email: '',
  job: '',
  department: 'Informatique',
  remote: false,
};

@Component({
  imports: [FormField, MatButton],
  selector: 'app-add-employee',
  styleUrl: './add-employee.css',
  templateUrl: './add-employee.html',
})
export class AddEmployee {
  private readonly store = inject(TeamStore);
  private readonly router = inject(Router);

  protected readonly departments = ['Informatique', 'Ressources humaines', 'Commercial'];

  // 1. Le modèle : un signal qui contient toutes les valeurs du formulaire.
  //    { ...EMPTY_DRAFT } : une copie, pour ne jamais modifier EMPTY_DRAFT.
  private readonly draft = signal<EmployeeDraft>({ ...EMPTY_DRAFT });

  // 2. Le formulaire : un champ par propriété du modèle.
  protected readonly employeeForm = form(this.draft);
}
