import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintPurchaseReturnComponent } from './print-purchase-return.component';

describe('PrintPurchaseReturnComponent', () => {
  let component: PrintPurchaseReturnComponent;
  let fixture: ComponentFixture<PrintPurchaseReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintPurchaseReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintPurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
