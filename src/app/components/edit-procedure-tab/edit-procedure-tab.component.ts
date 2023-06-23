import { AppService } from 'src/app/services/app.service';
import { Component } from '@angular/core';
import { AppSettingsService } from 'src/app/services/app-settings.service';

@Component({
  selector: 'app-edit-procedure-tab',
  templateUrl: './edit-procedure-tab.component.html',
  styleUrls: ['./edit-procedure-tab.component.scss'],
})
export class EditProcedureTabComponent {
  allStages = this.appService.currentProcedure$.value.allStages;
  alldeciders = this.appService.currentProcedure$.value.allDeciders;
  procedureJSON = '';

  constructor(
    private appService: AppService,
    private appSettingsService: AppSettingsService
  ) {}

  importJSON() {
   let appData = this.appSettingsService.getAppData();
   this.appSettingsService.reloadDefaultAppData(appData);
  }

  generateJSON() {
    this.procedureJSON = JSON.stringify(this.appSettingsService.appData);
  }
}
