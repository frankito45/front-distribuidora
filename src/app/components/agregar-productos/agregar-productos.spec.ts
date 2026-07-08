import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarProductos } from './agregar-productos';

describe('AgregarProductos', () => {
  let component: AgregarProductos;
  let fixture: ComponentFixture<AgregarProductos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarProductos]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarProductos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
