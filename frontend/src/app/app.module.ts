import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { TaskItemComponent } from './task/task-item.component';
import { TaskListComponent } from './task/task-list.component';

@NgModule({
	declarations: [
		AppComponent,
		TaskItemComponent,
		TaskListComponent,
	],
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
