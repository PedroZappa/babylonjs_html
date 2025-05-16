import { AppOne as App } from './AppOne';
console.log(`main.ts starting ${App.name}`);
window.addEventListener('DOMContentLoaded', () => {
    let canvas = document.getElementById('renderCanvas');
    let app = new App(canvas);
    app.run();
});
