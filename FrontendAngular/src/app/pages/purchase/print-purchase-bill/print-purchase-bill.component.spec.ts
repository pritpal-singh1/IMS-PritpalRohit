import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPurchaseBillComponent } from './print-purchase-bill.component';

describe('PrintPurchaseBillComponent', () => {
  let component: PrintPurchaseBillComponent;
  let fixture: ComponentFixture<PrintPurchaseBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPurchaseBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPurchaseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
