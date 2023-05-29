import { Component } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  carouselOptions = {
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 2000
  };
  items = [
    {
      imageUrl: 'assets/img/brew1.jpg',
      altText: 'card1'
    },
    {
      imageUrl: 'assets/img/brew2.jpg',
      altText: 'card2'
    },
    {
      imageUrl: 'assets/img/brew3.jpg',
      altText: 'card3'
    },
    {
      imageUrl: 'assets/img/brew4.jpg',
      altText: 'card3'
    },
    {
      imageUrl: 'assets/img/brew5.jpg',
      altText: 'card3'
    },
    {
      imageUrl: 'assets/img/brew6.jpg',
      altText: 'card3'
    },
    {
      imageUrl: 'assets/img/brew1.jpg',
      altText: 'card3'
    },
    // Add more item objects here if needed
  ];
}
