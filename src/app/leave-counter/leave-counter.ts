import { Component, computed, signal } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatCard, MatCardContent, MatCardHeader, MatCardTitle } from '@angular/material/card';

@Component({
  imports: [MatButton, MatCard, MatCardContent, MatCardHeader, MatCardTitle],
  selector: 'app-leave-counter',
  styleUrl: './leave-counter.css',
  templateUrl: './leave-counter.html',
})
export class LeaveCounter {
  protected readonly totalDays = 25;
  protected readonly daysTaken = signal(0);

  // Recalculés automatiquement quand daysTaken change.
  protected readonly remainingDays = computed(() => this.totalDays - this.daysTaken());
  protected readonly isEmpty = computed(() => this.remainingDays() === 0);

  protected addDay(): void {
    this.daysTaken.update((days) => days + 1);
  }

  protected removeDay(): void {
    this.daysTaken.update((days) => days - 1);
  }

  protected reset(): void {
    this.daysTaken.set(0);
  }
}
