import { Routes } from "@angular/router";
import { PassengerSearchComponent } from "./feature-passenger/passenger-search/passenger-search.component";
import { PassengerEditComponent } from "./feature-passenger/passenger-edit/passenger-edit.component";


export const CHECKIN_ROUTES: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'passenger',
        pathMatch: 'full'
      },
      {
        path: 'passenger',
        children: [
          {
            path: '',
            redirectTo: 'search',
            pathMatch: 'full'
          },
          {
            path: 'search',
            component: PassengerSearchComponent,
          },
          {
            path: 'edit/:id',
            component: PassengerEditComponent
          }
        ]
      }
    ]
  }
];

export default CHECKIN_ROUTES;
