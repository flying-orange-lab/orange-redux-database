import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MartComponent } from './mart.component';

describe('MartComponent', () => {
  let component: MartComponent;
  let fixture: ComponentFixture<MartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MartComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
