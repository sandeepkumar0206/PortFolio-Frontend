import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { aboutQuote, aboutStats, profile } from '../../data/profile';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss',
})
export class AboutComponent {
  readonly profile = profile;
  readonly stats = aboutStats;
  readonly quote = aboutQuote;
}
