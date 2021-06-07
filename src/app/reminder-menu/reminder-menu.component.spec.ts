import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReminderMenuComponent } from './reminder-menu.component';

describe('ReminderMenuComponent', () => {
  let component: ReminderMenuComponent;
  let fixture: ComponentFixture<ReminderMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReminderMenuComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReminderMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
