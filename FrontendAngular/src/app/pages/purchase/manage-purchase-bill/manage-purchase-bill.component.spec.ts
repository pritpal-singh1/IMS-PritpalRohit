import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseBillComponent } from './manage-purchase-bill.component';

describe('ManagePurchaseBillComponent', () => {
  let component: ManagePurchaseBillComponent;
  let fixture: ComponentFixture<ManagePurchaseBillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagePurchaseBillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagePurchaseBillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
