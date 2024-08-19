import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Task } from '../model';

@Component({
	selector: 'app-task-item',
	templateUrl: './task-item.component.html',
})
export class TaskItemComponent {

	@Input({
		required: true
	})
	task!: Task;

	@Output()
	updateState = new EventEmitter<Task>();

}
