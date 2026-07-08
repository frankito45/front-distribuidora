import { TestBed } from '@angular/core/testing';

import { ImprimirTicket } from './imprimir-ticket';

describe('ImprimirTicket', () => {
  let service: ImprimirTicket;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImprimirTicket);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
