import { Component } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [HttpClientModule, ReactiveFormsModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

    form: any

    constructor(private fb: FormBuilder,private http: HttpClient,private router: Router) {
    this.form = this.fb.group({
      email: [''],
      password: [''],
      fullName:['']
    })
  }

 signUp() {
  const signupData = {
    email: this.form.value.email,
    password: this.form.value.password,
    fullName: this.form.value.fullName
  };

  this.http.post('http://localhost:8080/api/auth/signup', signupData)
    .subscribe({
      next: (response: any) => {
        console.log('Signup Success:', response);
        alert(response.message);

        if (response.message === "User registered successfully!") {
          this.form.reset();
          // Optional: navigate to login page
          this.router.navigate(['']);
        }
      },
      error: (error) => {
        console.error('Signup Error:', error);
        alert('Something went wrong!');
      }
    });
}


}
