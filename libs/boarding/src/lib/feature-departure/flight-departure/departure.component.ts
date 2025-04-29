import { CommonModule } from '@angular/common';
import { Component, DestroyRef, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { Observable, catchError, debounceTime, distinctUntilChanged, filter, of, switchMap, tap } from 'rxjs';
import { Flight, FlightService } from '@flight-demo/booking';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';


@Component({
  selector: 'app-departure',
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './departure.component.html'
})
export class DepatureComponent {
  private flightService = inject(FlightService);
  private destroyRef = inject(DestroyRef);

  control = new FormControl('', { nonNullable: true });
  flights$ = this.initFlightsStream();
  loading = false;

  constructor() {
    this.destroyRef.onDestroy(() => console.log('Bye, bye! :('));
  }

  initFlightsStream(): Observable<Flight[]> {
    return this.control.valueChanges.pipe(
      filter(airport => airport.length > 2),
      debounceTime(300),
      distinctUntilChanged(),
      tap(() => this.loading = true),
      switchMap(airport => this.load(airport)),
      tap(() => this.loading = false),
      takeUntilDestroyed(),
      // Use if not part of the init context ⤵️
      // takeUntilDestroyed(this.destroyRef)
    );
  }

  load(airport: string): Observable<Flight[]> {
    return this.flightService.find(airport, '').pipe(
      catchError(() => of([]))
    );
  }
}
