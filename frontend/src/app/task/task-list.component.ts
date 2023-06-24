import { Component } from '@angular/core';
import { Task } from '../model';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	tasks: Task[] = [
		{
			completed: true,
			title: 'Tehtävien listaus',
		},
		{
			completed: false,
			title: 'Tehtävien lisääminen',
		},
		{
			completed: false,
			title: 'Tehtävien poistaminen',
		},
		{
			completed: false,
			title: 'Tilan säilyttäminen',
		}
	];

}
