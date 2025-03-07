import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { TranslationResponse } from '@interfaces/translate.interface';

const baseUrl: string = 'https://api.mymemory.translated.net';
@Injectable({ providedIn: 'root' })
export class TranslateService {
	private http = inject(HttpClient);

	translateText(
		text: string,
		sourceLang: string,
		targetLang: string,
	): Observable<string> {
		const url: string = `${baseUrl}/get?q=${text}&langpair=${sourceLang}|${targetLang}`;

		return this.http
			.get<TranslationResponse>(url)
			.pipe(
				map(
					(response: TranslationResponse) =>
						response.responseData.translatedText,
				),
			);
	}
}
