# react-flash-queue

A messaging queue for the browser built with React.

## Usage

```js
FlashQueue.install(App, document.querySelector('body'));
```

This will render the flash queue with `React.renderComponent` into the provided element. And a `flash` method will be installed into the first argument.

```js
App.flash('notice', 'A friendly flash message');
App.flash('warning', 'A warning flash message');
App.flash('info', 'An informational flash message');
App.flash('alert', 'An dangerous flash message');
```

## Author

| [![twitter/_aaronackerman_](http://gravatar.com/avatar/c73ff9c7e654647b2b339d9e08b52143?s=70)](http://twitter.com/_aaronackerman_ "Follow @_aaronackerman_ on Twitter") |
|---|
| [Aaron Ackerman](https://twitter.com/_aaronackerman_) |
