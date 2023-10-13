import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  submitted = false;

  constructor(private ms:MasterService,private fb: FormBuilder, private router: Router,private http:HttpClient) {}

  ngOnInit() {
   
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }
  onSubmit() {
    const email = this.loginForm.value.Email;
    const password = this.loginForm.value.Password;

    this.ms.login(email, password).subscribe((loggedIn: any) => {
      if (loggedIn) {
        alert('Login successful');
        this.loginForm.reset();
        this.router.navigate(['/dashboard']);
      } else {
        alert('User not found');
      }
    }, (_err: any) => {
      alert('Something went wrong');
    });

    }  }
