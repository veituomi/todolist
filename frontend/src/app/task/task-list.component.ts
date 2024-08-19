import { Component, inject, Input } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
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

	private taskService = inject(TaskService);

	ngOnInit() {
		this.taskAddListener?.subscribe(title => this.addTask(title));

		void this.loadState();
	}

	async addTask(title: string) {
		const newTask: Task = {
			id: 0,
			completed: false,
			title,
		};

		await firstValueFrom(this.taskService.addTask(newTask));
		await this.loadState();
	}

	async updateTask(task: Task) {
		await firstValueFrom(this.taskService.updateTask(task));
		await this.loadState();
	}

	async deleteTask(task: Task) {
		await firstValueFrom(this.taskService.removeTask(task));
		await this.loadState();
	}

	private async loadState() {
		this.tasks = await firstValueFrom(this.taskService.fetchTasks());
	}

}
