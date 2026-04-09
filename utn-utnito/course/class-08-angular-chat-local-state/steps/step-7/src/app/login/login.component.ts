import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  loginForm: FormGroup;
  submitted = false;
  formMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }

  get usernameControl() {
    return this.loginForm.get('username');
  }

  get passwordControl() {
    return this.loginForm.get('password');
  }

  get showUsernameRequired(): boolean {
    return !!this.usernameControl?.touched && !!this.usernameControl?.hasError('required');
  }

  get showUsernameMinLength(): boolean {
    return !!this.usernameControl?.touched && !!this.usernameControl?.hasError('minlength');
  }

  get showPasswordRequired(): boolean {
    return !!this.passwordControl?.touched && !!this.passwordControl?.hasError('required');
  }

  onSubmit(): void {
    this.submitted = true;
    this.formMessage = '';

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      this.formMessage = 'Complete valid credentials to continue.';
      return;
    }

    this.router.navigate(['/chat']);
  }
}
