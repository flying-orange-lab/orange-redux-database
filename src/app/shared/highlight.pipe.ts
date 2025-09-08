import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string, searchContext: string | null): SafeHtml {
    searchContext = (searchContext || '').trim();
    if (!searchContext) return value;

    const re = new RegExp(`(${searchContext})`, 'gi');
    const replaced = value.replace(re, `<b class="find-context">$1</b>`);

    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }
}
