import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewShoppingCartsComponent } from './view-shopping-carts.component';

describe('ViewShoppingCartsComponent', () => {
  let component: ViewShoppingCartsComponent;
  let fixture: ComponentFixture<ViewShoppingCartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewShoppingCartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewShoppingCartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
