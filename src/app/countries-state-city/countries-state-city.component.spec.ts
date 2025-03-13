import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountriesStateCityComponent } from './countries-state-city.component';

describe('CountriesStateCityComponent', () => {
  let component: CountriesStateCityComponent;
  let fixture: ComponentFixture<CountriesStateCityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CountriesStateCityComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountriesStateCityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
