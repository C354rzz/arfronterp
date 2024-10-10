import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaqueteDetalleComponent } from './paquete-detalle.component';

describe('PaqueteDetalleComponent', () => {
  let component: PaqueteDetalleComponent;
  let fixture: ComponentFixture<PaqueteDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaqueteDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PaqueteDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
