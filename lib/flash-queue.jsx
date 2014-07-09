/** @jsx React.DOM */
(function(root){

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var FlashQueue = React.createClass({
  lastuuid: 0,

  getDefaultProps: function() {
    return {messages: []};
  },

  uuid: function() {
    var now = +(new Date);
    if (now == this.lastuuid) {
      now += 1;
    }
    this.lastuuid = now;
    return now;
  },

  flash: function(type, text, opts) {
    var id = this.uuid();
    var scheduledToDestroy = opts.scheduledToDestroy;
    this.props.messages.push({
      type: type,
      text: text,
      id: id,
      dismissable: true
    });
    this.forceUpdate();
    if (scheduledToDestroy) {
      setTimeout(function() {
        var messages = this.props.messages.filter(function(message){
          return message.id != id;
        });
        this.setProps({ messages: messages });
      }.bind(this), 5 * 1e3);
    }
  },

  dismissMessage: function(id) {
    this.props.messages.splice(id, 1);
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="flash-queue">
        <ReactCSSTransitionGroup transitionName="flashfade">
        {this.props.messages.map(function(message, i) {
          return <FlashMessage
            key={message.id}
            text={message.text}
            type={message.type}
            dismissable={message.dismissable}
            dismissMessage={this.dismissMessage.bind(this, i)}
          />;
        }.bind(this))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var FlashMessage = React.createClass({
  render: function() {
    var classes = React.addons.classSet({
      'flash-message': true,
      'is-notice':     this.props.type == 'notice',
      'is-alert':      this.props.type == 'alert',
      'is-warning':    this.props.type == 'warning',
      'is-info':       this.props.type == 'info'
    });

    return (
      <div className={classes}>
        {this.props.text}
        <DismissButton
          dismissable={this.props.dismissable}
          dismissMessage={this.props.dismissMessage}
        />
      </div>
    );
  }
});

var DismissButton = React.createClass({
  render: function() {
    if (this.props.dismissable) {
      return ''
    } else {
      return <i className="flash-delete" onClick={this.props.dismissMessage}>&times;</i>;
    }
  }
});

var install = function(host, el) {
  host.flash = React.renderComponent(<FlashQueue/>, el).flash;
}

var exports = {
  install: install
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  root.FlashQueue = exports;
  define(function() { return exports; });
} else {
  root.FlashQueue = exports;
}

})(this);
