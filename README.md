import { Component } from '@angular/core';

@Component({
  selector: 'app-date-comparison',
  templateUrl: './date-comparison.component.html',
  styleUrls: ['./date-comparison.component.css']
})
export class DateComparisonComponent {

  today: Date;
  tomorrow: Date;
  comparisonResult: string;

  constructor() {
    this.today = new Date(); // Get today's date
    this.tomorrow = new Date();
    this.tomorrow.setDate(this.today.getDate() + 1); // Set tomorrow's date by adding 1 day to today

    this.compareDates();
  }

  compareDates() {
    // Compare the two dates
    if (this.today.getDate() === this.tomorrow.getDate()) {
      this.comparisonResult = 'Today and tomorrow are the same date.';
    } else {
      this.comparisonResult = `Today is ${this.today.toDateString()} and tomorrow is ${this.tomorrow.toDateString()}.`;
    }
  }
}
