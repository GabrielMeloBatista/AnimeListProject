import { Component, HostListener } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-welcome",
  templateUrl: "./welcome.component.html",
  styleUrls: ["./welcome.component.scss"]
})
export class WelcomeComponent {
  images: string[] = [
    'https://images.alphacoders.com/605/605592.png',
    'https://images2.alphacoders.com/564/564835.jpg',
    'https://images.alphacoders.com/131/1311951.jpg',
    'https://images2.alphacoders.com/516/516664.jpg'
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
