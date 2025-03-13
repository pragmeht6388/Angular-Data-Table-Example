import { Component, input } from '@angular/core';
import { Book } from '../../Models/class/book.model';

@Component({
  selector: 'app-book',
  standalone: true,
  imports: [],
  templateUrl: './book.component.html',
  styleUrl: './book.component.css'
})
export class BookComponent {
  angularBook = {
    title: "Angular Core Deep Dive",
    synopsis: "A deep dive into Angular core concepts",
  };
  book=input.required<Book>();
}
