import { Routes } from '@angular/router';
import { DepatureComponent } from '../feature-departure/flight-departure/departure.component';

export const BOARDING_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'departures',
        pathMatch: 'full'
      },
      {
        path: 'departures',
        component: DepatureComponent
      }
    ]
  }
];

export default BOARDING_ROUTES;
