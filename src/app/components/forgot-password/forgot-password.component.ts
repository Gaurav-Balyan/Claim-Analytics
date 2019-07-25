import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  email: string;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {}

  resetPassword() {
    this.router.navigateByUrl('/resetPassword');
  }

  cancel() {
    this.router.navigateByUrl('/login');
  }

  /* resetPassword2() {

    if (!this.email) {
      alert('Type in your email first');
    }
    this.authService.resetPasswordInit(this.email)
      .then(
        () => alert('A password reset link has been sent to your email address'), 
            (rejectionReason) => alert(rejectionReason))
          .catch(e => alert('An error occurred while attempting to reset your password')); 
  } */
}
