import { Injectable, signal } from '@angular/core';

export type ToastKind = 'success' | 'error';

export interface ToastState {
  kind: ToastKind;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  readonly toast = signal<ToastState | null>(null);
  private hideTimer = 0;

  success(message: string, durationMs = 4200): void {
    this.show({ kind: 'success', message }, durationMs);
  }

  error(message: string, durationMs = 5000): void {
    this.show({ kind: 'error', message }, durationMs);
  }

  dismiss(): void {
    if (this.hideTimer) {
      window.clearTimeout(this.hideTimer);
      this.hideTimer = 0;
    }
    this.toast.set(null);
  }

  private show(state: ToastState, durationMs: number): void {
    this.dismiss();
    this.toast.set(state);
    this.hideTimer = window.setTimeout(() => this.dismiss(), durationMs);
  }
}
