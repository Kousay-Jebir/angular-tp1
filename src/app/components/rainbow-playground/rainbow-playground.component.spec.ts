import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RainbowPlaygroundComponent } from './rainbow-playground.component';

describe('RainbowPlaygroundComponent', () => {
  let component: RainbowPlaygroundComponent;
  let fixture: ComponentFixture<RainbowPlaygroundComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RainbowPlaygroundComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RainbowPlaygroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
