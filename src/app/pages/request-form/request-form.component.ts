import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { PaymentRequestsService } from '../../services/payment-requests.service';
import { PaymentRequest } from '../../models/payment-request.model';

@Component({
  selector: 'app-request-form',
  templateUrl: './request-form.component.html',
  styleUrls: ['./request-form.component.css']
})
export class RequestFormComponent implements OnInit {
  requestForm: FormGroup;
  selectedFiles: { fileName: string; fileUrl: string }[] = [];
  maxDate: string;
  editingRequestId: number | null = null;
  editingRequest: PaymentRequest | null = null;

  units: string[] = [
    'אגף תכנון',
    'אגף כספים',
    'אגף מערכות מידע',
    'אגף פרויקטים'
  ];

  projects: string[] = [
    'פרויקט התחדשות עירונית',
    'פרויקט GIS ארגוני',
    'פרויקט ארכיב דיגיטלי',
    'פרויקט בקרה תקציבית'
  ];

  urgencies: string[] = ['נמוכה', 'בינונית', 'גבוהה'];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private paymentRequestsService: PaymentRequestsService
  ) {
    // חשב את תאריך היום בפורמט YYYY-MM-DD
    const today = new Date();
    this.maxDate = today.toISOString().split('T')[0];

    this.requestForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      amount: ['', [Validators.required, Validators.min(1)]],
      executionDate: ['', [Validators.required, this.pastDateValidator.bind(this)]],
      urgency: ['', Validators.required],
      unit: ['', Validators.required],
      project: ['', Validators.required],
      notes: ['']
    });
  }

  ngOnInit(): void {
    // בדוק אם אנחנו בעריכה של טיוטה הקיימת
    const idParam = this.route.snapshot.paramMap.get('id');
    if (idParam) {
      this.editingRequestId = Number(idParam);
      const request = this.paymentRequestsService.getRequestById(this.editingRequestId);
      
      if (request && request.status === 'טיוטה') {
        this.editingRequest = request;
        this.loadRequestDataToForm(request);
        this.selectedFiles = request.attachments;
      } else {
        // אם הבקשה לא קיימת או לא בסטטוס טיוטה, חזור לרשימה
        this.router.navigate(['/requests']);
      }
    }
  }

  // טוען את הנתונים של הבקשה לתוך הפורם
  loadRequestDataToForm(request: PaymentRequest): void {
    this.requestForm.patchValue({
      title: request.title,
      description: request.description,
      amount: request.amount,
      executionDate: request.executionDate,
      urgency: request.urgency,
      unit: request.unit,
      project: request.project,
      notes: request.reviewNote || ''
    });
  }

  // validator לבדיקה שהתאריך לא עתידי
  pastDateValidator(control: AbstractControl): ValidationErrors | null {
    if (!control.value) {
      return null;
    }

    const selectedDate = new Date(control.value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    selectedDate.setHours(0, 0, 0, 0);

    if (selectedDate > today) {
      return { futureDate: true };
    }

    return null;
  }

  onFileSelected(event: Event): void {
  const input = event.target as HTMLInputElement;

  if (!input.files || input.files.length === 0) {
    return;
  }

  this.selectedFiles = Array.from(input.files).map(file => ({
    fileName: file.name,
    fileUrl: URL.createObjectURL(file)
  }));
}

  saveAsDraft(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    if (this.editingRequestId) {
      // עריכה של טיוטה קיימת
      this.paymentRequestsService.updateDraftRequest(
        this.editingRequestId,
        {
          title: this.requestForm.value.title,
          description: this.requestForm.value.description,
          amount: this.requestForm.value.amount,
          executionDate: this.requestForm.value.executionDate,
          urgency: this.requestForm.value.urgency,
          unit: this.requestForm.value.unit,
          project: this.requestForm.value.project,
          reviewNote: this.requestForm.value.notes,
          attachments: this.selectedFiles
        }
      );
      alert('הטיוטה עודכנה בהצלחה');
    } else {
      // יצירת בקשה חדשה
      this.paymentRequestsService.createRequest(
        this.requestForm.value,
        'טיוטה',
        this.selectedFiles
      );
      alert('הבקשה נשמרה כטיוטה');
    }

    this.router.navigate(['/requests']);
  }

  submitForReview(): void {
    if (this.requestForm.invalid) {
      this.requestForm.markAllAsTouched();
      return;
    }

    if (this.editingRequestId) {
      // עדכון הטיוטה וושינוי הסטטוס ל"הוגש"
      this.paymentRequestsService.updateDraftRequest(
        this.editingRequestId,
        {
          title: this.requestForm.value.title,
          description: this.requestForm.value.description,
          amount: this.requestForm.value.amount,
          executionDate: this.requestForm.value.executionDate,
          urgency: this.requestForm.value.urgency,
          unit: this.requestForm.value.unit,
          project: this.requestForm.value.project,
          reviewNote: this.requestForm.value.notes,
          attachments: this.selectedFiles,
          status: 'הוגש'
        }
      );
      alert('הטיוטה נשלחה לבדיקה');
    } else {
      // יצירת בקשה חדשה בסטטוס הוגש
      this.paymentRequestsService.createRequest(
        this.requestForm.value,
        'הוגש',
        this.selectedFiles
      );
      alert('הבקשה נשלחה לבדיקה');
    }

    this.router.navigate(['/requests']);
  }

  cancel(): void {
    this.router.navigate(['/requests']);
  }

  get title() {
    return this.requestForm.get('title');
  }

  get description() {
    return this.requestForm.get('description');
  }

  get amount() {
    return this.requestForm.get('amount');
  }

  get executionDate() {
    return this.requestForm.get('executionDate');
  }

  get urgency() {
    return this.requestForm.get('urgency');
  }

  get unit() {
    return this.requestForm.get('unit');
  }

  get project() {
    return this.requestForm.get('project');
  }
}