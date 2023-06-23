import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IStage } from 'src/app/models/stage';

@Component({
  selector: 'app-stage-tile',
  templateUrl: './stage-tile.component.html',
  styleUrls: ['./stage-tile.component.scss'],
})
export class StageTileComponent {
  @Input() stage: IStage;
  @Input() isHighlighted = false;
  @Output() pointNextBlock = new EventEmitter<string>();

  constructor() {
    this.stage = {
      name: 'no action',
      actions: [],
    };
  }

  showNextBlock(nextBlockName: string) {
    this.pointNextBlock.emit(nextBlockName);
  }
}
