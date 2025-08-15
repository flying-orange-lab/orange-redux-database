import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpriteCardComponent } from './sprite-card.component';

describe('SpriteCardComponent', () => {
  let component: SpriteCardComponent;
  let fixture: ComponentFixture<SpriteCardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SpriteCardComponent]
    });
    fixture = TestBed.createComponent(SpriteCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
