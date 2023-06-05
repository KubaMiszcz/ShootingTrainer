import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ShootingTimer';

  play(){
    let a= new Audio();

  }
  playAudio(){
    let audio = new Audio();
    // audio.src = "../../../assets/audio/alarm.wav";
    audio.src = "../assets/mywav.wav";
    audio.load();
    audio.play();
  }
  
}
