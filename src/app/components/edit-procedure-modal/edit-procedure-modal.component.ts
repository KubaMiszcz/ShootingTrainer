import { Component, EventEmitter, Output } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProcedure } from 'src/app/models/procedure';
import { AppService } from 'src/app/services/app.service';

@Component({
  selector: 'app-edit-procedure-modal',
  templateUrl: './edit-procedure-modal.component.html',
  styleUrls: ['./edit-procedure-modal.component.scss']
})
export class EditProcedureModalComponent {
  procedure: IProcedure;
  @Output() result: EventEmitter<IProcedure> = new EventEmitter();
  procedureName = '';

  constructor(
    private appService: AppService,
    public activeModal: NgbActiveModal
  ) {
    this.procedure = {
      name: '',
      deciders: [],
      stages: [],
      defaultFailureChance: 0.5,
      magazineCapacity: 30,
    };
  }

  save() {
    this.result.emit(this.procedure);
    this.activeModal.close();
  }
}
