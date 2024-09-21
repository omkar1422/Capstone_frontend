import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageNotificationsComponent } from './manage-notifications.component';

describe('ManageNotificationsComponent', () => {
  let component: ManageNotificationsComponent;
  let fixture: ComponentFixture<ManageNotificationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageNotificationsComponent]
    });
    fixture = TestBed.createComponent(ManageNotificationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
