import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseOrderComponent } from './manage-purchase-order.component';

describe('ManagePurchaseOrderComponent', () => {
  let component: ManagePurchaseOrderComponent;
  let fixture: ComponentFixture<ManagePurchaseOrderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePurchaseOrderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePurchaseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
