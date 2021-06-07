import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { AngularFirestore, CollectionReference, DocumentReference } from '@angular/fire/firestore';

import { Reminder } from '../models/reminder';

@Injectable({
	providedIn: 'root',
})
export class ReminderService {
	constructor(private firestore: AngularFirestore) {}

	public getReminders(filter: string): Observable<Reminder[]> {
		return this.firestore
			.collection<Reminder>('/reminders', (ref) => this.filterReminders(ref, filter))
			.valueChanges();
	}

	private filterReminders(ref: CollectionReference, filter: string) {
		switch (filter) {
			case 'today':
				return ref.where('date', '==', new Date().toLocaleDateString()).where('done', '==', false);
			case 'flagged':
				return ref.where('flagged', '==', true);
			case 'scheduled':
				return ref.where('date', '!=', '');
			default:
				return ref.orderBy('id', 'asc');
		}
	}

	public async addReminder(reminder: Reminder): Promise<void> {
		return this.firestore.collection<Reminder>('reminders').doc(reminder.id).set(reminder);
	}

	public async deleteReminder(reminder: Reminder): Promise<void> {
		return this.firestore.collection<Reminder>('reminders').doc(reminder.id).delete();
	}

	public async editReminder(reminder: Reminder): Promise<void> {
		if (reminder.title === '') {
			return this.firestore.collection<Reminder>('reminders').doc(reminder.id).delete();
		}

		return this.firestore.collection<Reminder>('reminders').doc(reminder.id).set(reminder);
	}
}
