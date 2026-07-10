import { Component } from '@angular/core';
import { AboutComponent } from '../about/about.component';
import { SkillsComponent } from '../skills/skills.component';
import { ProjectsComponent } from '../projects/projects.component';
import { ExperienceComponent } from '../experience/experience.component';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    AboutComponent,
    SkillsComponent,
    ProjectsComponent,
    ExperienceComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {
  readonly profile = profile;
}
