export default class Life {
  application: App;
  organisms: any[];
  constructor(application: App, organisms: any[]) {
    this.application = application;
    this.organisms = organisms;
  }
  start() {
    this.organisms.forEach(fn => {
      fn.setup(this.application);
      fn.append(this.application);
    });
    this.application.ticker.add(this.update.bind(this));
  }
  update(delta) {
    this.organisms.forEach(fn => {
      fn.update(this.application, delta);
    });
  }
}
