import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseBillComponent } from './update-purchase-bill.component';

describe('UpdatePurchaseBillComponent', () => {
  let component: UpdatePurchaseBillComponent;
  let fixture: ComponentFixture<UpdatePurchaseBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
