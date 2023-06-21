import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PlayProcedureTabComponent } from './components/play-procedure-tab/play-procedure-tab.component';
import { EditProcedureTabComponent } from './components/edit-procedure-tab/edit-procedure-tab.component';
import { TimerTabComponent } from './components/timer-tab/timer-tab.component';

const routes: Routes = [
  { path: 'play-procedure-tab', component: PlayProcedureTabComponent },
  { path: 'edit-procedure-tab', component: EditProcedureTabComponent },
  { path: 'timer-tab', component: TimerTabComponent },
  { path: '', redirectTo: '/play-procedure-tab', pathMatch: 'full' },
  { path: '**', component: PlayProcedureTabComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
