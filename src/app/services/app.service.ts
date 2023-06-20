import { Injectable } from '@angular/core';
import { AppSettingsService } from './app-settings.service';

@Injectable({
  providedIn: 'root',
})

export class AppService {
  constructor(private appSettings: AppSettingsService) {}


}


