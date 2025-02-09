import {Injectable, HostListener} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WindowSizeService {
  private sizeSubject = new BehaviorSubject<{ width: number; height: number }>({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  size$ = this.sizeSubject.asObservable();

  constructor() {
    // Escuta mudanças no tamanho da tela
    window.addEventListener('resize', this.updateSize.bind(this));
  }

  private updateSize(): void {
    this.sizeSubject.next({
      width: window.innerWidth,
      height: window.innerHeight,
    });
  }

  private applyPercentage(value: number, percentage: number): number {
    return value * percentage;
  }

  // Método para obter o valor mais recente sincronamente
  getCurrentSize(): { width: number; height: number } {
    return this.sizeSubject.getValue();
  }

  getCurrentWidthByPercentage(valuePercentage: number): number {
    const currentWidth = this.sizeSubject.getValue().width;
    const percentage = this.applyPercentage(currentWidth, valuePercentage);
    return currentWidth - percentage;
  }

  getCurrentHeightByPercentage(valuePercentage: number): number {
    const currentHeight = this.sizeSubject.getValue().height;
    const percentage = this.applyPercentage(currentHeight, valuePercentage);
    return currentHeight - percentage;
  }
}
