import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlaBadgeComponent } from './sla-badge.component';

describe('SlaBadgeComponent', () => {
  let component: SlaBadgeComponent;
  let fixture: ComponentFixture<SlaBadgeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlaBadgeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SlaBadgeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
