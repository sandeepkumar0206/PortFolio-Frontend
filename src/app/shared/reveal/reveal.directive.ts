import { Directive, ElementRef, OnDestroy, OnInit, inject } from '@angular/core';

@Directive({
  selector: '[appReveal]',
  standalone: true,
})
export class RevealDirective implements OnInit, OnDestroy {
  private readonly el = inject(ElementRef<HTMLElement>);
  private observer?: IntersectionObserver;

  ngOnInit(): void {
    const node = this.el.nativeElement;
    // Always visible first — never leave the page blank if the observer fails.
    node.classList.add('reveal', 'reveal--visible');

    if (typeof IntersectionObserver === 'undefined') {
      return;
    }

    // Optional entrance: only re-animate when scrolling up from below the fold.
    const rect = node.getBoundingClientRect();
    if (rect.top < window.innerHeight * 0.92) {
      return;
    }

    node.classList.remove('reveal--visible');

    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            node.classList.add('reveal--visible');
            this.observer?.unobserve(node);
          }
        }
      },
      { threshold: 0.08, rootMargin: '0px 0px -5% 0px' }
    );

    this.observer.observe(node);
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
  }
}
