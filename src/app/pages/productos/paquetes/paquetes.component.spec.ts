import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaquetesComponent } from './paquetes.component';

describe('PaquetesComponent', () => {
  let component: PaquetesComponent;
  let fixture: ComponentFixture<PaquetesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaquetesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaquetesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
