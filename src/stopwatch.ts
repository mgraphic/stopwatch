import './stopwatch.scss';

export class Stopwatch {
    timerElement: HTMLElement;
    buttonStartElement: HTMLButtonElement;
    buttonStopElement: HTMLButtonElement;
    buttonResetElement: HTMLButtonElement;

    timerInterval?: NodeJS.Timeout;
    timer: number = 0;
    elapsed: number = 0;
    started?: number;

    constructor() {
        this.timerElement = document.querySelector('.timer')!;
        this.buttonStartElement = document.querySelector('.start')!;
        this.buttonStopElement = document.querySelector('.stop')!;
        this.buttonResetElement = document.querySelector('.reset')!;
    }

    run() {
        this.buttonResetElement.addEventListener('click', () => {
            this.reset();
        });
        this.buttonStartElement.addEventListener('click', () => {
            this.start();
        });
        this.buttonStopElement.addEventListener('click', () => {
            this.stop();
        });

        this.reset();
    }

    start() {
        this.timerElement.classList.add('active');

        this.buttonStartElement.disabled = true;
        this.buttonStopElement.disabled = false;
        this.buttonResetElement.disabled = true;

        this.started = new Date().getTime();
        this.interval();
    }

    stop() {
        this.timerElement.classList.remove('active');

        this.buttonStartElement.disabled = false;
        this.buttonStopElement.disabled = true;
        this.buttonResetElement.disabled = false;

        clearInterval(this.timerInterval);
        this.timer += this.elapsed;
    }

    reset() {
        this.buttonStartElement.disabled = false;
        this.buttonStopElement.disabled = true;
        this.buttonResetElement.disabled = true;

        clearInterval(this.timerInterval);
        this.timerElement.innerText = '00:00:00.000';
        this.timerInterval = undefined;
        this.timer = 0;
        this.elapsed = 0;
        this.started = undefined;
    }

    display() {
        this.elapsed = new Date().getTime() - (this.started || 0);
        const time = this.timer + this.elapsed;
        this.timerElement.innerText = new Date(time)
            .toISOString()
            .slice(11, 23);
    }

    interval() {
        this.timerInterval = setInterval(() => {
            this.display();
        }, 1);
    }
}
