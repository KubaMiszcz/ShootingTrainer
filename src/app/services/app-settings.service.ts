import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppSettingsService {
  MagazineCapacity = 30;
  failureChance = 0.25;
}
