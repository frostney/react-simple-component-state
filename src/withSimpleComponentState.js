import React, { Component } from 'react';
import Store from './Store';

const withSimpleComponentState = (Component, store) => {
  const s = (typeof store === 'object') ? new Store(store) : store;

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
        trigger: s.trigger,
        ...this.props,
      };

      return (<Component {...passProps} />);
    }
  }
};

export default withSimpleComponentState;
