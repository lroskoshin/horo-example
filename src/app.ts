import { horo } from 'horojs';
import { Counter } from './components/counter';


export const app = horo`
    <section>
        <h2>Counter</h2>
        ${Counter()}
    </section>
`;
