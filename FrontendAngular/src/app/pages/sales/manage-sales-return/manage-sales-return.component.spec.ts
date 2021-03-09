import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSalesReturnComponent } from './manage-sales-return.component';

describe('ManageSalesReturnComponent', () => {
  let component: ManageSalesReturnComponent;
  let fixture: ComponentFixture<ManageSalesReturnComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageSalesReturnComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageSalesReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
