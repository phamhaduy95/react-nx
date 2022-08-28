export class CountDownHandler {
  private interval: NodeJS.Timer | null;
  private status: 'pause' | 'stop' | 'run' | 'reset' = 'stop';
  private intervalTime: number;
  private limit: number;
  public onChange: (value: number) => void = (value) => {};
  public onPause: () => void = () => {};
  public onStop: () => void = () => {};
  public onFinish: () => void = () => {};
  public dir: 'descend' | 'ascend';

  constructor(
    intervalTime: number,
    limit: number,
    dir: CountDownHandler['dir'] = 'descend'
  ) {
    this.intervalTime = intervalTime;
    this.limit = limit;
    this.dir = dir;
    this.interval = null;
  }

  private getIntervalCallback() {
    const ref = this;
    if (this.dir === 'descend') {
      let value = this.limit;
      return () => {
        if (ref.status === 'pause') return;
        value -= 1;
        if (value < 0) {
          ref.finish();
          return;
        }
        ref.onChange(value);
      };
    }
    let value = 0;
    return () => {
      if (ref.status === 'pause') return;
      value += 1;
      if (value > ref.limit) {
        ref.finish();
        return;
      }
      ref.onChange(value);
    };
  }

  private finish() {
    this.status = 'pause'; 
    this.onFinish();
  }

  pause() {
    this.status = 'pause';
    this.onPause();
  }
  // resume the interval if the previous status is paused or reset if the previous status is stop
  run() {
    this.status = 'run';
    if (this.interval === null) {
      const callback = this.getIntervalCallback();
      this.interval = setInterval(callback, this.intervalTime);
    }
  }
  stop() {
    this.status = 'stop';
    if (this.interval !== null) {
      clearInterval(this.interval);
      this.interval = null;
      this.onStop();
    }
  }

  changeStatus(status: CountDownHandler['status']) {
    switch (status) {
      case 'pause': {
        this.pause();
        return;
      }
      case 'run': {
        this.run();
        return;
      }
      case 'stop': {
        this.stop();
        return;
      }
      case 'reset': {
        this.stop();
        this.run();
      }
    }
  }

  updateDeadLine(deadline: number) {
    this.stop();
    this.limit = deadline;
    this.run();
  }
}
