import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStage } from 'src/app/models/stage';
import { EditStageModalComponent } from '../edit-stage-modal/edit-stage-modal.component';
import { AppService } from 'src/app/services/app.service';
import { ORDER_DIRECTION } from 'src/app/models/enums';
import { IAction } from 'src/app/models/action';
import { IBlock } from 'src/app/models/block';

@Component({
  selector: 'app-stage-tile',
  templateUrl: './stage-tile.component.html',
  styleUrls: ['./stage-tile.component.scss'],
})
export class StageTileComponent {
  @Input() stage: IStage;
  @Input() isHighlighted = false;
  @Output() pointNextBlock = new EventEmitter<string>();
  ORDER_DIRECTION = ORDER_DIRECTION;
  allBlocks: IBlock[] = [];

  constructor(private appService: AppService, private modalService: NgbModal) {
    this.stage = {
      name: 'no action',
      actions: [],
    };

    this.allBlocks = appService.getArraySortedByName(
      this.appService.getAllBlocks()
    );
  }

  showNextBlock(block: IStage) {
    this.pointNextBlock.emit(block?.nextBlock?.name);
  }

  onDelete() {
    this.appService.deleteBlock(this.stage);
  }

  onEdit() {
    console.log(this.stage.name);
    const modalRef = this.modalService.open(EditStageModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.stage = this.appService.deepCopy(this.stage);
    modalRef.componentInstance.result.subscribe((updatedStage: IStage) => {
      this.stage.name = updatedStage.name;
      this.stage.actions = updatedStage.actions;
      this.stage.nextBlock = updatedStage.nextBlock;
    });
  }

  reorderAction(action: IAction, direction: ORDER_DIRECTION) {
    this.appService.reorderAction(this.stage, action, direction);
  }

  deciderSuffix(block: IBlock) {
    return this.appService.getDeciderNameSuffix(block);
  }

  changeNextStep(block: IBlock) {
    this.stage.nextBlock = block;
  }
}
