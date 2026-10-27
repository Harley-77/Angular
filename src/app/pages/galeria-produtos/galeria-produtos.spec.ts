import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GaleriaProdutos } from './galeria-produtos';

describe('GaleriaProdutos', () => {
  let component: GaleriaProdutos;
  let fixture: ComponentFixture<GaleriaProdutos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GaleriaProdutos],
    }).compileComponents();

    fixture = TestBed.createComponent(GaleriaProdutos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
