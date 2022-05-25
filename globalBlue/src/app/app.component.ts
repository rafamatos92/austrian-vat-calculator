import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ValueType } from 'src/shared';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  form: FormGroup;

  get net(): AbstractControl | null {
    return this.form?.get('net');
  }

  get gross(): AbstractControl | null {
    return this.form?.get('gross');
  }

  get vat(): AbstractControl | null {
    return this.form?.get('vat');
  }

  get rate(): AbstractControl | null {
    return this.form?.get('rate');
  }

  get valueType(): typeof ValueType {
    return ValueType;
  }

  constructor(private fb: FormBuilder) {
    this.form = this.initForm();
  }

  ngOnInit() {
    // Subscribe rate value to update values when changed
    this.rate?.valueChanges.subscribe((rate) => {
      const percentage = +rate / 100;
      this.form.patchValue({
        net: this.gross?.value - this.gross?.value * percentage,
        vat: this.gross?.value * percentage,
      });
    });

    // Set rate default value when starting
    this.rate?.setValue('10');
  }

  /**
   * Calculate net/gross/vat values when one is changed
   *
   * @param value entered value
   * @param enteredType input changed
   */
  valueChanged(value: number, enteredType: ValueType): void {
    const percentage = +this.rate?.value / 100;
    if (enteredType === this.valueType.NET) {
      this.form.patchValue({
        vat: +value * percentage,
        gross: +value + +value * percentage,
      });
    }
    if (enteredType === this.valueType.VAT) {
      this.form.patchValue({
        net: +value / percentage - +value,
        gross: +value / percentage,
      });
    }
    if (enteredType === this.valueType.GROSS) {
      this.form.patchValue({
        net: +value - +value * percentage,
        vat: +value * percentage,
      });
    }
  }

  /**
   * Create form group to page
   *
   * @returns formgroup with validators
   */
  initForm(): FormGroup {
    return this.fb.group({
      vat: [0, [Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      gross: [0, [Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      net: [0, [Validators.pattern('^[0-9]*$'), Validators.min(1)]],
      rate: [],
    });
  }
}
