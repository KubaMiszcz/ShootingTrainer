import { Component, Input } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/action';
import { AppService } from 'src/app/services/app.service';
import { EditActionModalComponent } from '../edit-action-modal/edit-action-modal.component';

@Component({
  selector: 'app-action-row',
  templateUrl: './action-row.component.html',
  styleUrls: ['./action-row.component.scss'],
})
export class ActionRowComponent {
  @Input() action: IAction;

  constructor(private appService: AppService, private modalService: NgbModal) {
    this.action={
      name:'',
      audioFileName:''
    }
  }

  edit(action: IAction) {
    console.log(action.name);
    const modalRef = this.modalService.open(EditActionModalComponent, {
      size: 'lg',
      centered: true,
    });
    modalRef.componentInstance.action = this.appService.deepCopy(action);
    modalRef.componentInstance.result.subscribe((updatedAction: IAction) => {
      action.name = updatedAction.name;
      action.description = updatedAction.description;
      action.audioFileName = updatedAction.audioFileName;
      action.delay_sec = updatedAction.delay_sec;
      action.isDisabled = updatedAction.isDisabled;
    });
  }

  getDelay(action: IAction) {
    return action.delay_sec ?? 0;
  }

  toggleIsDisabled(){
    this.action.isDisabled = !this.action.isDisabled;
  }
}
