import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  isCardOpened = true;

  constructor(private router: Router) {}

  ngOnInit() {}

  GoToDashboard() {
    this.router.navigateByUrl('/dashboard');
  }
}
