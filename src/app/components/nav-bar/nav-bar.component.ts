import { AppService } from 'src/app/services/app.service';
import { AppSettingsService } from 'src/app/services/app-settings.service';
import {
  AfterContentChecked,
  AfterContentInit,
  AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
} from '@angular/core';
import { IProcedure } from 'src/app/models/procedure';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss'],
})
export class NavBarComponent {
  allProcedures$ = new Subject<IProcedure[]>();
  currentProcedure$ = new Subject<IProcedure>();

  constructor(
    private appSettingsService: AppSettingsService,
    private appService: AppService
  ) {
    this.allProcedures$ = appService.allProcedures$;
    this.currentProcedure$ = appService.currentProcedure$;
  }

  selectProcedure(value: IProcedure) {
    this.appService.changeProcedure(value);
  }
}
