import { Injectable } from '@angular/core';
import { UserRole } from '../models/user-role.type';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private currentRoleValue: UserRole = 'consultant';

  getCurrentRole(): UserRole {
    return this.currentRoleValue;
  }

  setRole(role: UserRole): void {
    this.currentRoleValue = role;
  }

  toggleRole(): void {
    this.currentRoleValue =
      this.currentRoleValue === 'consultant' ? 'employee' : 'consultant';
  }
}