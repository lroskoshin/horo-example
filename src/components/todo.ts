import { horo, Component } from 'horojs';
import { animationFrameScheduler, from, scheduled } from 'rxjs';
import { fromFetch } from 'rxjs/fetch';
import { map, switchMap } from 'rxjs/operators';

export function ToDo(): Component {
    const todo$ = fromFetch('https://jsonplaceholder.typicode.com/todos/1').pipe(
        switchMap((response: Response) => {
            return from(response.json());
        }),
        map((json: any) => {
            return json.title;    
        })
    );
    return scheduled([horo`
        <ul>
            <li>${todo$}</li>
        </ul>
    `], animationFrameScheduler);
}
