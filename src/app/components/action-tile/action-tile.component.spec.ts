import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionTileComponent } from './action-tile.component';

describe('ActionTileComponent', () => {
  let component: ActionTileComponent;
  let fixture: ComponentFixture<ActionTileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ActionTileComponent]
    });
    fixture = TestBed.createComponent(ActionTileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
