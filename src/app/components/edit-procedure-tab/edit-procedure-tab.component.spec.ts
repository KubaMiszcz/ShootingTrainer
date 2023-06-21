import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditProcedureTabComponent } from './edit-procedure-tab.component';

describe('EditProcedureTabComponent', () => {
  let component: EditProcedureTabComponent;
  let fixture: ComponentFixture<EditProcedureTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditProcedureTabComponent]
    });
    fixture = TestBed.createComponent(EditProcedureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
