import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Reminder } from '../../shared/models/reminder';
import { ReminderService } from '../../shared/services/reminder.service';

@Component({
	selector: 'app-reminder-menu',
	templateUrl: './reminder-menu.component.html',
	styleUrls: ['./reminder-menu.component.scss'],
})
export class ReminderMenuComponent implements OnInit {
	@Input() theme!: string;
	@Input() reminder!: Reminder;

	@Output() toggleState: EventEmitter<string> = new EventEmitter<string>();

	public menuOpen: boolean = false;

	constructor(private reminderService: ReminderService) {}

	ngOnInit(): void {}

	public toggleMenu(): void {
		this.toggleState.emit(this.menuOpen ? 'finished' : 'editing');
		this.menuOpen = !this.menuOpen;
	}

	public onClickOutside(): void {
		if (this.menuOpen) this.toggleMenu();
	}

	public deleteReminder(): void {
		this.reminderService.deleteReminder(this.reminder).then(() => {
			this.toggleMenu();
		});
	}
}
