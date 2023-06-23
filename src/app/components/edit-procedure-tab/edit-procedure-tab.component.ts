import { AppService } from 'src/app/services/app.service';
import { Component } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import { Subject } from 'rxjs';
import { IProcedure } from 'src/app/models/procedure';

@Component({
  selector: 'app-edit-procedure-tab',
  templateUrl: './edit-procedure-tab.component.html',
  styleUrls: ['./edit-procedure-tab.component.scss'],
})
export class EditProcedureTabComponent {
  stages = this.appService.currentProcedure$.value.stages;
  deciders = this.appService.currentProcedure$.value.deciders;
  procedure$ = new Subject<IProcedure>();
  procedureJSON = '';
  highlightedStageName = '';

  constructor(
    private appService: AppService,
    private appSettingsService: AppSettingsService
  ) {
    this.procedure$ = appService.currentProcedure$;
  }

  highlightStage(value: string) {
    console.log(value);
    let stage = this.stages.find((s) => s.name === value);

    this.highlightedStageName = stage?.name ?? '';
    setTimeout(() => {
      this.highlightedStageName = '';
    }, 3000);
  }

  applyJSON() {
    let appData = this.appSettingsService.getAppData();
    this.appSettingsService.reloadDefaultAppData(appData);
  }

  generateJSON() {
    this.procedureJSON = JSON.stringify(this.appSettingsService.appData);
  }
}
