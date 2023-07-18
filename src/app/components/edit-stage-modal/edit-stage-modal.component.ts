import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IStage } from 'src/app/models/stage';

@Component({
  selector: 'app-edit-stage-modal',
  templateUrl: './edit-stage-modal.component.html',
  styleUrls: ['./edit-stage-modal.component.scss']
})
export class EditStageModalComponent {
  @Input() stage: IStage;
  @Output() result: EventEmitter<IStage> = new EventEmitter();
  stageName= '';

  constructor(public activeModal: NgbActiveModal) {
    this.stage = { name: '', actions: [] };
  }
  ngOnInit(): void {
    this.stageName = this.stage.name;
  }

  save() {
    this.result.emit(this.stage);
    this.activeModal.close();
  }
}
