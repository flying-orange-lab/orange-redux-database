import {
  Component,
  QueryList,
  ViewChildren,
  OnInit,
  inject,
} from '@angular/core';
import { WildRegionComponent } from './wild-region/wild-region.component';
import { PokemonCatchService } from 'src/app/services/pokemon-catch.service';
import { DataHandleService } from 'src/app/services/data-handle.service';
import { ActivatedRoute } from '@angular/router';
import { WildArea } from 'src/app/models/wilds.model';

@Component({
  selector: 'app-wild',
  templateUrl: './wild.component.html',
  styleUrls: ['./wild.component.less'],
  standalone: false,
})
export class WildComponent implements OnInit {
  private route = inject(ActivatedRoute);
  private pokemonCatchService = inject(PokemonCatchService);
  private dataHandleService = inject(DataHandleService);

  wildData?: WildArea[];
  pokemonCatchStatus: Record<number, boolean> = {};

  @ViewChildren(WildRegionComponent)
  wildRegionComponents!: QueryList<WildRegionComponent>;

  ngOnInit(): void {
    // 데이터 처리
    this.wildData = this.dataHandleService.wildDatas;

    // 모든 포켓몬의 포획 상태를 한 번에 불러옴
    this.loadAllPokemonCatchStatus();
  }

  toggleChild(index: number): void {
    // QueryList는 배열처럼 인덱스로 접근 가능합니다.
    const component = this.wildRegionComponents.get(index);
    if (component) {
      component.toggleExpanded();
    }
    this.scrollToSection(index);
  }

  async loadAllPokemonCatchStatus(): Promise<void> {
    const allCaughtPokemon =
      await this.pokemonCatchService.pokemonCatch.toArray();
    allCaughtPokemon.forEach((entry) => {
      this.pokemonCatchStatus[entry.id] = entry.isCaught;
    });
  }

  async handlePokemonCaught(event: {
    id: number;
    status: boolean;
  }): Promise<void> {
    await this.pokemonCatchService.catchPokemon(event.id, event.status);
    this.pokemonCatchStatus[event.id] = event.status;
  }

  scrollToSection(index: number): void {
    const element = document.getElementById(`location-section-${index}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
