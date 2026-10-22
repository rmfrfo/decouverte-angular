import { Component, signal } from '@angular/core';
import { LeaveCounter } from '../../leave-counter/leave-counter';

type Status = 'sur site' | 'en télétravail' | 'absent';

@Component({
  imports: [LeaveCounter],
  selector: 'app-home',
  styleUrl: './home.css',
  templateUrl: './home.html',
})
export class Home {
  protected readonly userName = 'Claire';
  protected message = '';

  protected readonly status = signal<Status>('sur site');

  protected sayHello(): void {
    this.message = 'Bienvenue dans TechCorp Équipe, ' + this.userName + ' !';
  }

  protected changeStatus(newStatus: Status): void {
    this.status.set(newStatus);
  }
}
