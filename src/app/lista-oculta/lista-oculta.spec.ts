import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaOculta } from './lista-oculta';

describe('ListaOculta', () => {
  let component: ListaOculta;
  let fixture: ComponentFixture<ListaOculta>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaOculta],
    }).compileComponents();

    fixture = TestBed.createComponent(ListaOculta);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
