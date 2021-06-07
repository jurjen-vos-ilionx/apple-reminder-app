import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Option } from '../../shared/models/option';
import { Reminder } from '../../shared/models/reminder';
import { ReminderService } from '../../shared/services/reminder.service';
import { add, format } from 'date-fns';

type State = 'adding' | 'editing' | 'finished' | string;

@Component({
	selector: 'app-reminder-item',
	templateUrl: './reminder-item.component.html',
	styleUrls: ['./reminder-item.component.scss'],
})
export class ReminderComponent implements OnInit, AfterViewInit {
	@ViewChild('titleInput') titleInput!: ElementRef;

	@Input() reminder!: Reminder;
	@Input() theme!: string;

	public newReminder!: Reminder;
	public state: State = 'adding';

	public dateOptions: Option[] = [
		{
			type: 'date',
			title: 'Today',
			value: format(new Date(), 'dd/MM/yyyy'),
		},
		{
			type: 'date',
			title: 'Tomorrow',
			value: format(add(new Date(), { days: 1 }), 'dd/MM/yyyy'),
		},
	];

	public timeOptions: Option[] = [
		{
			type: 'time',
			title: 'Morning',
			value: '09:00',
		},
		{
			type: 'time',
			title: 'Midday',
			value: '12:00',
		},
		{
			type: 'time',
			title: 'Afternoon',
			value: '15:00',
		},
		{
			type: 'time',
			title: 'Evening',
			value: '18:00',
		},
		{
			type: 'time',
			title: 'Night',
			value: '21:00',
		},
	];

	constructor(private reminderService: ReminderService) {}

	ngOnInit(): void {
		this.newReminder = { ...this.reminder };

		if (this.newReminder.title !== '') {
			this.toggleState('finished');
		}
	}

	ngAfterViewInit(): void {
		if (this.newReminder.title === '') {
			this.titleInput.nativeElement.focus();
		}
	}

	public toggleFlagged(): void {
		this.newReminder.flagged = !this.newReminder.flagged;
	}

	public updateOption({ type, value }: Option): void {
		if (type === 'date') this.newReminder.date = value;
		if (type === 'time') this.newReminder.time = value;
	}

	public editReminder(reminder: Reminder): void {
		this.reminderService.editReminder(reminder).then(() => {
			return this.toggleState('finished');
		});
	}

	public deleteReminder(reminder: Reminder): void {
		this.reminderService.deleteReminder(reminder);
	}

	public cancelReminder(): void {
		this.newReminder = { ...this.reminder };
		this.toggleState('finished');
	}

	public toggleState(state: State): void {
		this.state = state;
	}
}
