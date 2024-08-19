import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
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
		FormsModule,
		HttpClientModule,
		MaterialModule,
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
