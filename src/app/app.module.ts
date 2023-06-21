import { TimerTabComponent } from './components/timer-tab/timer-tab.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditProcedureTabComponent } from './components/edit-procedure-tab/edit-procedure-tab.component';
import { PlayProcedureTabComponent } from './components/play-procedure-tab/play-procedure-tab.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditProcedureTabComponent,
    PlayProcedureTabComponent,
    TimerTabComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
