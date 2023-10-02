import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  images: string[] = [
    "0", "1", "2", "3"
  ];
  currentIndex: number = 0;
  dynamicText: string[] = [
    'Faça uma Lista',
    'De sua opinião ruim',
    'Marque os animes',
    'E muito mais (e só isso)'
  ]
  interval: any;
  backgroundImageUrl: string = this.images[this.currentIndex];

  ngOnInit() {
    this.startSlideshow();
  }

  startSlideshow() {
    this.interval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.backgroundImageUrl = this.images[this.currentIndex];
    }, 3000); // Altere o valor para o intervalo desejado em milissegundos
  }

  pauseSlideshow() {
    clearInterval(this.interval);
    this.startSlideshow();
  }
}
