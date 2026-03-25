import { RequestStatus } from './request-status.type';

export type UrgencyLevel = 'נמוכה' | 'בינונית' | 'גבוהה';

export interface RequestAttachment {
  fileName: string;
  fileUrl: string;
}

export interface PaymentRequest {
  id: number;
  requestNumber: string;
  consultantName: string;
  consultantId: string;
  title: string;
  description: string;
  amount: number;
  project: string;
  unit: string;
  executionDate: string;
  submittedAt: string;
  urgency: UrgencyLevel;
  status: RequestStatus;
  lastUpdatedAt: string;
  reviewNote?: string;
  attachments: RequestAttachment[];
}