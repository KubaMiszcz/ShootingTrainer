import { Component, Input } from '@angular/core';
import { IAction } from 'src/app/models/action';

@Component({
  selector: 'app-action-tile',
  templateUrl: './action-tile.component.html',
  styleUrls: ['./action-tile.component.scss'],
})
export class ActionTileComponent {
  @Input() action: IAction | null;

  constructor() {
    this.action = {
      name: 'no action',
      audioFileName:''
    };
  }
}
