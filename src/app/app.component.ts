import { Component, inject } from '@angular/core';

import { TranslateBoxComponent } from './components/translate-box/translate-box.component';
import { TranslateService } from '@services/translate.service';
import { DropdownMenuItem } from '@shared/interfaces/dropdown.interface';
@Component({
	selector: 'app-root',
	imports: [TranslateBoxComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	private translateService = inject(TranslateService);

	/** Source text input by the user */
	public sourceText: string = '';

	/** Translated text output */
	public translatedText: string = '';

	public sourceLang: DropdownMenuItem = { description: 'English', value: 'en' };
	public targetLang: DropdownMenuItem = { description: 'Italian', value: 'it' };

	/**
	 * Translates the given text using the selected languages.
	 * @param text - The text to be translated
	 */
	public translateText(text: string): void {
		if (text === '') {
			this.translatedText = '';
			return;
		}

		this.translateService
			.translateText(text, this.sourceLang.value, this.targetLang.value)
			.subscribe((res) => {
				this.translatedText = res;
			});
	}
}
