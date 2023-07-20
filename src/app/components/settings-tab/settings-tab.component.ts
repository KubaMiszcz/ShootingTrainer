import { AppSettingsService } from './../../services/app-settings.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-settings-tab',
  templateUrl: './settings-tab.component.html',
  styleUrls: ['./settings-tab.component.scss'],
})
export class SettingsTabComponent {
  procedureJSON = '';

  constructor(private appSettingsService: AppSettingsService) {}

  applyJSON() {
    let appData = this.appSettingsService.getAppData();
    this.appSettingsService.reloadDefaultAppData(appData);
  }

  generateJSON() {
    this.procedureJSON = this.appSettingsService.generateJSON()
  }
}
