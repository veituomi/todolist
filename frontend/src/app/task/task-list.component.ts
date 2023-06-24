import { Component, Input } from '@angular/core';
import { Task } from '../model';
import { Observable } from 'rxjs';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	@Input()
	taskAddListener?: Observable<void>;

	allowDelete = false;

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
			completed: true,
			title: 'Tehtävien poistaminen',
		},
		{
			completed: false,
			title: 'Tilan säilyttäminen',
		}
	];

	private runningIndex = 1;

	ngOnInit() {
		this.taskAddListener?.subscribe(() => {
			const newTask: Task = {
				completed: false,
				title: `Uusi tehtävä ${this.runningIndex}`,
			};
			this.runningIndex += 1;
			this.tasks = [...this.tasks, newTask];
		});
	}

	deleteTask(index: number) {
		this.tasks = this.tasks.filter((_, i) => i !== index);

		if (this.tasks.length === 0) {
			this.allowDelete = false;
		}
	}

}
