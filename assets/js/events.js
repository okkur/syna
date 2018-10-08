const fragments = (window.syna || {}).fragments || [];

if (!window.syna.listeners) {
  window.syna.listeners = {};
}

const listeners = window.syna.listeners;

class Stream {
  constructor() {
    this.eventTracker = this.eventTracker.bind(this);
    this.listen = this.listen.bind(this);

    fragments.forEach(fragment => {
      if (!document.querySelector(fragment)) {
        return;
      }

      const eles = document.querySelector(fragment).querySelectorAll('[data-event]');
      eles.forEach(el => {
        el.addEventListener(
          el.dataset.event,
          this.eventTracker(fragment, el.dataset.event, el.dataset.eventName),
        );
      });
    });

    if (listeners.window && listeners.window.url) {
      listeners.window.url.forEach(callback => callback(window.document.location.href));
    }
  }

  eventTracker(fragment, event, eventName) {
    const name = eventName ? `${event}-${eventName}` : event;
    return e => {
      if (!listeners[fragment] || !listeners[fragment][name]) {
        return;
      }

      listeners[fragment][name].forEach(callback => callback(e))
    };
  }

  listen(fragment, event, callback) {
    if (!listeners[fragment]) {
      listeners[fragment] = {};
    }

    if (!listeners[fragment][event]) {
      listeners[fragment][event] = [];
    }

    listeners[fragment][event].push(callback);
  }
}

window.syna.stream = new Stream();
