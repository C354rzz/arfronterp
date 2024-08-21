import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FloatSubMenuComponent } from './float-sub-menu.component';

describe('FloatSubMenuComponent', () => {
  let component: FloatSubMenuComponent;
  let fixture: ComponentFixture<FloatSubMenuComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FloatSubMenuComponent]
    });
    fixture = TestBed.createComponent(FloatSubMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
