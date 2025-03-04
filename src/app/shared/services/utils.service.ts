import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class UtilsService {
	/**
	 * Copies the given text to the clipboard.
	 * @param text - The text to be copied
	 */
	public async copyToClipboard(text: string): Promise<boolean> {
		try {
			await navigator.clipboard.writeText(text);
			return true;
		} catch (err) {
			console.error('Failed to copy text:', err);
			return false;
		}
	}
}
