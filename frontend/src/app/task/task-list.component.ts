import { Component, Input } from '@angular/core';
import { Task } from '../model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	@Input()
	addListener?: Observable<void>;

	tasks: Task[] = [
		{
			completed: true,
			title: 'Tehtävien listaus',
		},
		{
			completed: true,
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

	ngOnInit() {
		this.addListener?.subscribe(() => {
			const newTask: Task = {
				completed: false,
				title: `Tehtävä ${this.tasks.length + 1}`,
			};
			this.tasks = [...this.tasks, newTask];
		});
	}

}
