import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPurchaseBillComponent } from './add-purchase-bill.component';

describe('AddPurchaseBillComponent', () => {
  let component: AddPurchaseBillComponent;
  let fixture: ComponentFixture<AddPurchaseBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddPurchaseBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPurchaseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
