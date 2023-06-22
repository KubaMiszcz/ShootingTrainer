import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeciderComponent } from './decider.component';

describe('DeciderComponent', () => {
  let component: DeciderComponent;
  let fixture: ComponentFixture<DeciderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeciderComponent]
    });
    fixture = TestBed.createComponent(DeciderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
