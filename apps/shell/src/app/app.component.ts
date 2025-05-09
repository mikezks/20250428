import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderbarComponent, SidebarComponent } from '@flight-demo/shared/core';


@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    HeaderbarComponent,
    SidebarComponent
  ],
  template: `
    <div class="wrapper">
      <div class="sidebar" data-color="white" data-active-color="danger">
        <app-sidebar-cmp />
      </div>

      <div class="main-panel">
        <app-headerbar-cmp />

        <div class="content">

          <router-outlet />

        </div>

      </div>
    </div>
  `
})
export class AppComponent {
}
