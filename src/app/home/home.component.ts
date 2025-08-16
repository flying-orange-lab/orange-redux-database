import { Component } from '@angular/core';
import { DataHandleService } from '../services/data-handle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less'],
})
export class HomeComponent {
  gameVersion: string | null = null;
  contactFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSeQQ0w9o5QJ8yBTF40kl3VpqbVqAW1TBJNhuynfS47SO8AhsA/viewform?usp=dialog';

  constructor(public dataHandleService: DataHandleService) {}

  ngOnInit(): void {
    // 데이터 처리
    this.dataHandleService.gameVersion$.subscribe((version) => {
      this.gameVersion = version;
    });
  }
}
