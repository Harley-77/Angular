import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MensagemErro } from './mensagem-erro';

describe('MensagemErro', () => {
  let component: MensagemErro;
  let fixture: ComponentFixture<MensagemErro>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MensagemErro],
    }).compileComponents();

    fixture = TestBed.createComponent(MensagemErro);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
