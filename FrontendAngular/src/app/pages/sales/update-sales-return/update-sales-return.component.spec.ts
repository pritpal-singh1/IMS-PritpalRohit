import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSalesReturnComponent } from './update-sales-return.component';

describe('UpdateSalesReturnComponent', () => {
  let component: UpdateSalesReturnComponent;
  let fixture: ComponentFixture<UpdateSalesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSalesReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
