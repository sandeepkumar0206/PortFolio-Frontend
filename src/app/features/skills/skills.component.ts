import { Component } from '@angular/core';
import { RevealDirective } from '../../shared/reveal/reveal.directive';
import { skillGroups } from '../../data/skills';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [RevealDirective],
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.scss',
})
export class SkillsComponent {
  readonly groups = skillGroups;
}