import { NgFor, NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { debounceTime, fromEvent, Subscription } from 'rxjs';

@Component({
  selector: 'app-seamless-flow',
  standalone: true,
  imports: [NgFor, NgIf],
  templateUrl: './seamless-flow.component.html',
  styleUrl: './seamless-flow.component.scss'
})
export class SeamlessFlowComponent implements AfterViewInit, OnDestroy {
  tabs = ['Tab 1', 'Tab 2', 'Tab 3'];
  activeTabIndex = 0;
  sectionOffsets: number[] = [];
  
  @ViewChild('scrollContainer') scrollContainer!: ElementRef;
  private scrollSubscription!: Subscription;
  
  constructor() {}

  ngAfterViewInit(): void {
    this.calculateSectionOffsets();
    // this.scrollContainer.nativeElement.addEventListener('scroll', this.handleScroll.bind(this));
    this.scrollSubscription  = fromEvent(this.scrollContainer.nativeElement, 'scroll')
      .pipe(debounceTime(100)) // Adjust the debounce time as needed
      .subscribe(() => this.handleScroll());
  }

  calculateSectionOffsets(): void {
    const sections = document.querySelectorAll('.section');
    let totalOffset = 0;
    this.sectionOffsets = Array.from(sections).map((section: Element) => {
      const offset = totalOffset;
      totalOffset += section.clientHeight;
      return offset;
    });
  }

  setActiveTab(index: number): void {
    this.activeTabIndex = index;
  }

  scrollToSection(index: number): void {
    if (this.scrollContainer) {
      this.scrollContainer.nativeElement.scrollTo({
        top: this.sectionOffsets[index],
        behavior: 'smooth'
      });
      this.setActiveTab(index);
    }
  }

  handleScroll(): void {
    console.log('handleScroll...')
    const scrollY = this.scrollContainer.nativeElement.scrollTop;

    for (let i = 0; i < this.sectionOffsets.length; i++) {
      if (scrollY >= this.sectionOffsets[i] && 
          (i === this.sectionOffsets.length - 1 || scrollY < this.sectionOffsets[i + 1])) {
        this.setActiveTab(i);
        break;
      }
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from the scroll event
    if (this.scrollSubscription) {
      this.scrollSubscription.unsubscribe();
    }
  }
}
