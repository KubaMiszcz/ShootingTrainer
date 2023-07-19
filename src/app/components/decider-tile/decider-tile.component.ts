import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDecider } from 'src/app/models/decider';
import { EditDeciderModalComponent } from '../edit-decider-modal/edit-decider-modal.component';
import { AppService } from 'src/app/services/app.service';
import { IBlock } from 'src/app/models/block';

@Component({
  selector: 'app-decider-tile',
  templateUrl: './decider-tile.component.html',
  styleUrls: ['./decider-tile.component.scss'],
})
export class DeciderTileComponent {
  @Input() decider: IDecider;
  @Input() isHighlighted = false;
  @Output() pointNextBlock = new EventEmitter<string>();
  allBlocks: IBlock[] = [];
  
  constructor(private appService: AppService, private modalService: NgbModal) {
    this.decider = {
      name: '',
      audioFileName: '',
      positiveBlockName: '',
      negativeBlockName: '',
      positiveChance: 0.5,
    };

    this.allBlocks = appService.getArraySortedByName(
      this.appService.getAllBlocks()
    );
  }

  showNextBlock(nextBlockName: string) {
    this.pointNextBlock.emit(nextBlockName);
  }

  edit(decider: IDecider) {
    console.log(decider.name);
    const modalRef = this.modalService.open(EditDeciderModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.decider = this.appService.deepCopy(decider);
    modalRef.componentInstance.result.subscribe((updatedDecider: IDecider) => {
      decider.name = updatedDecider.name;
      decider.description = updatedDecider.description;
      decider.audioFileName = updatedDecider.audioFileName;
      decider.positiveBlockName = updatedDecider.positiveBlockName;
      decider.negativeBlockName = updatedDecider.negativeBlockName;
      decider.positiveChance = updatedDecider.positiveChance;
      decider.delay_sec = updatedDecider.delay_sec;
    });
  }

  isDecider(block: IBlock) {
    return this.appService.getDeciderNameSuffix(block);
  }

  changeNextStep(block: IBlock) {
    // this.stage.nextBlockName = block.name;
  }

  onDelete() {
    this.appService.deleteBlock(this.decider);
  }
}
