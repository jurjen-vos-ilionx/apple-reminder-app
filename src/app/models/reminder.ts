export class Reminder {
	id!: string;
	title: string = '';
	notes: string = '';
	date: string = '';
	time?: string = '';
	flagged: boolean = false;
	done: boolean = false;
}
