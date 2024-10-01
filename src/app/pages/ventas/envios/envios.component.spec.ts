import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnviosComponent } from './envios.component';

describe('EnviosComponent', () => {
  let component: EnviosComponent;
  let fixture: ComponentFixture<EnviosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnviosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnviosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
