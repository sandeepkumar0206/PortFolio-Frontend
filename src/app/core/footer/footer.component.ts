import { Component } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-footer',
  standalone: true,
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss',
})
export class FooterComponent {
  readonly profile = profile;
  readonly year = new Date().getFullYear();
}