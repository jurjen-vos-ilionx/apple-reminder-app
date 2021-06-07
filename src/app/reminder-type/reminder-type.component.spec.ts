import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderTypeComponent } from './reminder-type.component';

describe('ReminderTypeComponent', () => {
  let component: ReminderTypeComponent;
  let fixture: ComponentFixture<ReminderTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
