class Store {
  constructor(initialValues = {}) {
    this.values = initialValues;

    this.listeners = [];
    this.aliases = {};
  }

  alias(name, fn) {
    this.aliases[name] = fn;
  }

  trigger(key, value) {
    const updateValues = (key, value) => {
      this.values[key] = value;
      this.listeners.forEach(listener => {
        listener(this.values);
      })
    }

    if (!Object.hasOwnProperty.call(this.values, key)) {
      return;
    }

    if (Object.hasOwnProperty.call(this.aliases, key)) {
      this.aliases[key](value).then(data => {
        updateValues(key, data);
      });
    } else {
      if (value) {
        updateValues(key, value);
      }
    }
  }

  onChange(fn) {
    if (typeof fn === 'function') {
      this.listeners.push(fn);
    }
  }
}

export default Store;
