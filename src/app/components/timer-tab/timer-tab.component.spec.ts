import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TimerTabComponent } from './timer-tab.component';

describe('TimerTabComponent', () => {
  let component: TimerTabComponent;
  let fixture: ComponentFixture<TimerTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TimerTabComponent]
    });
    fixture = TestBed.createComponent(TimerTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
