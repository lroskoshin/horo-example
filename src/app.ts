import { horo } from 'horojs';
import { Counter } from './components/counter';
import { ToDoComponent } from './components/todo';


export const app = horo`
    <section>
        <h2>Counter</h2>
        ${Counter()}
    </section>
    <section>
        <h2>ToDo</h2>
        ${ToDoComponent()}
    </section>
`;
