import {
	booleanAttribute,
	Component,
	input,
	linkedSignal,
	model,
	OnDestroy,
	OnInit,
	output,
} from '@angular/core';
import { debounceTime, Subject, Subscription } from 'rxjs';

import { DropdownMenuItem } from '../../shared/interfaces/dropdown.interface';
import { DropdownComponent } from '../../shared/components/dropdown/dropdown.component';

@Component({
	selector: 'app-translate-box',
	imports: [DropdownComponent],
	templateUrl: './translate-box.component.html',
	styleUrl: './translate-box.component.css',
})
export class TranslateBoxComponent implements OnInit, OnDestroy {
	private debouncer: Subject<string> = new Subject<string>();
	private debouncerSubscription?: Subscription;

	public languagesDropdownItems: DropdownMenuItem[] = [
		{ description: 'English', value: 'en' },
		{ description: 'Italian', value: 'it' },
		{ description: 'Spanish', value: 'es' },
	];

	/** Stores the user-entered text */
	public textValue = model<string>('');

	/** Stores the selected language */
	public lang = model<DropdownMenuItem>();

	/**
	 * Whether this is the translation source or target box
	 * @default false
	 */
	public source = input(false, { transform: booleanAttribute });

	/** Emits translated text when input changes */
	public onTranslation = output<string>();

	/** Emits selected language code when a language is chosen */
	public onLanguageSelect = output<string>();

	/** Debouncer subscription to avoid multiple API calls */
	ngOnInit(): void {
		this.debouncerSubscription = this.debouncer
			.pipe(debounceTime(300))
			.subscribe((value) => {
				this.onTranslation.emit(value);
			});
	}

	/** Cleans up subscriptions to prevent memory leaks */
	ngOnDestroy(): void {
		this.debouncerSubscription?.unsubscribe();
	}

	/**
	 * Updates text value and triggers debouncer for translation
	 * @param value - The new text input
	 */
	public emitText(value: string): void {
		this.textValue.set(value);
		this.debouncer.next(value);
	}

	/**
	 * Updates selected language and emits the selection event
	 * @param lang - Selected language object
	 */
	public selectLanguage(lang: DropdownMenuItem): void {
		this.lang.set(lang);
		this.onLanguageSelect.emit(lang.value);
	}
}
