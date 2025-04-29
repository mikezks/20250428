import { NgIf } from '@angular/common';
import { Component, effect, inject, input, numberAttribute } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { PassengerService } from '../../logic-passenger/data-access/passenger.service';
import { validatePassengerStatus } from '../../util-validation';


@Component({
  selector: 'app-passenger-edit',
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink
  ],
  templateUrl: './passenger-edit.component.html'
})
export class PassengerEditComponent {
  private passengerService = inject(PassengerService);

  id = input(0, { transform: numberAttribute });
  passengerResource = this.passengerService.findByIdAsResource(this.id);

  protected editForm = inject(NonNullableFormBuilder).group({
    id: [0],
    firstName: ['INIT'],
    name: [''],
    bonusMiles: [0],
    passengerStatus: ['', [
      validatePassengerStatus(['A', 'B', 'C'])
    ]]
  });

  constructor() {
    effect(() => {
      if (this.passengerResource.hasValue()) {
        this.editForm.patchValue(this.passengerResource.value());
      }
    });
  }

  protected save(): void {
    console.log(this.editForm.value);
  }
}
