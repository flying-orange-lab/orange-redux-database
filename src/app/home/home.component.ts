import { Component } from '@angular/core';
import { SpriteCardComponent } from './sprite-card/sprite-card.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.less'],
    imports: [SpriteCardComponent],
})
export class HomeComponent {
  contactFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeQQ0w9o5QJ8yBTF40kl3VpqbVqAW1TBJNhuynfS47SO8AhsA/viewform?usp=dialog';

  constructor() {}
}
