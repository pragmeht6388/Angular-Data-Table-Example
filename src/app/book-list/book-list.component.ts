import { Component, input } from '@angular/core';
import { Book } from '../../Models/class/book.model';
import { BookComponent } from '../book/book.component';

@Component({
  selector: 'app-book-list',
  standalone: true,
  imports: [BookComponent],
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css'
})
export class BookListComponent {
 books:Book[]= [
  {
      title: "The Silent Observer",
      synopsis: "A psychological thriller that explores the mind of an introverted detective solving a high-profile case."
  },
  {
      title: "Echoes of the Past",
      synopsis: "A historical novel that weaves together stories from ancient civilizations and their impact on modern society."
  },
  {
      title: "Galactic Odyssey",
      synopsis: "A sci-fi adventure following a group of explorers discovering new galaxies and encountering unknown life forms."
  },
  {
      title: "The Art of Letting Go",
      synopsis: "A self-help book that guides readers through mindfulness techniques and emotional healing."
  },
  {
      title: "Code Unlocked",
      synopsis: "A guide for aspiring programmers, covering best practices, coding patterns, and software development strategies."
  }
];

book=input.required<Book>();

}
