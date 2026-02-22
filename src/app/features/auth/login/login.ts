import { Component } from '@angular/core';
import { RouterLink } from "@angular/router";
import { ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [RouterLink, ReactiveFormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {

  form: any

  constructor(private fb: FormBuilder,private http: HttpClient,private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password: ['']
    })
  }

  showPassword = false

  togglePassword(){
    this.showPassword = !this.showPassword
  }

  login(){
    const loginData = {
    email: this.form.value.email,
    password: this.form.value.password
  };

 this.http.post<any>('http://localhost:8080/api/auth/login', loginData)
  .subscribe({
    next: (res) => {
      console.log(res.message);

      if (res.message === 'Login successful!') {
        // alert('Login Success');
        this.router.navigate(['']); // or any route you want

      } else {
        alert(res.message);
      }
    },
    error: (err) => {
      console.log(err);
    }
  });
  }

}
