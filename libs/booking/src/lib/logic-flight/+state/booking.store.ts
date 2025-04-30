import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, type, withComputed, withHooks, withMethods, withState } from '@ngrx/signals';
import { setAllEntities, withEntities } from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { pipe, switchMap } from 'rxjs';
import { FlightService } from '../data-access/flight.service';
import { Flight } from '../model/flight';
import { FlightFilter } from '../model/flight-filter';


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
    }),
    withEntities({ entity: type<Flight>(), collection: 'flight' }),
    // Selectors
    withComputed(store => ({
        delayedFlights: computed(
            () => store.flightEntities().filter(flight => flight.delayed)
        ),
    })),
    // Updaters
    withMethods(store => ({
        setFilter: (filter: FlightFilter) =>
            patchState(store, { filter }),
        setFlights: (flights: Flight[]) =>
            patchState(store, setAllEntities(flights, { collection: 'flight' })),
    })),
    // Effects
    withMethods((
        store,
        flightService = inject(FlightService)
    ) => ({
        load: rxMethod<FlightFilter>(pipe(
            switchMap(filter => flightService.find(
                filter.from,
                filter.to,
                filter.urgent
            )),
            tapResponse(
                flights => store.setFlights(flights),
                err => console.error(err)
            )
        ))
    })),
    withHooks(store => ({
        onInit: () => store.load(store.filter)
    }))
);