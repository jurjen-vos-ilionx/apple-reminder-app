import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { Option } from '../models/option';

@Component({
	selector: 'app-toggle',
	templateUrl: './toggle.component.html',
	styleUrls: ['./toggle.component.scss'],
})
export class ToggleComponent implements OnInit {
	@ViewChild('toggle') toggle!: ElementRef;
	@ViewChild('input') input!: ElementRef;

	@Input() type!: string;
	@Input() title?: string;
	@Input() icon?: string;
	@Input() options: Option[] = [];

	@Output() updateOption: EventEmitter<Option> = new EventEmitter<Option>();

	public toggled: boolean = false;

	constructor() {}

	ngOnInit(): void {}

	public toggleMenu(action: boolean = !this.toggled): void {
		this.toggled = action;
	}

	public selectOption(option: Option) {
		this.updateOption.emit(option);
		this.toggleMenu();
	}

	public onClickOutside(event: Event) {
		if (this.toggled) this.toggleMenu();
	}
}
