import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VentaDetail } from './venta-detail';

describe('VentaDetail', () => {
  let component: VentaDetail;
  let fixture: ComponentFixture<VentaDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VentaDetail]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VentaDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
