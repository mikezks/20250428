import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, Injector, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Flight, FlightFilter, injectTicketsFacade } from '../../logic-flight';
import { FlightCardComponent, FlightFilterComponent } from '../../ui-flight';
import { SIGNAL } from '@angular/core/primitives/signals';


@Component({
  selector: 'app-flight-search',
  imports: [
    CommonModule,
    FormsModule,
    FlightCardComponent,
    FlightFilterComponent
  ],
  templateUrl: './flight-search.component.html',
})
export class FlightSearchComponent {
  private ticketsFacade = injectTicketsFacade();
  private injector = inject(Injector);

  protected filter = signal({
    from: 'London',
    to: 'New York',
    urgent: false
  });
  protected route = computed(
    () => 'From ' + this.filter().from + ' to ' + this.filter().to + '.'
  );
  protected basket: Record<number, boolean> = {
    3: true,
    5: true
  };
  protected flights$ = this.ticketsFacade.flights$;

  constructor() {
    // let activeConsumer = effect(() => console.log(this.route()));
    const loggerEffectRef = effect(() => console.log(this.route()));
    // loggerEffectRef.destroy();

    console.log(this.route[SIGNAL]);
  }

  protected search(filter: FlightFilter): void {
    effect(() => console.log(this.route()), {
      injector: this.injector
    });
    
    this.filter.set(filter);

    if (!this.filter().from || !this.filter().to) {
      return;
    }

    this.ticketsFacade.search(this.filter());
  }

  protected delay(flight: Flight): void {
    const oldFlight = flight;
    const oldDate = new Date(oldFlight.date);

    const newDate = new Date(oldDate.getTime() + 1000 * 60 * 5); // Add 5 min
    const newFlight = {
      ...oldFlight,
      date: newDate.toISOString(),
      delayed: true
    };

    this.ticketsFacade.update(newFlight);
  }

  protected reset(): void {
    this.ticketsFacade.reset();
  }
}
