import { BehaviorSubject, Observable } from "rxjs";

interface Task {
	id: number;
	completed: boolean;
	title: string;
}

export class TaskRepository {

	private static id = 0;
	private static changeId = 0;

	private tasks: Task[] = [];

	private changes = new BehaviorSubject<number>(0);

	get updates() {
		return this.changes as Observable<number>;
	}

	private announceChange() {
		this.changes.next(TaskRepository.changeId++);
	}

	create(task: Task) {
		task.id = TaskRepository.id++;
		this.tasks = [...this.tasks, task];
		this.announceChange();
	}

	getAll() {
		return this.tasks;
	}

	update(task: Task) {
		this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
		this.announceChange();
	}

	remove(id: number) {
		this.tasks = this.tasks.filter(task => task.id !== id);
		this.announceChange();
	}

}
