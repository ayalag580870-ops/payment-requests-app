import { Component, Input } from '@angular/core';
import { SlaState } from '../../services/payment-requests.service';

@Component({
  selector: 'app-sla-badge',
  templateUrl: './sla-badge.component.html',
  styleUrls: ['./sla-badge.component.css']
})
export class SlaBadgeComponent {
  @Input() state!: SlaState;
}
