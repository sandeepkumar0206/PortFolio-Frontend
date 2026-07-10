import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { profile } from '../../data/profile';

@Component({
  selector: 'app-nav',
  standalone: true,
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss',
})
export class NavComponent implements OnInit, OnDestroy {
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

  private observer?: IntersectionObserver;

  ngOnInit(): void {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            this.activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-40% 0px -50% 0px', threshold: 0 }
    );

    // Home is lazy-loaded; wait a tick for section anchors to exist.
    queueMicrotask(() => this.observeSections());
    setTimeout(() => this.observeSections(), 500);
  }

  private observeSections(): void {
    if (!this.observer) {
      return;
    }
    for (const link of this.links) {
      const el = document.getElementById(link.id);
      if (el) {
        this.observer.observe(el);
      }
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }

  @HostListener('window:scroll')
  onScroll(): void {
    this.scrolled = window.scrollY > 24;
  }

  toggleMenu(): void {
    this.menuOpen = !this.menuOpen;
  }

  closeMenu(): void {
    this.menuOpen = false;
  }
}
