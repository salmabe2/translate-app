import { CommonModule } from '@angular/common';
import { Component, inject, input, output } from '@angular/core';
import { UtilsService } from '@shared/services/utils.service';

@Component({
	selector: 'app-copy-text-button',
	imports: [CommonModule],
	templateUrl: './copy-text-button.component.html',
	styleUrl: './copy-text-button.component.css',
})
export class CopyTextButtonComponent {
	private utilsService = inject(UtilsService);

	public isCopied: boolean = false;

	public value = input.required<string>();
	public onCopyText = output<boolean>();

	public async onCopyClick() {
		if (this.value() !== '') {
			const copied = await this.utilsService.copyToClipboard(this.value());
			if (copied) {
				this.isCopied = true;
				// Hide the tooltip after 2 seconds
				setTimeout(() => {
					this.isCopied = false;
				}, 2000);
			}
		}
	}
}
