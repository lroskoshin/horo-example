import { horo, Component } from 'horojs';
import { from, Observable } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';

type Todo = {
    userId: number,
    id: number,
    title: string,
    completed: false,
}

export function ToDoComponent(): Observable<Component> {
    return fromFetch('https://jsonplaceholder.typicode.com/todos').pipe(
        switchMap((response: Response) => {
            return from(response.json());
        }),
        map((todos : Todo[]) => {
            const components = todos.map(TodoItem);
            return mergeDocumentComponents(components);
        })
    );
}

function TodoItem(todo: Todo) {
    return horo`<li><b>#${String(todo.id)}<b> ${todo.title} ${todo.completed ? '+' : '-'}</li>`;
}

function mergeDocumentComponents(components: Component[]): Component {
    const root = document.createDocumentFragment();
    root.append(...components.map((component: Component) => component.fragment));
    return {
        fragment: root,
        delete: () => components.forEach((component: Component) => component.delete())
    };
}
