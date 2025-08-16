import { Component } from '@angular/core';
import { DataHandleService } from '../services/data-handle.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent {
  gameVersion: string | null = null;

    constructor(
      public dataHandleService: DataHandleService,
    ) {}
    
    ngOnInit(): void {
      // 데이터 처리
      this.dataHandleService.gameVersion$.subscribe(version => {
        this.gameVersion = version;
      });
    }

}
