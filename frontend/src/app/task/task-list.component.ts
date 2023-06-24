import { Component } from '@angular/core';
import { Task } from '../model';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	tasks: Task[] = [
		{
			completed: false,
			title: 'Tehtävä',
		}
	];

}
