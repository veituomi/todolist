import { Component, Input } from '@angular/core';
import { Task } from '../model';
import { Observable, firstValueFrom } from 'rxjs';
import { TaskService } from './task.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	@Input()
	taskAddListener?: Observable<void>;

	allowDelete = false;

	tasks: Task[] = [];

	private runningIndex = 1;

	constructor(
		private taskService: TaskService,
	) {}

	ngOnInit() {
		this.taskAddListener?.subscribe(() => this.addTask());

		void this.loadState();
	}

	addTask() {
		const newTask: Task = {
			completed: false,
			title: `Uusi tehtävä ${this.runningIndex}`,
		};
		this.runningIndex += 1;
		this.tasks = [...this.tasks, newTask];

		void this.saveState();
	}

	deleteTask(index: number) {
		this.tasks = this.tasks.filter((_, i) => i !== index);

		if (this.tasks.length === 0) {
			this.allowDelete = false;
		}

		void this.saveState();
	}

	private async loadState() {
		this.tasks = await firstValueFrom(this.taskService.fetchTasks());
	}

	private async saveState() {
		await firstValueFrom(this.taskService.saveTasks(this.tasks));
	}

}
