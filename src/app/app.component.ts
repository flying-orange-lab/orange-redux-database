import { Component, HostListener, OnInit, inject, signal } from '@angular/core';
import {
  ActivatedRoute,
  NavigationEnd,
  Router,
  RouterOutlet,
} from '@angular/router';
import { filter, map, mergeMap } from 'rxjs/operators';
import { DataHandleService } from './services/data-handle.service';
import { Title } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
import { FloatingButtonComponent } from './floating-button/floating-button.component';

declare let gtag: Function;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  imports: [HeaderComponent, FloatingButtonComponent, RouterOutlet],
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private titleService = inject(Title);
  private dataHandleService = inject(DataHandleService);

  title = 'datasheet';

  isHeaderHidden = signal(false);
  private previousScroll = signal(0);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        gtag('config', 'G-XXXXXXXXXX', {
          page_path: event.urlAfterRedirects,
        });
      }
    });
  }

  ngOnInit(): void {
    // 라우터 이벤트 구독 → 페이지 이동할 때마다 gameVersion 갱신
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        map(() => {
          let childRoute = this.route;
          while (childRoute.firstChild) {
            childRoute = childRoute.firstChild;
          }
          return childRoute;
        }),
        mergeMap((childRoute) => childRoute.data),
      )
      .subscribe((data) => {
        this.title = '포켓몬 위키';

        // 최상위 route의 첫 번째 child에서 gameVersion 파라미터 확인
        const gameVersion =
          this.route.root.firstChild?.snapshot.paramMap.get('gameVersion');
        if (gameVersion) {
          this.dataHandleService.setGameVersion(gameVersion);
          console.log('현재 gameVersion:', gameVersion);
        }

        this.setTitleGameVersion();
        this.setTitleFromRouter(data['title']);
        this.titleService.setTitle(this.title);
      });
  }

  setTitleGameVersion() {
    const gameTitle = this.dataHandleService.gameTitle;
    if (gameTitle) {
      this.title = `${gameTitle} 위키`;
    }
  }

  setTitleFromRouter(dataTitle?: string) {
    if (dataTitle) {
      this.title = `${dataTitle} | ${this.title}`;
    }
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    const currentScroll = window.scrollY;

    if (currentScroll > this.previousScroll() && currentScroll > 100) {
      this.isHeaderHidden.set(true);
    } else if (currentScroll < this.previousScroll()) {
      this.isHeaderHidden.set(false);
    }

    this.previousScroll.set(currentScroll);
  }
}
