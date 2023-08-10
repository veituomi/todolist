import { Component, Input } from '@angular/core';
import { Observable, firstValueFrom } from 'rxjs';
import { Task } from '../model';
import { TaskService } from './task.service';

@Component({
	selector: 'app-task-list',
	styleUrls: ['./task-list.component.scss'],
	templateUrl: './task-list.component.html',
})
export class TaskListComponent {

	@Input()
	taskAddListener?: Observable<string>;

	allowDelete = false;

	tasks: Task[] = [];

	private runningIndex = 1;

	constructor(
		private taskService: TaskService,
	) {}

	ngOnInit() {
		this.taskAddListener?.subscribe(title => this.addTask(title));

		void this.loadState();
	}

	addTask(title: string) {
		const newTask: Task = {
			completed: false,
			title,
		};
		this.runningIndex += 1;
		this.tasks = [...this.tasks, newTask];

		void this.saveState();
	}

	updateTasks() {
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
