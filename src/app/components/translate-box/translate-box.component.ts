import {
	booleanAttribute,
	Component,
	effect,
	input,
	output,
	signal,
} from '@angular/core';

import { DropdownMenuItem } from '@shared/interfaces/dropdown.interface';
import { DropdownComponent } from '@shared/components/dropdown/dropdown.component';
import { CopyTextButtonComponent } from '@shared/components/copy-text-button/copy-text-button.component';

@Component({
	selector: 'app-translate-box',
	imports: [DropdownComponent, CopyTextButtonComponent],
	templateUrl: './translate-box.component.html',
	styleUrl: './translate-box.component.css',
})
export class TranslateBoxComponent {
	public languagesDropdownItems = signal<DropdownMenuItem[]>([
		{ description: 'English', value: 'en' },
		{ description: 'Italian', value: 'it' },
		{ description: 'Spanish', value: 'es' },
	]);

	public textValue = signal<string>('');
	public selectedLang = signal<DropdownMenuItem>({
		description: '',
		value: '',
	});

	public textInput = input<string>('');

	/**
	 * Whether this is the translation source or target box
	 * @default false
	 */
	public source = input(false, { transform: booleanAttribute });

	public onTextChange = output<string>();
	public onLanguageSelect = output<DropdownMenuItem>();

	/** Debouncer effect to avoid multiple API calls */
	debouncerEffect = effect((onCleanup) => {
		const value = this.textValue();
		const timeout = setTimeout(() => {
			this.onTextChange.emit(value);
		}, 500);

		onCleanup(() => {
			clearTimeout(timeout);
		});
	});

	/**
	 * Updates selected language and emits the selection event
	 * @param lang - Selected language object
	 */
	public selectLanguage(lang: DropdownMenuItem): void {
		this.selectedLang.set(lang);
		this.onLanguageSelect.emit(lang);
	}
}
