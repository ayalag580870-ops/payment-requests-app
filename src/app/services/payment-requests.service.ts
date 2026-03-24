import { Injectable } from '@angular/core';
import { PaymentRequest } from '../models/payment-request.model';
import { UserRole } from '../models/user-role.type';

export type SlaState = 'תקין' | 'אזהרה' | 'חריגה';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestsService {
  private requests: PaymentRequest[] = [
    {
      id: 1,
      requestNumber: 'DR-2026-001',
      consultantName: 'יעל כהן',
      consultantId: 'C001',
      title: 'ייעוץ תכנון לרבעון ראשון',
      description: 'ליווי מקצועי והכנת מסמכי תכנון לרבעון הראשון',
      amount: 12500,
      project: 'פרויקט התחדשות עירונית',
      unit: 'אגף תכנון',
      executionDate: '2025-12-15',
      submittedAt: '2025-12-20',
      urgency: 'גבוהה',
      status: 'בבדיקה',
      lastUpdatedAt: '2026-03-05',
      reviewNote: 'ממתין לבדיקה מקצועית',
      attachments: ['invoice-001.pdf', 'summary.docx']
    },
    {
      id: 2,
      requestNumber: 'DR-2026-002',
      consultantName: 'יעל כהן',
      consultantId: 'C001',
      title: 'הכנת מסמך אפיון GIS',
      description: 'אפיון ראשוני לממשקי מערכת GIS',
      amount: 8400,
      project: 'פרויקט GIS ארגוני',
      unit: 'אגף מערכות מידע',
      executionDate: '2026-01-10',
      submittedAt: '2026-01-18',
      urgency: 'בינונית',
      status: 'ממתין להבהרות',
      lastUpdatedAt: '2026-03-20',
      reviewNote: 'נדרש פירוט שעות עבודה',
      attachments: ['gis-spec.pdf']
    },
    {
      id: 3,
      requestNumber: 'DR-2026-003',
      consultantName: 'דנה לוי',
      consultantId: 'C002',
      title: 'בקרת תקציב חודשית',
      description: 'ביצוע בקרת תקציב חודשית והצגת חריגות',
      amount: 6100,
      project: 'פרויקט בקרה תקציבית',
      unit: 'אגף כספים',
      executionDate: '2026-02-01',
      submittedAt: '2026-02-03',
      urgency: 'נמוכה',
      status: 'אושר לתשלום',
      lastUpdatedAt: '2026-02-18',
      reviewNote: 'אושר והועבר להמשך טיפול',
      attachments: ['budget-report.xlsx']
    },
    {
      id: 4,
      requestNumber: 'DR-2026-004',
      consultantName: 'אורי שלום',
      consultantId: 'C003',
      title: 'ליווי פרויקט ארכיב',
      description: 'ליווי שוטף של אפיון ותכנון ארכיב דיגיטלי',
      amount: 15900,
      project: 'פרויקט ארכיב דיגיטלי',
      unit: 'אגף פרויקטים',
      executionDate: '2025-10-01',
      submittedAt: '2025-10-10',
      urgency: 'גבוהה',
      status: 'בבדיקה',
      lastUpdatedAt: '2026-02-20',
      reviewNote: 'הבקשה נמצאת בבדיקה ממושכת',
      attachments: ['archive-plan.pdf', 'hours.xlsx']
    },
    {
      id: 5,
      requestNumber: 'DR-2026-005',
      consultantName: 'יעל כהן',
      consultantId: 'C001',
      title: 'עדכון תוכנית עבודה',
      description: 'עדכון תוכנית עבודה עבור שלב ב׳ בפרויקט',
      amount: 4700,
      project: 'פרויקט התחדשות עירונית',
      unit: 'אגף תכנון',
      executionDate: '2026-02-11',
      submittedAt: '2026-02-13',
      urgency: 'נמוכה',
      status: 'טיוטה',
      lastUpdatedAt: '2026-02-13',
      attachments: []
    },
    {
      id: 6,
      requestNumber: 'DR-2026-006',
      consultantName: 'דנה לוי',
      consultantId: 'C002',
      title: 'ניתוח צרכים למערכת חדשה',
      description: 'איסוף דרישות וניתוח צרכים מול בעלי עניין',
      amount: 9800,
      project: 'פרויקט GIS ארגוני',
      unit: 'אגף מערכות מידע',
      executionDate: '2025-11-20',
      submittedAt: '2025-11-28',
      urgency: 'בינונית',
      status: 'נדחה',
      lastUpdatedAt: '2026-01-10',
      reviewNote: 'הבקשה נדחתה עקב חוסר במסמך מאשר',
      attachments: ['requirements.pdf']
    }
  ];

  getRequests(): PaymentRequest[] {
    return this.requests;
  }

  getVisibleRequests(role: UserRole, consultantId: string = 'C001'): PaymentRequest[] {
    if (role === 'employee') {
      return this.requests;
    }

    return this.requests.filter(function (request) {
      return request.consultantId === consultantId;
    });
  }

  getDaysOpen(submittedAt: string): number {
    const submitted = new Date(submittedAt);
    const today = new Date();
    const diffMs = today.getTime() - submitted.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  getDaysSinceLastUpdate(lastUpdatedAt: string): number {
    const updated = new Date(lastUpdatedAt);
    const today = new Date();
    const diffMs = today.getTime() - updated.getTime();
    return Math.floor(diffMs / (1000 * 60 * 60 * 24));
  }

  getSlaState(submittedAt: string): SlaState {
    const daysOpen = this.getDaysOpen(submittedAt);

    if (daysOpen >= 90) {
      return 'חריגה';
    }

    if (daysOpen >= 60) {
      return 'אזהרה';
    }

    return 'תקין';
  }

  isStuck(lastUpdatedAt: string): boolean {
    return this.getDaysSinceLastUpdate(lastUpdatedAt) >= 14;
  }
}