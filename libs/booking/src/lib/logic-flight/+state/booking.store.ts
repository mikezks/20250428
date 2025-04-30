import { patchState, signalStore, withComputed, withMethods, withState } from '@ngrx/signals';
import { Flight } from '../model/flight';
import { computed, inject } from '@angular/core';
import { FlightFilter } from '../model/flight-filter';
import { FlightService } from '../data-access/flight.service';
import { tap } from 'rxjs';


export const BookingStore = signalStore(
    { providedIn: 'root' },
    // State
    withState({
        filter: {
            from: 'Hamburg',
            to: 'Graz',
            urgent: false
        },
        basket: {
            3: true,
            5: true,
        } as Record<number, boolean>,
        flights: [] as Flight[]
    }),
    // Selectors
    withComputed(store => ({
        delayedFlights: computed(
            () => store.flights().filter(flight => flight.delayed)
        ),
    })),
    // Updaters
    withMethods(store => ({
        setFilter: (filter: FlightFilter) =>
            patchState(store, { filter }),
        setFlights: (flights: Flight[]) =>
            patchState(store, { flights }),
    })),
    // Effects
    withMethods((
        store,
        flightService = inject(FlightService)
    ) => ({
        load: () => {
            flightService.find(
                store.filter.from(),
                store.filter.to(),
                store.filter.urgent()
            ).pipe(
                tap(() => console.log('SIGNAL Store! :)'))
            ).subscribe(
                flights => store.setFlights(flights)
            )
        }
    }))
);