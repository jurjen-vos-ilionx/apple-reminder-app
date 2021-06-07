import { Component, Input, OnInit } from '@angular/core';
import { ReminderService } from '../../shared/services/reminder.service';

@Component({
	selector: 'app-nav-item',
	templateUrl: './nav-item.component.html',
	styleUrls: ['./nav-item.component.scss'],
})
export class NavItemComponent implements OnInit {
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
