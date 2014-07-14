/** @jsx React.DOM */
(function(root){

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Queue = React.createClass({
  dismissMessage: function(id) {
    this.props.messages.splice(id, 1);
    this.forceUpdate();
  },

  render: function() {
    return (
      <div className="flash-queue">
        <ReactCSSTransitionGroup transitionName="flashfade">
        {this.props.messages.map(function(message, i) {
          return <Message
            key={message.id}
            text={message.text}
            type={message.type}
            dismissMessage={this.dismissMessage.bind(this, i)}
          />;
        }.bind(this))}
        </ReactCSSTransitionGroup>
      </div>
    );
  }
});

var Message = React.createClass({
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
        <DismissButton dismissMessage={this.props.dismissMessage}/>
      </div>
    );
  }
});

var DismissButton = React.createClass({
  render: function() {
    if (this.props.isDismissable) {
      return ''
    } else {
      return <i className="flash-delete" onClick={this.props.dismissMessage}>&times;</i>;
    }
  }
});

var Mixin = {
  getDefaultProps: function() {
    return {messages: []};
  },

  _uuid: 0,

  flash: function(type, text, opts) {
    var id = this._uuid++;
    this.props.messages.push({
      type: type,
      text: text,
      id: id,
      dismissable: true
    });
    this.forceUpdate();

    setTimeout(function() {
      var messages = this.props.messages.filter(function(message){
        return message.id != id;
      });
      this.setProps({ messages: messages });
    }.bind(this), 15 * 1e3);
  }
}

var exports = {
  Mixin: Mixin,
  DOM: {
    queue: Queue
  }
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {
  root.FlashQueue = exports;
  define(function() { return exports; });
} else {
  root.FlashQueue = exports;
}

})(this);
