import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedureTabComponent } from './components/training-tab/training-tab.component';
import { EditProcedureTabComponent } from './components/edit-procedure-tab/edit-procedure-tab.component';
import { TimerTabComponent } from './components/timer-tab/timer-tab.component';
import { SettingsTabComponent } from './components/settings-tab/settings-tab.component';

const routes: Routes = [
  { path: 'procedure-tab', component: ProcedureTabComponent },
  { path: 'edit-procedure-tab', component: EditProcedureTabComponent },
  { path: 'timer-tab', component: TimerTabComponent },
  { path: 'settings-tab', component: SettingsTabComponent },
  { path: '', redirectTo: '/procedure-tab', pathMatch: 'full' },
  { path: '**', component: ProcedureTabComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
