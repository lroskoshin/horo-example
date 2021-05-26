import { horo, Component } from 'horojs';
import { from } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';

type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: false,
}

export function ToDoComponent(): Component {
    const list = fromFetch('https://jsonplaceholder.typicode.com/todos').pipe(
        switchMap((response: Response) => {
            return from(response.json());
        }),
        map((todos : Todo[]) => {
            const components = todos.map(TodoItem);
            return components;
        })
    );

    return horo`
        <ul>
            ${list}
        </ul>
    `;
}

function TodoItem(todo: Todo) {
    return horo`<li><b>#${String(todo.id)}<b> ${todo.title} ${todo.completed ? '+' : '-'}</li>`;
}
