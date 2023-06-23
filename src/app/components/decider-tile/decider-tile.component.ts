import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IDecider } from 'src/app/models/decider';

@Component({
  selector: 'app-decider-tile',
  templateUrl: './decider-tile.component.html',
  styleUrls: ['./decider-tile.component.scss'],
})
export class DeciderTileComponent {
  @Input() decider: IDecider;
  @Input() isHighlighted = false;
  @Output() pointNextBlock = new EventEmitter<string>();

  constructor() {
    this.decider = {
      name: 'no action',
      audioFileName: '',
      positiveBlockName: '',
      negativeBlockName: '',
      positiveChance: 0.5,
    };
  }

  showNextBlock(nextBlockName: string) {
    this.pointNextBlock.emit(nextBlockName);
  }
}
