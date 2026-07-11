import { Component, HostListener, OnInit, inject } from '@angular/core';
import { profile } from '../../data/profile';
import { ThemeService } from '../../services/theme.service';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  private readonly themeService = inject(ThemeService);

  readonly profile = profile;
  readonly theme = this.themeService;
  menuOpen = false;
  scrolled = false;
  activeSection = 'about';

  readonly links = [
    { label: 'About', href: '#about', id: 'about' },
    { label: 'Skills', href: '#skills', id: 'skills' },
    { label: 'Work', href: '#projects', id: 'projects' },
    { label: 'Experience', href: '#experience', id: 'experience' },
    { label: 'Contact', href: '#contact', id: 'contact' },
  ];

  ngOnInit(): void {
    queueMicrotask(() => this.updateActiveSection());
    setTimeout(() => this.updateActiveSection(), 500);

    if (window.location.hash) {
      setTimeout(() => {
        document.querySelectorAll('.reveal:not(.reveal--visible)').forEach((node) => {
          node.classList.add('reveal--visible');
        });
        this.updateActiveSection();
      }, 100);
    }
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
    this.updateActiveSection();
  }

  @HostListener('window:resize')
  onResize(): void {
    this.updateActiveSection();
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }

  toggleTheme(): void {
    this.themeService.toggle();
  }

  goToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.activeSection = sectionId === 'top' ? 'about' : sectionId;

    document.querySelectorAll('.reveal:not(.reveal--visible)').forEach((node) => {
      node.classList.add('reveal--visible');
    });

    const el = document.getElementById(sectionId);
    if (!el) {
      return;
    }

    const navOffset = this.readNavOffset();
    const top = el.getBoundingClientRect().top + window.scrollY - navOffset;

    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
    history.replaceState(null, '', `#${sectionId}`);
  }

  private updateActiveSection(): void {
    const navOffset = this.readNavOffset() + 8;
    let current = this.links[0].id;

    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (!el) {
        continue;
      }

      if (el.getBoundingClientRect().top - navOffset <= 0) {
        current = link.id;
      }
    }

    const docHeight = document.documentElement.scrollHeight;
    const atBottom =
      docHeight > window.innerHeight + 200 &&
      window.innerHeight + window.scrollY >= docHeight - 48;
    if (atBottom) {
      current = this.links[this.links.length - 1].id;
    }

    this.activeSection = current;
  }

  private readNavOffset(): number {
    const raw = getComputedStyle(document.documentElement)
      .getPropertyValue('--nav-offset')
      .trim();
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed * (raw.endsWith('rem') ? 16 : 1) : 92;
  }
}
