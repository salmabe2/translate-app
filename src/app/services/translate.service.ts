import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { TranslationResponse } from '../interfaces/translate.interface';
import { map, Observable } from 'rxjs';

// interface State {
// 	translationSource: string;
// 	translatedText: string;
// }

@Injectable({ providedIn: 'root' })
export class TranslateService {
	private http = inject(HttpClient);
	private baseUrl: string = 'https://api.mymemory.translated.net';

	// #state = signal<State>({
	// 	translationSource: '',
	// 	translatedText: '',
	// });

	constructor() {}

	translateText(
		text: string,
		sourceLang: string,
		targetLang: string,
	): Observable<string> {
		const url: string = `${this.baseUrl}/get?q=${text}&langpair=${sourceLang}|${targetLang}`;

		return this.http
			.get<TranslationResponse>(url)
			.pipe(
				map(
					(response: TranslationResponse) =>
						response.responseData.translatedText,
				),
			);
	}

	getAllLanguages() {}
}
