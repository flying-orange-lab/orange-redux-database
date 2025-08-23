import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildRegionComponent } from './wild-region.component';

describe('WildRegionComponent', () => {
  let component: WildRegionComponent;
  let fixture: ComponentFixture<WildRegionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
    imports: [WildRegionComponent]
});
    fixture = TestBed.createComponent(WildRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
