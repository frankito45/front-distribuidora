import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioPagoComponet } from './formulario-pago.componet';

describe('FormularioPagoComponet', () => {
  let component: FormularioPagoComponet;
  let fixture: ComponentFixture<FormularioPagoComponet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormularioPagoComponet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FormularioPagoComponet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
