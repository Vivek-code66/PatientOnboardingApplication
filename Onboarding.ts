// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { OnboardingComponent } from './onboarding/onboarding.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: '/onboarding', pathMatch: 'full' },
  { path: 'onboarding', component: OnboardingComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    OnboardingComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent { }

// onboarding.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-onboarding',
  templateUrl: './onboarding.component.html',
  styleUrls: ['./onboarding.component.css']
})
export class OnboardingComponent implements OnInit {
  onboardingForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.onboardingForm = this.fb.group({
      name: [''],
      email: [''],
      phone: ['']
    });
  }

  ngOnInit(): void {
    this.autoFillForm();
  }

  autoFillForm() {
    // Simulate fetching data from an API or service
    const userData = {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    };
    this.onboardingForm.patchValue(userData);
  }

  onSubmit() {
    console.log('Form submitted:', this.onboardingForm.value);
  }
}

// onboarding.component.html
<div class="onboarding-container">
  <h2>Onboarding Process</h2>
  <form [formGroup]="onboardingForm" (ngSubmit)="onSubmit()">
    <div>
      <label for="name">Name</label>
      <input id="name" formControlName="name" type="text">
    </div>
    <div>
      <label for="email">Email</label>
      <input id="email" formControlName="email" type="email">
    </div>
    <div>
      <label for="phone">Phone</label>
      <input id="phone" formControlName="phone" type="tel">
    </div>
    <button type="submit">Submit</button>
  </form>
</div>

// onboarding.component.css
.onboarding-container {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.onboarding-container h2 {
  text-align: center;
}

.onboarding-container div {
  margin-bottom: 15px;
}

.onboarding-container label {
  display: block;
  margin-bottom: 5px;
}

.onboarding-container input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.onboarding-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.onboarding-container button:hover {
  background-color: #0056b3;
}