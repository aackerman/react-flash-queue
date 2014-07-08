# react-flash-queue

A messaging queue for the browser built with React.

## Usage

```
FlashQueue.install(App, document.querySelector('body'));
```

This will render the flash queue with `React.renderComponent` into the provided element. And a `flash` method will be installed into the first argument.

```
App.flash('notice', 'A friendly flash message');
App.flash('warning', 'A warning flash message');
App.flash('info', 'An informational flash message');
App.flash('alert', 'An dangerous flash message');
```
