import { IBlock } from './../../models/block';
import { AppService } from 'src/app/services/app.service';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IStage } from 'src/app/models/stage';
import { IAction } from 'src/app/models/action';
import * as _ from 'lodash';

@Component({
  selector: 'app-edit-stage-modal',
  templateUrl: './edit-stage-modal.component.html',
  styleUrls: ['./edit-stage-modal.component.scss'],
})
export class EditStageModalComponent {
  @Input() stage: IStage;
  @Output() result: EventEmitter<IStage> = new EventEmitter();
  stageName = '';
  allBlocks: IBlock[] = [];

  constructor(
    private appService: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.stage = { name: '', actions: [] };
    this.allBlocks = _.orderBy(this.appService.getAllBlocks(), 'name', 'asc');

  }

  ngOnInit(): void {
    this.stageName = this.stage.name;
  }

  save() {
    this.result.emit(this.stage);
    this.activeModal.close();
  }

  changeNextStep(block: IBlock) {
    this.stage.nextBlockName = block.name;
  }

  deleteAction(action: IAction) {
    let idx = this.stage.actions.findIndex((a) => a === action);
    this.appService.deleteItemFromArrayByIndex(this.stage.actions, idx);
  }

  appendNewAction() {
    this.appService.appendNewAction(this.stage);
  }
}
