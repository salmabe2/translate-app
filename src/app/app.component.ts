import { Component, inject, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';

import { TranslateBoxComponent } from './components/translate-box/translate-box.component';
import { TranslateService } from '@services/translate.service';
import { DropdownMenuItem } from '@shared/interfaces/dropdown.interface';
import { of } from 'rxjs';
@Component({
	selector: 'app-root',
	imports: [TranslateBoxComponent],
	templateUrl: './app.component.html',
	styleUrl: './app.component.css',
})
export class AppComponent {
	private translateService = inject(TranslateService);

	/** Source text input by the user */
	public sourceText = signal<string>('');

	/** Translated text output */
	public translatedText = signal<string>('');

	public sourceLang = signal<DropdownMenuItem>({
		description: 'English',
		value: 'en',
	});

	public targetLang = signal<DropdownMenuItem>({
		description: 'Italian',
		value: 'it',
	});

	translatedTextResource = rxResource({
		request: () => ({
			text: this.sourceText(),
			sourceLang: this.sourceLang().value,
			targetLang: this.targetLang().value,
		}),
		loader: ({ request }) => {
			const { text, sourceLang, targetLang } = request;

			if (!text) {
				this.translatedText.set('');
			}

			if (!text || !sourceLang || !targetLang) {
				return of('');
			}

			return this.translateService.translateText(text, sourceLang, targetLang);
		},
	});
}
