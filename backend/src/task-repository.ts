interface Task {
	id: number;
	completed: boolean;
	title: string;
}

export class TaskRepository {

	private static id = 0;

	private tasks: Task[] = [];

	create(task: Task) {
		task.id = TaskRepository.id++;
		this.tasks = [...this.tasks, task];
	}

	getAll() {
		return this.tasks;
	}

	update(task: Task) {
		this.tasks = this.tasks.map(t => t.id === task.id ? task : t);
	}

	remove(id: number) {
		this.tasks = this.tasks.filter(task => task.id !== id);
	}

}
