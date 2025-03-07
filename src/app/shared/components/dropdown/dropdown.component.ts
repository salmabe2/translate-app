import { CommonModule } from '@angular/common';
import {
	Component,
	ElementRef,
	input,
	model,
	output,
	signal,
	ViewChild,
} from '@angular/core';

import { DropdownMenuItem } from '@shared/interfaces/dropdown.interface';

@Component({
	selector: 'app-dropdown',
	imports: [CommonModule],
	templateUrl: './dropdown.component.html',
	styleUrl: './dropdown.component.css',
})
export class DropdownComponent {
	public isDropdownOpen = signal<boolean>(false);

	public label = input.required<string>();
	public menu = input.required<DropdownMenuItem[]>();
	public value = model<DropdownMenuItem>();
	public placeholder = input<string>('Select an option');

	public onSelect = output<DropdownMenuItem>();

	@ViewChild('dropdown') dropdown!: ElementRef;

	ngOnInit() {
		document.addEventListener('click', this.onDocumentClick.bind(this));
	}

	ngOnDestroy() {
		document.removeEventListener('click', this.onDocumentClick.bind(this));
	}

	/**
	 * Close dropdown when clicking outside of it	 *
	 */
	private onDocumentClick(event: MouseEvent): void {
		if (
			this.isDropdownOpen &&
			!this.dropdown.nativeElement.contains(event.target)
		) {
			this.isDropdownOpen.set(false);
		}
	}

	public selectOption(option: DropdownMenuItem): void {
		this.value.set(option);
		this.isDropdownOpen.set(false);
		this.onSelect.emit(option);
	}
}
