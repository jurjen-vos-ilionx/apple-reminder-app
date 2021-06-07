import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { add, format } from 'date-fns';

@Pipe({
	name: 'dateName',
})
export class DateNamePipe implements PipeTransform {
	constructor(private datePipe: DatePipe) {}

	transform(value: string, formatString: string): string | null {
		const today = new Date();
		const tomorrow = add(today, { days: 1 });

		if (format(today, 'dd/MM/yyy') === value) return 'Today';
		if (format(tomorrow, 'dd/MM/yyy') === value) return 'Tomorrow';

		return this.datePipe.transform(value, formatString);
	}
}
