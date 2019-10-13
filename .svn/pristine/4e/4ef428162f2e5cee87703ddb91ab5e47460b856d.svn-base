import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-terms-and-conditions',
  templateUrl: './terms-and-conditions.component.html',
  styleUrls: ['./terms-and-conditions.component.css']
})
export class TermsAndConditionsComponent implements OnInit {
  terms: boolean;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
  }

  onTermsSubmit() {
    const userData = {
      userId: this.authService.getUserData('userId'),
      clientName: sessionStorage.getItem('SUBDOMAIN'),
    };

    this.authService.checkTerms(userData).subscribe((res: any) => {
      if (res.OK) {
        this.router.navigate(['/cards']);
      }
    });
  }
}
