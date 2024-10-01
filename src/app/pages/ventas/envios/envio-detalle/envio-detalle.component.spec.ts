import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvioDetalleComponent } from './envio-detalle.component';

describe('EnvioDetalleComponent', () => {
  let component: EnvioDetalleComponent;
  let fixture: ComponentFixture<EnvioDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EnvioDetalleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnvioDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
