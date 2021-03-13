import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PrintSalesReturnComponent } from './print-sales-return.component';

describe('PrintSalesReturnComponent', () => {
  let component: PrintSalesReturnComponent;
  let fixture: ComponentFixture<PrintSalesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PrintSalesReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PrintSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
