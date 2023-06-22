import { AppService } from 'src/app/services/app.service';
import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/action';
import { IStage } from 'src/app/models/stage';
import { EditActionModalComponent } from '../edit-action-modal/edit-action-modal.component';

@Component({
  selector: 'app-stage',
  templateUrl: './stage.component.html',
  styleUrls: ['./stage.component.scss'],
})
export class StageComponent {
  @Input() stage: IStage;

  constructor(private appService: AppService, private modalService: NgbModal) {
    this.stage = {
      name: 'no action',
      actions: [],
    };
  }

  editAction(action: IAction) {
    console.log(action.name);
    const modalRef = this.modalService.open(EditActionModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.action = this.appService.deepCopy(action);
    modalRef.componentInstance.result.subscribe((updatedAction: IAction) => {
      action.name = updatedAction.name;
      action.audioFileName = updatedAction.audioFileName;
      action.description = updatedAction.description;
      action.delay_sec = updatedAction.delay_sec;
    });
  }

  getDelay(action: IAction) {
    return action.delay_sec ?? 0;
  }
}
