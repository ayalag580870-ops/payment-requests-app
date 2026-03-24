import { Component, OnInit } from '@angular/core';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaymentRequestsService, SlaState } from '../../services/payment-requests.service';
import { RoleService } from '../../services/role.service';
import { UserRole } from '../../models/user-role.type';

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.css']
})
export class RequestsListComponent implements OnInit {
  requests: PaymentRequest[] = [];
  currentRole: UserRole = 'consultant';

  constructor(
    private paymentRequestsService: PaymentRequestsService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
    this.loadRequests();
  }

  loadRequests(): void {
    this.currentRole = this.roleService.getCurrentRole();
    this.requests = this.paymentRequestsService.getVisibleRequests(this.currentRole);
  }

  getDaysOpen(submittedAt: string): number {
    return this.paymentRequestsService.getDaysOpen(submittedAt);
  }

  getSlaState(submittedAt: string): SlaState {
    return this.paymentRequestsService.getSlaState(submittedAt);
  }

  isStuck(lastUpdatedAt: string): boolean {
    return this.paymentRequestsService.isStuck(lastUpdatedAt);
  }

  onRoleChanged(): void {
    this.loadRequests();
  }
}