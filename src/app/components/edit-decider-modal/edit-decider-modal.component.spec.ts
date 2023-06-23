import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDeciderModalComponent } from './edit-decider-modal.component';

describe('EditDeciderModalComponent', () => {
  let component: EditDeciderModalComponent;
  let fixture: ComponentFixture<EditDeciderModalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditDeciderModalComponent]
    });
    fixture = TestBed.createComponent(EditDeciderModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
