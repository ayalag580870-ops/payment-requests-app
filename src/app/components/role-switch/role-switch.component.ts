
import { Component, EventEmitter, Output } from '@angular/core';
import { RoleService } from '../../services/role.service';
import { UserRole } from '../../models/user-role.type';

@Component({
  selector: 'app-role-switch',
  templateUrl: './role-switch.component.html',
  styleUrls: ['./role-switch.component.css']
})
export class RoleSwitchComponent {
  @Output() roleChanged = new EventEmitter<void>();

  constructor(private roleService: RoleService) {}

  get currentRole(): UserRole {
    return this.roleService.getCurrentRole();
  }

  setRole(role: UserRole): void {
    this.roleService.setRole(role);
    this.roleChanged.emit();
  }
}