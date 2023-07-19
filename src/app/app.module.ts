import { TimerTabComponent } from './components/timer-tab/timer-tab.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { EditProcedureTabComponent } from './components/edit-procedure-tab/edit-procedure-tab.component';
import { ProcedureTabComponent } from './components/training-tab/training-tab.component';
import { FooterComponent } from './components/footer/footer.component';
import { SettingsTabComponent } from './components/settings-tab/settings-tab.component';
import { ActionTileComponent } from './components/action-tile/action-tile.component';
import { StageTileComponent } from './components/stage-tile/stage-tile.component';
import { EditActionModalComponent } from './components/edit-action-modal/edit-action-modal.component';
import { FormsModule } from '@angular/forms';
import { ActionRowComponent } from './components/action-row/action-row.component';
import { DeciderTileComponent } from './components/decider-tile/decider-tile.component';
import { EditDeciderModalComponent } from './components/edit-decider-modal/edit-decider-modal.component';
import { EditStageModalComponent } from './components/edit-stage-modal/edit-stage-modal.component';
import { EditProcedureModalComponent } from './components/edit-procedure-modal/edit-procedure-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    EditProcedureTabComponent,
    ProcedureTabComponent,
    TimerTabComponent,
    FooterComponent,
    SettingsTabComponent,
    ActionTileComponent,
    StageTileComponent,
    EditActionModalComponent,
    ActionRowComponent,
    DeciderTileComponent,
    EditDeciderModalComponent,
    EditStageModalComponent,
    EditProcedureModalComponent,
    ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
