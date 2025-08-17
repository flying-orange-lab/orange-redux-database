import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { PokedexComponent } from './menu/pokedex/pokedex.component';
import { FormsModule } from '@angular/forms';
import { PokemonLocationComponent } from './menu/pokedex/pokemon-location/pokemon-location.component';
import { PokemonCardComponent } from './menu/pokedex/pokemon-card/pokemon-card.component';
import { SpriteCardComponent } from './home/sprite-card/sprite-card.component';
import { DefenseComponent } from './menu/defense/defense.component';
import { WildComponent } from './menu/wild/wild.component';
import { WildRegionComponent } from './menu/wild/wild-region/wild-region.component';
import { PokemonStatComponent } from './menu/pokedex/pokemon-stat/pokemon-stat.component';
import { ItemsComponent } from './menu/items/items.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    PokedexComponent,
    PokemonLocationComponent,
    PokemonCardComponent,
    SpriteCardComponent,
    DefenseComponent,
    WildComponent,
    WildRegionComponent,
    PokemonStatComponent,
    ItemsComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
