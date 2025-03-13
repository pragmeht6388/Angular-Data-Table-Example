import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { filter, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CountryService {
   apiUrl="assets/"
  constructor(private http:HttpClient) { }

  getCountries():Observable<any[]>{
   return this.http.get<any>(this.apiUrl+'countries.json');
  }

  getStates(country:any):Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'states.json');

  }
  getCities(state:any):Observable<any[]>{
    return this.http.get<any>(this.apiUrl+'cities.json').pipe(
      filter((item) => item.state_code === state)
    )
  }

  getUsers():Observable<any>{
    return this.http.get<any>(this.apiUrl+'users.json');
  }

}
