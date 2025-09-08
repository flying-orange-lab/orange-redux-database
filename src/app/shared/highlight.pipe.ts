import { inject, Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  private sanitizer = inject(DomSanitizer);

  transform(value: string, searchContext: string | null): SafeHtml {
    if (!searchContext) return value;

    // 검색어를 이스케이프 후 RegExp 생성
    const re = new RegExp(`(${searchContext})`, 'gi');
    const replaced = value.replace(re, `<b class="find-context">$1</b>`);

    return this.sanitizer.bypassSecurityTrustHtml(replaced);
  }
}
