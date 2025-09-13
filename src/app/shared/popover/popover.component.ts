import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-popover',
  templateUrl: './popover.component.html',
  styleUrl: './popover.component.less',
})
export class PopoverComponent implements AfterViewInit {
  @Input() buttonRect!: DOMRect;
  @Input() message!: string;

  @ViewChild('popoverDiv') popoverDiv!: ElementRef<HTMLDivElement>;

  ngAfterViewInit(): void {
    if (this.buttonRect) {
      this.setPosition();
    }
  }

  private setPosition(): void {
    const popoverElement = this.popoverDiv.nativeElement;
    const viewportWidth = window.innerWidth;
    const isRightHalf =
      this.buttonRect.left + this.buttonRect.width / 2 > viewportWidth / 2;

    popoverElement.style.top = `${this.buttonRect.bottom + window.scrollY + 10}px`;

    if (isRightHalf) {
      // 버튼이 화면 오른쪽에 있으면 right 속성으로 위치 계산
      popoverElement.style.right = `${viewportWidth - this.buttonRect.right - this.buttonRect.width}px`;
      popoverElement.style.left = ''; // left 속성 제거
    } else {
      // 버튼이 화면 왼쪽에 있으면 left 속성으로 위치 계산
      popoverElement.style.left = `${this.buttonRect.left}px`;
      popoverElement.style.right = ''; // right 속성 제거
    }
  }
}
