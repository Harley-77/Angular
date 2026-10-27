import { TestBed } from '@angular/core/testing';
import { Sacola } from './sacola';

describe('Sacola', () => {
  let service: Sacola;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Sacola);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
