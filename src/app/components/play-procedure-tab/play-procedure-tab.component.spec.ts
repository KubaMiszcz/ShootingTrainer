import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayProcedureTabComponent } from './play-procedure-tab.component';

describe('PlayProcedureTabComponent', () => {
  let component: PlayProcedureTabComponent;
  let fixture: ComponentFixture<PlayProcedureTabComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PlayProcedureTabComponent]
    });
    fixture = TestBed.createComponent(PlayProcedureTabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
