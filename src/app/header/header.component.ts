import { Component } from '@angular/core';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.less']
})
export class HeaderComponent {
    isMenuOpen = false; // 메뉴가 열려있는지 닫혀있는지 상태를 저장하는 변수

    toggleMenu() {
        this.isMenuOpen = !this.isMenuOpen; // 상태를 반전시키는 함수
    }
}