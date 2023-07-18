import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IStage } from 'src/app/models/stage';
import { EditStageModalComponent } from '../edit-stage-modal/edit-stage-modal.component';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-stage-tile',
  templateUrl: './stage-tile.component.html',
  styleUrls: ['./stage-tile.component.scss'],
})
export class StageTileComponent {
  @Input() stage: IStage;
  @Input() isHighlighted = false;
  @Output() pointNextBlock = new EventEmitter<string>();
  @Output() deleteStage = new EventEmitter<string>();

  constructor(private appService: AppService, private modalService: NgbModal) {
    this.stage = {
      name: 'no action',
      actions: [],
    };
  }

  showNextBlock(nextBlockName: string) {
    this.pointNextBlock.emit(nextBlockName);
  }

  onDelete() {
    this.deleteStage.emit(this.stage.name);
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
    });
  }
}
