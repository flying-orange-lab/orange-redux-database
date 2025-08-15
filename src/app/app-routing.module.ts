import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PokedexComponent } from './menu/pokedex/pokedex.component';
import { DefenseComponent } from './menu/defense/defense.component';
import { WildComponent } from './menu/wild/wild.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'pokedex', component: PokedexComponent },
  { path: 'defense', component: DefenseComponent },
  { path: 'wild', component: WildComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
