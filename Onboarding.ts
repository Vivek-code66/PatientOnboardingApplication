// app.module.ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NotificationSettingsComponent } from './notification-settings/notification-settings.component';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [
    AppComponent,
    NotificationSettingsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [NotificationService],
  bootstrap: [AppComponent]
})
export class AppModule { }

// app.component.ts
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `<app-notification-settings></app-notification-settings>`,
  styles: []
})
export class AppComponent { }

// notification-settings.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NotificationService } from '../notification.service';

@Component({
  selector: 'app-notification-settings',
  templateUrl: './notification-settings.component.html',
  styleUrls: ['./notification-settings.component.css']
})
export class NotificationSettingsComponent implements OnInit {
  notificationForm: FormGroup;

  constructor(private fb: FormBuilder, private notificationService: NotificationService) {
    this.notificationForm = this.fb.group({
      messageAlerts: [true],
      updateAlerts: [true],
      emailNotifications: [false]
    });
  }

  ngOnInit(): void {
    this.loadPreferences();
  }

  loadPreferences(): void {
    this.notificationService.getPreferences().subscribe(preferences => {
      this.notificationForm.patchValue(preferences);
    });
  }

  savePreferences(): void {
    this.notificationService.savePreferences(this.notificationForm.value).subscribe(response => {
      console.log('Preferences saved:', response);
    });
  }
}

// notification-settings.component.html
<form [formGroup]="notificationForm" (ngSubmit)="savePreferences()">
  <label>
    <input type="checkbox" formControlName="messageAlerts">
    Message Alerts
  </label>
  <br>
  <label>
    <input type="checkbox" formControlName="updateAlerts">
    Update Alerts
  </label>
  <br>
  <label>
    <input type="checkbox" formControlName="emailNotifications">
    Email Notifications
  </label>
  <br>
  <button type="submit">Save Preferences</button>
</form>

// notification-settings.component.css
label {
  display: block;
  margin-bottom: 10px;
}

// notification.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = 'http://localhost:3000/preferences';

  constructor(private http: HttpClient) { }

  getPreferences(): Observable<any> {
    return this.http.get(this.apiUrl);
  }

  savePreferences(preferences: any): Observable<any> {
    return this.http.post(this.apiUrl, preferences);
  }
}