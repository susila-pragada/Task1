import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MasterService } from '../services/master.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private http: HttpClient
  ) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', [Validators.required]],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  onSubmit() {
    
    this.http.post<any>("http://localhost:3000/signupData",this.registerForm.value)
    .subscribe((_res: any)=>{
      alert('signup successfully');
      this.registerForm.reset();
      this.router.navigate(['/login']);
      },
      (_err: any)=>{
        alert('something went wrong' );
   })   
    }
  }

