import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Reminder } from '../../shared/models/reminder';
import { ReminderService } from '../../shared/services/reminder.service';

@Component({
	selector: 'app-reminder-page',
	templateUrl: './reminder-page.component.html',
	styleUrls: ['./reminder-page.component.scss'],
})
export class ReminderPageComponent implements OnInit {
	title: string = '';
	theme: string = 'primary';
	filter: string = 'all';

	reminders: Reminder[] = [];
	selectedReminder?: number;

	constructor(
		private route: ActivatedRoute,
		private reminderService: ReminderService,
	) {}

	ngOnInit(): void {
		this.route.data.subscribe(({ title, theme, filter }) => {
			this.title = title;
			this.theme = theme;
			this.filter = filter;
		});

		this.reminderService.getReminders(this.filter).subscribe((reminders) => {
			this.reminders = reminders;
		});
	}

	setSelected(index: number): void {
		this.selectedReminder = index;
	}

	addReminder(): void {
		const reminder = new Reminder();
		reminder.id = (this.reminders.length + 1).toString();

		if (this.filter === 'today' || this.filter === 'scheduled') {
			reminder.date = new Date().toLocaleDateString();
		}

		if (this.filter === 'flagged') {
			reminder.flagged = true;
		}

		this.reminderService.addReminder(Object.assign({}, reminder));
	}
}
