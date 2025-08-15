import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WildComponent } from './wild.component';

describe('WildComponent', () => {
  let component: WildComponent;
  let fixture: ComponentFixture<WildComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WildComponent]
    });
    fixture = TestBed.createComponent(WildComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
