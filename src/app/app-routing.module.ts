import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
