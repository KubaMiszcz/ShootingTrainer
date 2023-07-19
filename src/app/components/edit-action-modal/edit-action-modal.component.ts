import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/action';
import * as _ from 'lodash'; 

@Component({
  selector: 'app-edit-action-modal',
  templateUrl: './edit-action-modal.component.html',
  styleUrls: ['./edit-action-modal.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class EditActionModalComponent implements OnInit {
  @Input() action: IAction;
  @Output() result: EventEmitter<IAction> = new EventEmitter();
  actionName = '';
  audioFileName = '';


  constructor(public activeModal: NgbActiveModal) {
    this.action = { name: '', audioFileName: '' };
  }

  ngOnInit(): void {
    this.actionName = this.action.name;
  }

  save() {
    this.action.audioFileName = _.last(this.audioFileName.split('\\')) ?? '';
    this.result.emit(this.action);
    this.activeModal.close();
  }

  updateIsDisabled(){
    this.action.isDisabled=!this.action.isDisabled
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.save();
    }
  }
}

