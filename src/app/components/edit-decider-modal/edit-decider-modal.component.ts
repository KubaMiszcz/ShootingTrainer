import { AppService } from 'src/app/services/app.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDecider } from 'src/app/models/decider';
import { IBlock } from 'src/app/models/block';
import * as _ from 'lodash';


@Component({
  selector: 'app-edit-decider-modal',
  templateUrl: './edit-decider-modal.component.html',
  styleUrls: ['./edit-decider-modal.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)',
  },
})
export class EditDeciderModalComponent implements OnInit {
  decider: IDecider;
  @Output() result: EventEmitter<IDecider> = new EventEmitter();
  deciderName = '';
  audioFileName = '';
  allBlocks: IBlock[] = [];

  constructor(
    private appService: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.decider = {
      name: '',
      audioFileName: '',
      positiveChance: 0.5,
    };
  }

  ngOnInit(): void {
    this.deciderName = this.decider.name;

    this.allBlocks = this.appService.getArraySortedByName(
      this.appService.getAllBlocks()
    );

    _.remove(this.allBlocks, this.decider);
  }

  save() {
    this.decider.audioFileName = _.last(this.audioFileName.split('\\')) ?? '';
    this.result.emit(this.decider);
    this.activeModal.close();
  }

  changeNextStep(block: IBlock) {
    // this.stage.nextBlock = block;
  }

  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code === 'Enter') {
      this.save();
    }
  }

  // deciderSuffix(block: IBlock) {
  //   return this.appService.getDeciderNameSuffix(block);
  // }
}
