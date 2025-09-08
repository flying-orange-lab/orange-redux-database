import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { MartItem } from 'src/app/models/mart.model';
import { DataHandleService } from 'src/app/services/data-handle.service';

@Component({
  selector: 'app-mart',
  templateUrl: './mart.component.html',
  styleUrl: './mart.component.less',
  imports: [ReactiveFormsModule, AsyncPipe],
})
export class MartComponent implements OnInit {
  private dataHandleService = inject(DataHandleService);

  searchContext = new FormControl('');
  martDatas: MartItem[] = [];
  filteredMartDatats$!: Observable<{ index: number; value: MartItem }[]>;
  expandedLocation: number | null = null;

  ngOnInit(): void {
    // 데이터 처리
    this.martDatas = this.dataHandleService.martDatas;

    this.filteredMartDatats$ = this.searchContext.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || '')),
    );
  }
  private _filter(value: string) {
    const filterValue = value.toLowerCase();
    return this.martDatas
      .map((item, idx) => ({ index: idx, value: item }))
      .filter((entry) => {
        if (entry.value.locationName.toLowerCase().includes(filterValue)) {
          return true;
        }

        for (const itemDetail of entry.value.items) {
          if (itemDetail.name.toLowerCase().includes(filterValue)) {
            return true;
          }
        }
        return false;
      });
  }

  toggleExpand(locationIndex: number): void {
    if (this.expandedLocation === locationIndex) {
      this.expandedLocation = null; // 이미 열려 있으면 닫기
    } else {
      this.expandedLocation = locationIndex; // 다른 서랍 열기
    }
  }
}
