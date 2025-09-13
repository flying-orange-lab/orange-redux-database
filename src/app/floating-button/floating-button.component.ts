import { Component, inject } from '@angular/core';
import { HelperService } from '../services/helper.service';

@Component({
  selector: 'app-floating-button',
  imports: [],
  templateUrl: './floating-button.component.html',
  styleUrl: './floating-button.component.less',
})
export class FloatingButtonComponent {
  private helperService = inject(HelperService);

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  onHelpClick() {
    this.helperService.emitOpenHelper();
  }
}
