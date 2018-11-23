import '../styles/app.scss';

import { Greeter } from './greeter';

const greeter: Greeter = new Greeter('rise');

greeter.start(document.getElementById('app')!);

if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/service-worker.js');
    });
}
