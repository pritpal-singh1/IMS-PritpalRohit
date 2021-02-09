import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAdjustmentsComponent } from './stock-adjustments.component';

describe('StockAdjustmentsComponent', () => {
  let component: StockAdjustmentsComponent;
  let fixture: ComponentFixture<StockAdjustmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAdjustmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAdjustmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
