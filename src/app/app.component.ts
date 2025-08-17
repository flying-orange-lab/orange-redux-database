import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';
import { DataHandleService } from './services/data-handle.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less'],
  standalone: false,
})
export class AppComponent implements OnInit {
  private router = inject(Router);
  private route = inject(ActivatedRoute);
  private dataHandleService = inject(DataHandleService);

  title = 'datasheet';

  ngOnInit(): void {
    // 라우터 이벤트 구독 → 페이지 이동할 때마다 gameVersion 갱신
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        // 최상위 route의 첫 번째 child에서 gameVersion 파라미터 확인
        const gameVersion =
          this.route.root.firstChild?.snapshot.paramMap.get('gameVersion');
        if (gameVersion) {
          this.dataHandleService.setGameVersion(gameVersion);
          console.log('현재 gameVersion:', gameVersion);
        }
      });
  }
}
