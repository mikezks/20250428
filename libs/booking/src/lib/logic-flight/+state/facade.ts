import { inject } from "@angular/core";
import { Flight } from "../model/flight";
import { FlightFilter } from "../model/flight-filter";
import { BookingStore } from "./booking.store";


export function injectTicketsFacade() {
  const bookingStore = inject(BookingStore);

  // bookingStore.delayedFlights
  return {
    flights: bookingStore.flights,
    search: (filter: FlightFilter) => {
      bookingStore.setFilter(filter);
      bookingStore.load();
    },      
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    update: (flight: Flight) => {},
    reset: () => bookingStore.setFlights([])
  };
}
