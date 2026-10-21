import { Component, input, signal, computed } from '@angular/core';
import { Employee } from '../models/employee';
import { StatusBadge } from '../status-badge/status-badge';

@Component({
  imports: [StatusBadge],
  selector: 'app-employee-card',
  styleUrl: './employee-card.css',
  templateUrl: './employee-card.html',
})
export class EmployeeCard {
  // Donnée reçue du parent : <app-employee-card [employee]="..." />
  // required : le parent est OBLIGÉ de la fournir.
  readonly employee = input.required<Employee>();
  compact = input(false);
  readonly position = input<number>();
  readonly count = input<number>();

  readonly employeeInitials = computed(() => {
    return `${this.employee().firstName.charAt(0)}${this.employee().lastName.charAt(0)}`.toUpperCase();
  });
}
