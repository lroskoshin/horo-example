import { horo } from 'horojs';
import { animationFrameScheduler, merge, of, scheduled, Subject } from 'rxjs';
import { scan, map, startWith, mapTo } from 'rxjs/operators';

export function Counter() {
    const clickPlus$ = new Subject<Event>();
    const clickMinus$ = new Subject<Event>();

    const plus$ = clickPlus$.pipe(
        mapTo(1)
    );

    const minus$ = clickMinus$.pipe(
        mapTo(-1)
    );

    const counter$ = merge(plus$, minus$).pipe(
        scan((count, value) => count + value, 1),
        startWith(1),
    );

    const text$ = counter$.pipe(
        map((val: number) => {
            return String(val);
        })
    );
    return scheduled([horo`
        <button data-event-click=${clickPlus$}>
        +
        </button>
        <button data-event-click=${clickMinus$}>
        -
        </button>
        <p>${text$}</p>
    `], animationFrameScheduler);
}