// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ChildInfoFormComponent } from './child-info-form/child-info-form.component';

@NgModule({
  declarations: [
    AppComponent,
    ChildInfoFormComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: '<app-child-info-form></app-child-info-form>',
  styleUrls: ['./app.component.css']
})
export class AppComponent { }

// child-info-form.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-child-info-form',
  templateUrl: './child-info-form.component.html',
  styleUrls: ['./child-info-form.component.css']
})
export class ChildInfoFormComponent {
  childInfoForm: FormGroup;
  uploadedFileName: string = '';

  constructor(private fb: FormBuilder) {
    this.childInfoForm = this.fb.group({
      name: [''],
      age: [''],
      document: [null]
    });
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.uploadedFileName = file.name;
      this.childInfoForm.patchValue({
        document: file
      });
    }
  }

  autoFill() {
    // Simulate auto-fill with static data
    this.childInfoForm.patchValue({
      name: 'John Doe',
      age: 10
    });
  }

  onSubmit() {
    if (this.childInfoForm.valid) {
      const formData = new FormData();
      formData.append('name', this.childInfoForm.get('name')?.value);
      formData.append('age', this.childInfoForm.get('age')?.value);
      formData.append('document', this.childInfoForm.get('document')?.value);

      // Simulate form submission
      console.log('Form Submitted', formData);
    }
  }
}

// child-info-form.component.html
<div>
  <form [formGroup]="childInfoForm" (ngSubmit)="onSubmit()">
    <div>
      <label for="name">Child's Name:</label>
      <input id="name" formControlName="name" type="text">
    </div>
    <div>
      <label for="age">Child's Age:</label>
      <input id="age" formControlName="age" type="number">
    </div>
    <div>
      <label for="document">Upload Document:</label>
      <input id="document" type="file" (change)="onFileChange($event)">
      <span *ngIf="uploadedFileName">{{ uploadedFileName }}</span>
    </div>
    <button type="button" (click)="autoFill()">Auto-Fill</button>
    <button type="submit">Submit</button>
  </form>
</div>

// child-info-form.component.css
form {
  display: flex;
  flex-direction: column;
  width: 300px;
}

div {
  margin-bottom: 10px;
}

button {
  margin-top: 10px;
}