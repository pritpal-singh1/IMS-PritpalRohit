import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePurchaseReturnComponent } from './update-purchase-return.component';

describe('UpdatePurchaseReturnComponent', () => {
  let component: UpdatePurchaseReturnComponent;
  let fixture: ComponentFixture<UpdatePurchaseReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatePurchaseReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePurchaseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
