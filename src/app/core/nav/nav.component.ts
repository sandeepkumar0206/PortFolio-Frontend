import { Component, HostListener, OnInit } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit {
  readonly profile = profile;
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
    // Home is lazy-loaded; wait for section anchors to exist.
    queueMicrotask(() => this.updateActiveSection());
    setTimeout(() => this.updateActiveSection(), 500);

    // Deep link (#contact etc.): reveal any sections skipped by scroll jump.
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

  goToSection(event: Event, sectionId: string): void {
    event.preventDefault();
    this.closeMenu();
    this.activeSection = sectionId === 'top' ? 'about' : sectionId;

    // Menu jumps skip intermediate sections — keep them visible when scrolling back.
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

    // Near page bottom: force last section active (Contact).
    // Skip while the page is still short (home lazy-loading).
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
