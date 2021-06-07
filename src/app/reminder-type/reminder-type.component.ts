import { Component, Input, OnInit } from '@angular/core';
import { ReminderService } from '../services/reminder.service';

@Component({
	selector: 'app-reminder-type',
	templateUrl: './reminder-type.component.html',
	styleUrls: ['./reminder-type.component.scss'],
})
export class ReminderTypeComponent implements OnInit {
	@Input() title!: string;
	@Input() icon!: string;
	@Input() theme!: string;
	@Input() amount: number = 0;

	constructor(private reminderService: ReminderService) {}

	ngOnInit(): void {
		const filter = this.title.toLowerCase();
		this.reminderService.getReminders(filter).subscribe((reminders) => (this.amount = reminders.length));
	}
}
