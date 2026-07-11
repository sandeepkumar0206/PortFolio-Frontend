import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { Project, projects } from '../../data/projects';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss',
})
export class ProjectsComponent {
  readonly projects: Project[] = projects;
}