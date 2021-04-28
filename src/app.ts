import { horo } from 'horojs';
import { merge, Subject } from 'rxjs';
import { scan, map, startWith, mapTo } from 'rxjs/operators';

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
export const app = horo`
    Counter
    <button data-event-click=${clickPlus$}>
        +
    </button>
    <button data-event-click=${clickMinus$}>
        -
    </button>
    <p>${text$}</p>
    <br>
`;
