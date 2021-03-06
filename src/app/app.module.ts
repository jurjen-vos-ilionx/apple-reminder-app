import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ClickOutsideModule } from 'ng-click-outside';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './nav/navbar/navbar.component';
import { ReminderPageComponent } from './reminder/reminder-page/reminder-page.component';
import { HttpClientModule } from '@angular/common/http';
import { DateNamePipe } from './shared/pipes/date-name.pipe';
import { DatePipe } from '@angular/common';
import { ReminderComponent } from './reminder/reminder-item/reminder-item.component';
import { FormsModule } from '@angular/forms';
import { environment } from 'src/environments/environment';
import { ToggleComponent } from './shared/toggle/toggle.component';
import { ReminderMenuComponent } from './reminder/reminder-menu/reminder-menu.component';
import { NavItemComponent } from './nav/nav-item/nav-item.component';

const reminderTypes = [
	{
		type: 'today',
		theme: 'primary',
	},
	{
		type: 'scheduled',
		theme: 'secondary',
	},
	{
		type: 'all',
		theme: 'quaternary',
	},
	{
		type: 'flagged',
		theme: 'tertiary',
	},
];

const routes: Routes = [
	...reminderTypes.map(({ type, theme }) => ({
		path: type,
		component: ReminderPageComponent,
		data: { title: type, theme: theme, filter: type },
	})),
	{
		path: '',
		component: ReminderPageComponent,
		data: { title: 'Today', theme: 'primary', filter: 'today' },
	},
];

@NgModule({
	declarations: [
		AppComponent,
		NavbarComponent,
		NavItemComponent,
		ReminderPageComponent,
		DateNamePipe,
		ReminderComponent,
		ToggleComponent,
		ReminderMenuComponent,
	],
	imports: [
		FormsModule,
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFireDatabaseModule,
		RouterModule.forRoot(routes),
		ClickOutsideModule,
	],
	providers: [DatePipe],
	bootstrap: [AppComponent],
})
export class AppModule {}
