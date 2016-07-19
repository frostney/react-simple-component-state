# react-simple-component-state
Dead-simple component state with functional stateless React components

## Installation

```
$ npm install react-simple-component-state
```

## Usage
```javascript
import { withSimpleComponentState } from 'react-simple-component-state';

const Clicks = ({ store, trigger }) => (
  <div>
    <div>Clicks: {store.clicks}</div>
    <button onClick={() => trigger('clicks', store.clicks + 1)}>Click me!</div>
  </div>
);

withSimpleComponentState(Clicks, { clicks: 0 });
```

Essentially it's a glorified `EventEmitter` hiding away the specifics behind a higher-order component.

### Sharing a store
Instead of passing the initial state as the second parameter, we can instead pass in a `Store` instance. We can pass the instance into multiple high-order components.

```javascript
import { Store, withSimpleComponentState } from 'react-simple-component-state';

const sharedStore = new Store({ clicks: 0 });

const Clicks = ({ store, trigger }) => (
  <div>
    <div>Clicks: {store.clicks}</div>
    <button onClick={() => trigger('clicks', store.clicks + 1)}>Click me!</div>
  </div>
);

withSimpleComponentState(Clicks, sharedStore);


const MagicClicks = ({ store }) => (
  <div>Magic clicks: {store.clicks}</div>
);

withSimpleComponentState(MagicClicks, sharedStore);
```

### Asynchronous actions
Let's say we want to trigger an asynchronous action, like an AJAX request. For each action we can define an alias that will be called once `trigger` is called. It takes the value as its argument and needs to return a promise.

```javascript
import { Store, withSimpleComponentState } from 'react-simple-component-state';

const myStore = new Store({ fromTheServer: 'nothing' });
myStore.alias('fromTheServer', value => {
  return fetch('http://my-server.somewhere', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(value),
  }).then(res => res.json());
});

const FromTheServer = ({ store, trigger }) => (
  <div>
    <div>Result from the server: {store.fromTheServer}</div>
    <button onClick={() => trigger('fromTheServer', { user: 'frostney' })}>Start the request!</div>
  </div>
);

withSimpleComponentState(FromTheServer, myStore);
```

### Custom store
Since the store passed in as the second parameter only expects a certain interface, we could easily swap the default store with a custom one.

```javascript
class CustomStore {
  constructor(initialValues) {
    this.values = initialValues;
  }

  trigger() {

  }

  onChange(fn) {

  }
}


```

## License
MIT
