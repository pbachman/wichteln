import { Component } from '@angular/core';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { BackendService } from './service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loading = false;
  success = false;
  error = '';
  profileForm = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.email, Validators.required]),
  });

  constructor(private service: BackendService) {
  }

  onSubmit(): void {
    this.loading = true;
    this.error = null;
    this.success = false;

    setTimeout(() => {
      this.service.draw(this.profileForm.value).subscribe(
        res => {
          this.loading = false;
          this.success = true;
          this.error = null;
        }, err => {
          this.error = err.status > 0 ? err.error : 'Ein Fehler ist aufgetreten!';
          this.loading = false;
        }, () => {
          this.loading = false;
        });
    }, 3000);
  }
}
