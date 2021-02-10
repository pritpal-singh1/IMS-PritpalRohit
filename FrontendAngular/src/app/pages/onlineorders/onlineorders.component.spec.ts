import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OnlineordersComponent } from './onlineorders.component';

describe('OnlineordersComponent', () => {
  let component: OnlineordersComponent;
  let fixture: ComponentFixture<OnlineordersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OnlineordersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OnlineordersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
