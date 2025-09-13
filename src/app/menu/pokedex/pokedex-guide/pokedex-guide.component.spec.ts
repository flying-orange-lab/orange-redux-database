import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokedexGuideComponent } from './pokedex-guide.component';

describe('PokedexGuideComponent', () => {
  let component: PokedexGuideComponent;
  let fixture: ComponentFixture<PokedexGuideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokedexGuideComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokedexGuideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
