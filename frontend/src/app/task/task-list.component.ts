import { Component, inject, Input } from '@angular/core';
import { firstValueFrom, Observable, Subscription } from 'rxjs';
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

	private changeListener!: Subscription;

	private taskService = inject(TaskService);

	ngOnInit() {
		this.taskAddListener?.subscribe(title => this.addTask(title));

		void this.loadState();

		this.changeListener = this.taskService.hasChanges()
			.subscribe(() => void this.loadState())
	}

	ngOnDestroy() {
		this.changeListener?.unsubscribe();
	}

	async addTask(title: string) {
		const newTask: Task = {
			id: 0,
			completed: false,
			title,
		};

		await firstValueFrom(this.taskService.addTask(newTask));
	}

	async updateTask(task: Task) {
		await firstValueFrom(this.taskService.updateTask(task));
	}

	async deleteTask(task: Task) {
		await firstValueFrom(this.taskService.removeTask(task));
	}

	private async loadState() {
		const tasks = await firstValueFrom(this.taskService.fetchTasks());
		this.tasks = tasks.map(task => {
			const existingLocalTask = this.tasks.find(t => t.id === task.id);
			if (!existingLocalTask) {
				return task;
			} else {
				existingLocalTask.completed = task.completed;
				existingLocalTask.title = task.title;
				return existingLocalTask;
			}
		});
	}

}
