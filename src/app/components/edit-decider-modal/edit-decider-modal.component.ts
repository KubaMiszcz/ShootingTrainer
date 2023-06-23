import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { IDecider } from 'src/app/models/decider';

@Component({
  selector: 'app-edit-decider-modal',
  templateUrl: './edit-decider-modal.component.html',
  styleUrls: ['./edit-decider-modal.component.scss'],
})
export class EditDeciderModalComponent {
  @Input() decider: IDecider;
  @Output() result: EventEmitter<IDecider> = new EventEmitter();
  deciderName = '';
  audioFileName = '';

  constructor(public activeModal: NgbActiveModal) {
    this.decider = {
      name: '',
      audioFileName: '',
      positiveBlockName: '',
      negativeBlockName: '',
      positiveChance: 0.5,
    };
  }

  save() {
    // this.decider.audioFileName = _.last(this.audioFileName.split('\\')) ?? '';
    // this.result.emit(this.decider);
    // this.activeModal.close();
  }
}
