import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../core/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  formMessage = '';

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly authService: AuthService,
  ) {
    this.loginForm = this.formBuilder.group({
      username: ['carlos.gardel', [Validators.required, Validators.minLength(3)]],
      password: ['123456', [Validators.required, Validators.minLength(1)]],
    });
  }

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.router.navigate(['/chat']);
    }
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

    const username = this.loginForm.get('username')?.value?.trim() as string;
    const password = this.loginForm.get('password')?.value as string;

    const loginOk = this.authService.login(username, password);

    if (!loginOk) {
      this.formMessage = 'Invalid credentials for mock backend.';
      return;
    }

    this.router.navigate(['/chat']);
  }
}
