import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

export interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export interface ContactResponse {
  id: number;
  message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
  private readonly url = `${environment.apiBaseUrl}/api/contact`;

  constructor(private readonly http: HttpClient) {}

  submit(payload: ContactPayload): Observable<ContactResponse> {
    return this.http.post<ContactResponse>(this.url, payload);
  }
}