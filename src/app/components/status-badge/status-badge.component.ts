import { Component, Input } from '@angular/core';
import { RequestStatus } from '../../models/request-status.type';

@Component({
  selector: 'app-status-badge',
  templateUrl: './status-badge.component.html',
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent {
  @Input() status!: RequestStatus;

  get statusClass(): string {
    switch (this.status) {
      case 'טיוטה':
        return 'draft';
      case 'הוגש':
        return 'submitted';
      case 'בבדיקה':
        return 'review';
      case 'ממתין להבהרות':
        return 'clarification';
      case 'אושר לתשלום':
        return 'approved';
      case 'נדחה':
        return 'rejected';
      default:
        return '';
    }
  }
}
