import { Component, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {

  @Input() videoSrc: string = '';
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  constructor() { }

  playVideo() {
    this.videoPlayer.nativeElement.play(); 
  }

  pauseVideo() {
    this.videoPlayer.nativeElement.pause();
  }

  stopVideo() {
    this.videoPlayer.nativeElement.pause();
    this.videoPlayer.nativeElement.currentTime = 0;
  }

  seekVideo(event: any) {
    this.videoPlayer.nativeElement.currentTime = event.target.value;
  }

  changeVolume(event: any) {
    this.videoPlayer.nativeElement.volume = event.target.value;
  }

  // Puedes mantener los otros métodos de eventos aquí...
}
