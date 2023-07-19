import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IAction } from 'src/app/models/action';
import { AppService } from 'src/app/services/app.service';
import { EditActionModalComponent } from '../edit-action-modal/edit-action-modal.component';
import { ORDER_DIRECTION } from 'src/app/models/enums';

@Component({
  selector: 'app-action-row',
  templateUrl: './action-row.component.html',
  styleUrls: ['./action-row.component.scss'],
})
export class ActionRowComponent {
  @Input() action: IAction;
  @Input() showDelete = false;
  @Input() showReorder = true;
  @Output() delete: EventEmitter<IAction> = new EventEmitter();
  @Output() reorderDown: EventEmitter<IAction> = new EventEmitter();
  @Output() reorderUp: EventEmitter<IAction> = new EventEmitter();

  constructor(private appService: AppService, private modalService: NgbModal) {
    this.action = {
      name: '',
      audioFileName: '',
    };
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

  toggleIsDisabled() {
    this.action.isDisabled = !this.action.isDisabled;
  }

  onDelete(action: IAction) {
    this.delete.emit(action);
  }

  actionUp() {
    this.reorderUp.emit(this.action)
  }
  
  actionDown() {
    this.reorderDown.emit(this.action)
  }
}
