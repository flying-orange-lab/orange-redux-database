import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PokemonService } from '../../services/pokemon.service';
import { DataHandleService } from 'src/app/services/data-handle.service';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-pokedex',
  templateUrl: './pokedex.component.html',
  styleUrls: ['./pokedex.component.less'],
  standalone: false,
})
export class PokedexComponent implements OnInit {
  private dataHandleService = inject(DataHandleService);
  private pokemonService = inject(PokemonService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  pokemonUseSprite = false;

  pokemonSearchInput = '';
  pokemonSearchOffset = 1;
  pokemonSearchAttr?: string;

  searchResults: Pokemon[] = [];
  noResultsMessage = '';

  private allPokemon: Pokemon[] = [];

  ngOnInit(): void {
    this.pokemonUseSprite =
      this.dataHandleService.getGameVersion() == 'orange_v3';
    // 페이지 로딩 시 모든 포켓몬 데이터 가져옴
    this.pokemonService.getAllPokemon().subscribe((data) => {
      this.allPokemon = data;

      // URL 파라미터가 있다면 검색을 실행합니다.
      this.route.queryParams.subscribe((params) => {
        if (params['search']) {
          const searchTerm = params['search'] || '';
          this.pokemonSearchInput = searchTerm;
        } else {
          this.pokemonSearchInput = '';
        }

        if (params['gte']) {
          this.pokemonSearchOffset = parseInt(params['gte']);
        } else {
          this.pokemonSearchOffset = 1;
        }

        if (params['attr']) {
          this.pokemonSearchAttr = params['attr'];
        } else {
          this.pokemonSearchAttr = '';
        }
        this.performSearch();
      });
    });
  }

  // 검색 버튼 클릭 시 호출될 메서드
  onSearchButtonClick(): void {
    if (this.pokemonSearchInput.length == 0) {
      return;
    }

    const isNumericString = /^\d+$/.test(this.pokemonSearchInput);
    if (isNumericString) {
      this.pokemonSearchOffset = parseInt(this.pokemonSearchInput);
      this.pokemonSearchInput = '';
      this.router.navigate([], {
        relativeTo: this.route,
        queryParams: { gte: this.pokemonSearchOffset }, // 페이지 번호 쿼리 파라미터 추가
        // queryParamsHandling: 'merge', // 기존 파라미터(search) 유지
      });
    } else {
      this.pokemonSearchOffset = 1;
      this.router.navigate([], {
        relativeTo: this.route, // 현재 라우트를 기준으로
        queryParams: { search: this.pokemonSearchInput },
      });
    }
  }

  onPageButtonClick(status: boolean): void {
    let number = this.pokemonSearchOffset;
    if (status) {
      number += 30;
    } else {
      number = Math.max(0, number - 30);
    }
    this.pokemonSearchOffset = number;
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: { gte: number }, // 페이지 번호 쿼리 파라미터 추가
      queryParamsHandling: 'merge', // 기존 파라미터(search) 유지
    });
  }

  performSearch(): void {
    const lowerCaseSearchTerm = this.pokemonSearchInput.toLowerCase().trim();

    // 이름 또는 한국어 이름으로 필터링합니다.
    const filtered = this.allPokemon.filter((pokemon) => {
      if (this.pokemonSearchAttr && !pokemon.form) {
        return false;
      }

      if (lowerCaseSearchTerm.length > 0) {
        if (pokemon.name.toLowerCase().includes(lowerCaseSearchTerm)) {
          return true;
        }

        if (
          pokemon.koreanName &&
          pokemon.koreanName.toLowerCase().includes(lowerCaseSearchTerm)
        ) {
          return true;
        }

        return false;
      }
      return true;
    });

    if (filtered.length === 0) {
      this.noResultsMessage = `'${this.pokemonSearchInput}'에 대한 검색 결과가 없습니다.`;
      this.searchResults = [];
    } else if (filtered.length > 30) {
      this.noResultsMessage = `총 ${filtered.length}개의 결과 중 30개만 표시되었습니다.`;
      this.searchResults = filtered.slice(
        this.pokemonSearchOffset - 1,
        this.pokemonSearchOffset - 1 + 30,
      );
    } else {
      this.noResultsMessage = '';
      this.searchResults = filtered;
    }
  }
}
