import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LowLevelStockComponent } from './low-level-stock.component';

describe('LowLevelStockComponent', () => {
  let component: LowLevelStockComponent;
  let fixture: ComponentFixture<LowLevelStockComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LowLevelStockComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LowLevelStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
