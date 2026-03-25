import { Injectable } from '@angular/core';
import { PaymentRequest } from '../models/payment-request.model';
import { UserRole } from '../models/user-role.type';

export type SlaState = 'תקין' | 'אזהרה' | 'חריגה';

@Injectable({
  providedIn: 'root'
})
export class PaymentRequestsService {
  private requests: PaymentRequest[] = [];
  private readonly STORAGE_KEY = 'payment_requests';

  constructor() {
    this.initializeRequests();
  }

  // טעינת נתונים מ-localStorage או משימוש בנתונים ברירת מחדל
  private initializeRequests(): void {
    const storedRequests = localStorage.getItem(this.STORAGE_KEY);
    
    if (storedRequests) {
      try {
        this.requests = JSON.parse(storedRequests);
        // נקוי blob URLs שהופכים ללא תקפים אחרי reload
        // וממיר קבצים בפורמט ישן (string) לפורמט חדש (object)
        this.requests.forEach(request => {
          request.attachments = request.attachments.map((attachment: any) => {
            if (typeof attachment === 'string') {
              // פורמט ישן: string בלבד
              return {
                fileName: attachment,
                fileUrl: ''
              };
            } else {
              // פורמט חדש: object עם fileName ו-fileUrl
              return {
                fileName: attachment.fileName || '',
                fileUrl: '' // blob URLs לא יכולים להיות תקפים אחרי reload
              };
            }
          });
        });
      } catch (error) {
        console.error('Error loading requests from localStorage:', error);
        this.loadDefaultRequests();
      }
    } else {
      this.loadDefaultRequests();
    }
  }

