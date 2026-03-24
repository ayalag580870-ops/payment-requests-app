import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoleSwitchComponent } from './role-switch.component';

describe('RoleSwitchComponent', () => {
  let component: RoleSwitchComponent;
  let fixture: ComponentFixture<RoleSwitchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RoleSwitchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoleSwitchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
