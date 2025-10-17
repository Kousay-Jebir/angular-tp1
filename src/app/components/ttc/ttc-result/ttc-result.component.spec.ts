import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TtcResultComponent } from './ttc-result.component';

describe('TtcResultComponent', () => {
  let component: TtcResultComponent;
  let fixture: ComponentFixture<TtcResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TtcResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TtcResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