  // נתונים ברירת מחדל
  private loadDefaultRequests(): void {
    this.requests = [
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
       attachments: [
  {
    fileName: 'invoice-001.pdf',
    fileUrl: ''
  },
  {
    fileName: 'summary.docx',
    fileUrl: ''
  }
]
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
       attachments: [
  {
    fileName: 'gis-spec.pdf',
    fileUrl: ''
  }
]
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
   attachments: [
  {
    fileName: 'budget-report.xlsx',
    fileUrl: ''
  }
]



        
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
   attachments: [
  {
    fileName: 'archive-plan.pdf',
    fileUrl: ''
  },
  {
    fileName: 'hours.xlsx',
    fileUrl: ''
  }
]

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
        status: 'בבדיקה',
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
          attachments: [
  {
    fileName: 'requirements.pdf',
    fileUrl: ''
  }
]
      },
       {
        id: 7,
        requestNumber: 'DR-2026-007',
        consultantName: 'יעל כהן',
        consultantId: 'C007',
        title: 'ייעוץ תכנון לרבעון שני',
        description: 'ליווי מקצועי והכנת מסמכי תכנון לרבעון השני',
        amount: 12500,
        project: 'פרויקט התחדשות עירונית',
        unit: 'אגף תכנון',
        executionDate: '2026-01-10',
        submittedAt: '2026-02-20',
        urgency: 'בינונית',
        status: 'הוגש',
        lastUpdatedAt: '2026-02-20',
        reviewNote: '',
       attachments: [
  {
    fileName: 'invoice-001.pdf',
    fileUrl: ''
  },
  {
    fileName: 'summary.docx',
    fileUrl: ''
  }
]
      }
    ];
    this.saveToLocalStorage();
  }

  // שמירה ל-localStorage
  private saveToLocalStorage(): void {
    try {
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.requests));
    } catch (error) {
      console.error('Error saving requests to localStorage:', error);
    }
  }

  getRequests(): PaymentRequest[] {
    return this.requests;
  }

  getVisibleRequests(role: UserRole, consultantId: string = 'C001'): PaymentRequest[] {
    if (role === 'employee') {
      // עובד ארגון לא רואה טיוטות
      return this.requests.filter(request => request.status !== 'טיוטה');
    }

    // יועץ רואה את הבקשות שלו כולל טיוטות
    return this.requests.filter(request => request.consultantId === consultantId);
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

  isStuck(lastUpdatedAt: string, status?: string): boolean {
    // בקשות שאושרו לתשלום לא נחשבות תקועות
    if (status === 'אושר לתשלום') {
      return false;
    }
    
    return this.getDaysSinceLastUpdate(lastUpdatedAt) >= 14;
  }


  createRequest(
  formValue: any,
  status: 'טיוטה' | 'הוגש',
  attachments: { fileName: string; fileUrl: string }[]
): void  {
    const nextId = this.requests.length
      ? Math.max(...this.requests.map(request => request.id)) + 1
      : 1;

    const today = new Date().toISOString().split('T')[0];

    const newRequest: PaymentRequest = {
      id: nextId,
      requestNumber: `DR-2026-${String(nextId).padStart(3, '0')}`,
      consultantName: 'יעל כהן',
      consultantId: 'C001',
      title: formValue.title,
      description: formValue.description,
      amount: Number(formValue.amount),
      project: formValue.project,
      unit: formValue.unit,
      executionDate: formValue.executionDate,
      submittedAt: today,
      urgency: formValue.urgency,
      status: status,
      lastUpdatedAt: today,
      reviewNote: formValue.notes || '',
      attachments: attachments.map(attachment => ({
        fileName: attachment.fileName,
        fileUrl: attachment.fileUrl  // שומר blob URL זמני לsession זה
      }))
    };

    this.requests.unshift(newRequest);
    this.saveToLocalStorage();
  }


getRequestById(id: number): PaymentRequest | undefined {
  return this.requests.find(request => request.id === id);
}

updateRequestStatus(
  id: number,
  status: 'אושר לתשלום' | 'נדחה' | 'ממתין להבהרות',
  note: string
): void {
  const request = this.requests.find(item => item.id === id);

  if (!request) {
    return;
  }

  //  מניעת שינוי אם כבר אושר לתשלום
  if (request.status === 'אושר לתשלום') {
    console.warn('לא ניתן לשנות סטטוס לבקשה שאושרה לתשלום');
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  request.status = status;
  request.lastUpdatedAt = today;
  request.reviewNote = note || '';
  
  // שמירה ל-localStorage
  this.saveToLocalStorage();
}


markAsInReview(id: number): void {
  const request = this.requests.find(item => item.id === id);

  if (!request) {
    return;
  }

  // מעדכנים רק אם הבקשה הוגשה ועדיין לא התחיל טיפול
  if (request.status !== 'הוגש') {
    return;
  }

  const today = new Date().toISOString().split('T')[0];

  request.status = 'בבדיקה';
  request.lastUpdatedAt = today;
    this.saveToLocalStorage();
}


  // מחיקת בקשה מה-list ושמירה ל-localStorage
  deleteRequest(id: number): void {
    this.requests = this.requests.filter(request => request.id !== id);
    this.saveToLocalStorage();
  }

  // איפוס הנתונים לברירת מחדל
  resetToDefaults(): void {
    localStorage.removeItem(this.STORAGE_KEY);
    this.loadDefaultRequests();
  }

  // עדכון בקשה בסטטוס טיוטה (עם אפשרות לשינוי סטטוס)
  updateDraftRequest(id: number, updatedData: Partial<PaymentRequest>): void {
    const request = this.requests.find(item => item.id === id);

    if (!request || request.status !== 'טיוטה') {
      console.warn('לא ניתן לערוך בקשה שאינה בסטטוס טיוטה');
      return;
    }


    

    // עדכון הנתונים וגם אפשרות לשינוי סטטוס
    Object.assign(request, {
      ...updatedData,
      lastUpdatedAt: new Date().toISOString().split('T')[0]
    });

    this.saveToLocalStorage();
  }

getDashboardRequests(): PaymentRequest[] {
  // עובד ארגון לא רואה טיוטות, ולכן גם הדשבורד לא יציג אותן
  return this.requests.filter(request => request.status !== 'טיוטה');
}

getDashboardSummary() {
  const requests = this.getDashboardRequests();

  const activeRequests = requests.filter(
    request => request.status !== 'אושר לתשלום' && request.status !== 'נדחה'
  ).length;

  const inReviewCount = requests.filter(
    request => request.status === 'בבדיקה'
  ).length;

  const waitingClarificationCount = requests.filter(
    request => request.status === 'ממתין להבהרות'
  ).length;

  const approvedCount = requests.filter(
    request => request.status === 'אושר לתשלום'
  ).length;

  const slaBreachedCount = requests.filter(
    request => this.getSlaState(request.submittedAt) === 'חריגה'
  ).length;

  const stuckCount = requests.filter(
    request => this.isStuck(request.lastUpdatedAt, request.status)
  ).length;

  return {
    totalRequests: requests.length,
    activeRequests,
    inReviewCount,
    waitingClarificationCount,
    approvedCount,
    slaBreachedCount,
    stuckCount
  };
}

getStatusChartData() {
  const requests = this.getDashboardRequests();

  return [
    {
      label: 'הוגש',
      value: requests.filter(request => request.status === 'הוגש').length
    },
    {
      label: 'בבדיקה',
      value: requests.filter(request => request.status === 'בבדיקה').length
    },
    {
      label: 'ממתין להבהרות',
      value: requests.filter(request => request.status === 'ממתין להבהרות').length
    },
    {
      label: 'אושר לתשלום',
      value: requests.filter(request => request.status === 'אושר לתשלום').length
    },
    {
      label: 'נדחה',
      value: requests.filter(request => request.status === 'נדחה').length
    }
  ];
}

getSlaChartData() {
  const requests = this.getDashboardRequests();

  return [
    {
      label: 'תקין',
      value: requests.filter(request => this.getSlaState(request.submittedAt) === 'תקין').length
    },
    {
      label: 'אזהרה',
      value: requests.filter(request => this.getSlaState(request.submittedAt) === 'אזהרה').length
    },
    {
      label: 'חריגה',
      value: requests.filter(request => this.getSlaState(request.submittedAt) === 'חריגה').length
    }
  ];
}

getAttentionRequests(): PaymentRequest[] {
  const requests = this.getDashboardRequests();

  return requests
    .filter(request =>
      this.getSlaState(request.submittedAt) === 'חריגה' ||
      this.isStuck(request.lastUpdatedAt, request.status)
    )
    .sort((a, b) => this.getDaysOpen(b.submittedAt) - this.getDaysOpen(a.submittedAt))
    .slice(0, 6);
}

}