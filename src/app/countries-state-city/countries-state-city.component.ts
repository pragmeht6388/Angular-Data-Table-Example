import { Component, OnInit } from '@angular/core';
import { FormGroup, FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { CountryService } from '../country.service';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-countries-state-city',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  templateUrl: './countries-state-city.component.html',
  styleUrl: './countries-state-city.component.css'
})
export class CountriesStateCityComponent implements OnInit {

 
  countries:any[]=[];
  states: any[] = [];
  cities: any[] = [];

  selectedCountry: any = '';
  selectedState: any = '';
  selectedCity:any='';

constructor(private countryService:CountryService){

 
}
  ngOnInit(): void {

      // this.countryServices.getCountries().subscribe({
      //   next:(res:any[])=>{
      //     console.log(res)
      //     this.countries=res;
      //   }
      // })
      this.countryService.getCountries().subscribe(
        
        (data) => {
       
          this.countries = data;
          console.log('Countries loaded:', this.countries);
        },
        (error) => console.error('Error loading JSON:', error)
      );
  }

  onCountryChange($event :any) {
debugger;
    this.selectedCountry=$event.target.value;
    // console.log(this.form.value.country.code);
    this.countryService.getStates(this.selectedCountry).subscribe(
      (data)=>{
        debugger
          this.states=data;
          console.log('States loaded:', this.states);
    })
    // const selectedCountry = this.form.value.country;
    // this.states = this.statesMap[selectedCountry] || [];
    // this.cities = []; // Reset cities when country changes
    // this.form.patchValue({ state: '', city: '' });
  }

  onStateChange(state:any) {
debugger
    this.selectedState=state
    this.countryService.getCities(this.selectedState).subscribe(
      (data)=>{
        debugger
          this.states=data;
          console.log('States loaded:', this.states);
    })
    // const selectedState = this.form.value.state;
    // this.cities = this.citiesMap[selectedState] || [];
    // this.form.patchValue({ city: '' });
  }
}
