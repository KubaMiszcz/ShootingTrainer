import { AppService } from 'src/app/services/app.service';
import { Component } from '@angular/core';
import { ALL_DECIDERS, ALL_STAGES, AppSettingsService } from 'src/app/services/app-settings.service';

@Component({
  selector: 'app-edit-procedure-tab',
  templateUrl: './edit-procedure-tab.component.html',
  styleUrls: ['./edit-procedure-tab.component.scss'],
})
export class EditProcedureTabComponent {
  allStages = this.appSettingsService.allStages;
  alldeciders = this.appSettingsService.allDeciders;
  procedureJSON = '';

  constructor(
    private appService:AppService,
    private appSettingsService: AppSettingsService) {}

  updateJSON(){
    let json = JSON.stringify(this.appSettingsService.allStages);
  }

importJSON(){
  
}
}
