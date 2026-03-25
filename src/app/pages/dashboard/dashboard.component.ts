import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PaymentRequest } from '../../models/payment-request.model';
import { PaymentRequestsService } from '../../services/payment-requests.service';
import { RoleService } from '../../services/role.service';
import { UserRole } from '../../models/user-role.type';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  currentRole: UserRole = 'consultant';

  summary = {
    totalRequests: 0,
    activeRequests: 0,
    inReviewCount: 0,
    waitingClarificationCount: 0,
    approvedCount: 0,
    slaBreachedCount: 0,
    stuckCount: 0
  };

  statusChartData: { label: string; value: number }[] = [];
  slaChartData: { label: string; value: number }[] = [];
  attentionRequests: PaymentRequest[] = [];

  constructor(
    private paymentRequestsService: PaymentRequestsService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentRole = this.roleService.getCurrentRole();

    if (this.currentRole === 'employee') {
      this.loadDashboardData();
    }
  }

  loadDashboardData(): void {
    this.summary = this.paymentRequestsService.getDashboardSummary();
    this.statusChartData = this.paymentRequestsService.getStatusChartData();
    this.slaChartData = this.paymentRequestsService.getSlaChartData();
    this.attentionRequests = this.paymentRequestsService.getAttentionRequests();
  }

  getDaysOpen(submittedAt: string): number {
    return this.paymentRequestsService.getDaysOpen(submittedAt);
  }

  getSlaState(submittedAt: string): 'תקין' | 'אזהרה' | 'חריגה' {
    return this.paymentRequestsService.getSlaState(submittedAt);
  }

  isStuck(lastUpdatedAt: string, status: string): boolean {
    return this.paymentRequestsService.isStuck(lastUpdatedAt, status);
  }

  getMaxValue(data: { label: string; value: number }[]): number {
    if (!data.length) {
      return 1;
    }

    const max = Math.max(...data.map(item => item.value));
    return max === 0 ? 1 : max;
  }

  getBarWidth(value: number, data: { label: string; value: number }[]): string {
    const max = this.getMaxValue(data);
    return `${(value / max) * 100}%`;
  }

  openRequest(id: number): void {
    this.router.navigate(['/requests', id]);
  }

  goBack(): void {
    this.router.navigate(['/requests']);
  }
}