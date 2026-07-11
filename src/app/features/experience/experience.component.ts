import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { experiences } from '../../data/experience';

@Component({
  selector: 'app-experience',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './experience.component.html',
  styleUrl: './experience.component.scss',
})
export class ExperienceComponent {
  readonly experiences = experiences;
}