import { Routes } from '@angular/router';
import { BookListComponent } from './book-list/book-list.component';
import { BookComponent } from './book/book.component';
import { CountriesStateCityComponent } from './countries-state-city/countries-state-city.component';
import { TableComponent } from './table/table/table.component';

export const routes: Routes = [
    {
        path:'books',
        component:BookListComponent
    },
    {
        path:'book',
        component:BookComponent
    },
    {
        path:'country-state-city',
        component:CountriesStateCityComponent
    },
    {
        path:'table',
        component:TableComponent
    }
];
