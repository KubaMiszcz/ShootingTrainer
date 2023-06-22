import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/action';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-edit-action-modal',
  templateUrl: './edit-action-modal.component.html',
  styleUrls: ['./edit-action-modal.component.scss'],
})
export class EditActionModalComponent {
  @Input() action: IAction;
  @Output() result: EventEmitter<IAction> = new EventEmitter();
  actionName = '';
  audioFileName='';

  constructor(public activeModal: NgbActiveModal) {
    this.action = { name: 'aa', audioFileName: '' };
  }

  saveAction() {
    this.action.audioFileName = _.last(this.audioFileName.split('\\')) ?? '';
    this.result.emit(this.action);
    this.activeModal.close();
  }
}

