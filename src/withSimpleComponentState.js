import React, { Component } from 'react';
import Store from './Store';

const withSimpleComponentState = (Comp, store) => {
  const s = (store instanceof Store) ? store : new Store(store);

  return class WrappedComponent extends Component {
    constructor(props) {
      super(props);

      this.state = {
        store: s.values,
      };
    }

    componentDidMount() {
      s.onChange(values => {
        this.setState({
          store: values,
        });
      });
    }

    render() {
      const passProps = {
        store: this.state.store,
        trigger: (...args) => s.trigger.apply(s, args),
        ...this.props,
      };

      return <Comp {...passProps} />;
    }
  }
};

export default withSimpleComponentState;
