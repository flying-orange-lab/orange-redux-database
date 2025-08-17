import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './menu/pokedex/pokedex.component';
import { DefenseComponent } from './menu/defense/defense.component';
import { WildComponent } from './menu/wild/wild.component';
import { ItemsComponent } from './menu/items/items.component';

const routes: Routes = [
  { path: ':gameVersion', component: HomeComponent },
  { path: ':gameVersion/pokedex', component: PokedexComponent },
  { path: ':gameVersion/defense', component: DefenseComponent },
  { path: ':gameVersion/wild', component: WildComponent },
  { path: ':gameVersion/item', component: ItemsComponent },
];

const routerOptions: ExtraOptions = {
  scrollPositionRestoration: 'enabled', // 라우팅 시 스크롤 위치 복원 활성화
  anchorScrolling: 'enabled', // 앵커 링크 (#) 스크롤 활성화
};

@NgModule({
  imports: [RouterModule.forRoot(routes, routerOptions)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
