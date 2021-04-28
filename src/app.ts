import { horo } from 'horojs';
import { Counter } from './components/counter';
import { ToDo } from './components/todo';


export const app = horo`
    <section>
        <h2>Counter</h2>
        ${Counter()}
    </section>
    <section>
        <h2>ToDo</h2>
        ${ToDo()}
    </section>
`;
