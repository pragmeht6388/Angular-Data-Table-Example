# Angular-Data-Table-Example

<mat-form-field>
  <input matInput [matDatepicker]="picker" placeholder="Choose a date" [min]="yesterday">
  <mat-datepicker-toggle matSuffix [for]="picker"></mat-datepicker-toggle>
  <mat-datepicker #picker></mat-datepicker>
</mat-form-field>

  @Input() min: any;
  yesterday = new Date();

  constructor() {
    this.yesterday.setDate(this.yesterday.getDate() - 0);
  }

  const tomorrow =  new Date(today.setDate(today.getDate() + 1));
