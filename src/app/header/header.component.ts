import { Component, OnInit, inject } from '@angular/core';
import { DataHandleService } from '../services/data-handle.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less'],
    standalone: false
})
export class HeaderComponent implements OnInit {
  dataHandleService = inject(DataHandleService);

  gameVersion: string | null = null;
  isMenuOpen = false;

  ngOnInit(): void {
    // 데이터 처리
    this.dataHandleService.gameVersion$.subscribe((version) => {
      this.gameVersion = version;
    });
  }

  getTitle() {
    switch (this.gameVersion) {
      case 'orange_v3':
        return '모에몬 리덕스 오렌지 에디션 3.24';
      case 'another_red':
        return '어나더 레드';
      default:
        return '준비중';
    }
  }

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  closeMenu() {
    this.isMenuOpen = false;
  }
}
