import express from 'express';
import { firstValueFrom, map, race, skipWhile, timer } from 'rxjs';
import { TaskRepository } from './task-repository';

const app = express();
const port = 3000;
const longPollMs = 10_000;

app.use(express.json());

const tasks = new TaskRepository();

app.put('/task', (req, res) => {
	res.send(tasks.create(req.body));
});

app.get('/task', (req, res) => {
	res.send(tasks.getAll());
});

app.post('/task', (req, res) => {
	res.send(tasks.update(req.body));
});

app.delete('/task/:id', (req, res) => {
	res.send(tasks.remove(Number(req.params.id)));
});

app.get('/task/changes/:changeId', (req, res) => {
	const changeId = Number(req.params.changeId);
	const longPollTimer = timer(longPollMs).pipe(map(() => 0));
	const update = tasks.updates.pipe(
		skipWhile(id => id <= changeId),
	);
	firstValueFrom(race(longPollTimer, update))
		.then((updateOrExpiration) => res.send(JSON.stringify(updateOrExpiration)))
});

app.listen(port, () => {
	console.log(`Palvelin kuuntelee osoitteessa http://localhost:${port}`);
});
