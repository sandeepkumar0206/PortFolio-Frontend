import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { ContactService } from '../../services/contact.service';
import { ToastService } from '../../services/toast.service';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, RevealDirective],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
})
export class ContactComponent {
  private readonly fb = inject(FormBuilder);
  private readonly contactService = inject(ContactService);
  private readonly toast = inject(ToastService);

  readonly profile = profile;
  submitting = false;
  errorMessage = '';

  readonly form = this.fb.nonNullable.group({
    name: ['', [Validators.required, Validators.maxLength(120)]],
    email: ['', [Validators.required, Validators.email, Validators.maxLength(255)]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]],
  });

  get messageLength(): number {
    return this.form.controls.message.value?.length ?? 0;
  }

  submit(): void {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.submitting = true;
    this.contactService.submit(this.form.getRawValue()).subscribe({
      next: () => {
        this.form.reset();
        this.submitting = false;
        this.toast.success("Thanks — I've got your message and I'll reach out to you soon.");
      },
      error: (err) => {
        const fields = err?.error?.fields;
        if (fields) {
          this.errorMessage = Object.values(fields).join(' ');
        } else {
          this.errorMessage = 'Could not send your message. Is the API running?';
        }
        this.submitting = false;
      },
    });
  }
}
