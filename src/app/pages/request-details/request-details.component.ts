import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaymentRequestsService, SlaState } from '../../services/payment-requests.service';
import { RoleService } from '../../services/role.service';
import { UserRole } from '../../models/user-role.type';

@Component({
  selector: 'app-request-details',
  templateUrl: './request-details.component.html',
  styleUrls: ['./request-details.component.css']
})
export class RequestDetailsComponent implements OnInit {
  request: PaymentRequest | undefined;
  currentRole: UserRole = 'consultant';
  reviewNote: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private paymentRequestsService: PaymentRequestsService,
    private roleService: RoleService
  ) {}

  ngOnInit(): void {
  this.currentRole = this.roleService.getCurrentRole();

  const idParam = this.route.snapshot.paramMap.get('id');
  const requestId = Number(idParam);

  if (!requestId) {
    this.router.navigate(['/requests']);
    return;
  }

  this.request = this.paymentRequestsService.getRequestById(requestId);

  if (!this.request) {
    this.router.navigate(['/requests']);
    return;
  }

  // 🆕 מעבר אוטומטי ל"בבדיקה"
  if (this.currentRole === 'employee' && this.request.status === 'הוגש') {
    this.paymentRequestsService.markAsInReview(this.request.id);
    this.request = this.paymentRequestsService.getRequestById(this.request.id);
  }

  this.reviewNote = this.request?.reviewNote || '';
}

  getDaysOpen(submittedAt: string): number {
    return this.paymentRequestsService.getDaysOpen(submittedAt);
  }

  getSlaState(submittedAt: string): SlaState {
    return this.paymentRequestsService.getSlaState(submittedAt);
  }

 approve(): void {
  if (!this.request || this.request.status === 'אושר לתשלום') {
    return;
  }

  this.paymentRequestsService.updateRequestStatus(
    this.request.id,
    'אושר לתשלום',
    this.reviewNote
  );

  alert('הבקשה אושרה לתשלום');
  this.router.navigate(['/requests']);
}

 reject(): void {
  if (!this.request || this.request.status === 'אושר לתשלום') {
    return;
  }

  this.paymentRequestsService.updateRequestStatus(
    this.request.id,
    'נדחה',
    this.reviewNote
  );

  alert('הבקשה נדחתה');
  this.router.navigate(['/requests']);
}

 requestClarification(): void {
  if (!this.request || this.request.status === 'אושר לתשלום') {
    return;
  }

  this.paymentRequestsService.updateRequestStatus(
    this.request.id,
    'ממתין להבהרות',
    this.reviewNote
  );

  alert('נשלחה בקשת הבהרה');
  this.router.navigate(['/requests']);
}

  goBack(): void {
    this.router.navigate(['/requests']);
  }

  editDraft(): void {
    if (!this.request || this.request.status !== 'טיוטה') {
      return;
    }
    // ניתוב לעמוד עריכה של בקשה עם ID
    this.router.navigate(['/requests/edit', this.request.id]);
  }
}