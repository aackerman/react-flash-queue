# react-flash-queue

A messaging queue for the browser built with React.

## Usage

```js
var App = React.createClass({

  mixins: [FlashQueue.Mixin],

  componentDidMount: function() {
    this.flash('notice', 'A friendly notice');
  },

  render: function() {
    var queue = FlashQueue.DOM.queue;
    return <queue messages={this.props.messages}/>;
  }
});

React.renderComponent(<App/>, document.querySelector('body'));
```

The `FlashQueue.Mixin` installs a `flash` method to create new flashes adding and removing to `props.messages` on the object using the mixin.

## Author

| [![twitter/_aaronackerman_](http://gravatar.com/avatar/c73ff9c7e654647b2b339d9e08b52143?s=70)](http://twitter.com/_aaronackerman_ "Follow @_aaronackerman_ on Twitter") |
|---|
| [Aaron Ackerman](https://twitter.com/_aaronackerman_) |
