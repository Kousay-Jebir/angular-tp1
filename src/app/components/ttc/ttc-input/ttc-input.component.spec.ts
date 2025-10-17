import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtcInputComponent } from './ttc-input.component';

describe('TtcInputComponent', () => {
  let component: TtcInputComponent;
  let fixture: ComponentFixture<TtcInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtcInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtcInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
