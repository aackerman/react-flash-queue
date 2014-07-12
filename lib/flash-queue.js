/** @jsx React.DOM */
(function(root){

var ReactCSSTransitionGroup = React.addons.CSSTransitionGroup;

var Queue = React.createClass({displayName: 'Queue',
  dismissMessage: function(id) {
    this.props.messages.splice(id, 1);
    this.forceUpdate();
  },

  render: function() {
    return (
      React.DOM.div( {className:"flash-queue"}, 
        ReactCSSTransitionGroup( {transitionName:"flashfade"}, 
        this.props.messages.map(function(message, i) {
          return Message(
            {key:message.id,
            text:message.text,
            type:message.type,
            dismissMessage:this.dismissMessage.bind(this, i)}
          );
        }.bind(this))
        )
      )
    );
  }
});

var Message = React.createClass({displayName: 'Message',
  render: function() {
    var classes = React.addons.classSet({
      'flash-message': true,
      'is-notice':     this.props.type == 'notice',
      'is-alert':      this.props.type == 'alert',
      'is-warning':    this.props.type == 'warning',
      'is-info':       this.props.type == 'info'
    });

    return (
      React.DOM.div( {className:classes}, 
        this.props.text,
        DismissButton( {dismissMessage:this.props.dismissMessage})
      )
    );
  }
});

var DismissButton = React.createClass({displayName: 'DismissButton',
  render: function() {
    if (this.props.isDismissable) {
      return ''
    } else {
      return React.DOM.i( {className:"flash-delete", onClick:this.props.dismissMessage}, "×");
    }
  }
});

var Mixin = {
  __lastuuid: 0,

  getDefaultProps: function() {
    return {messages: []};
  },

  __uuid: function() {
    var now = +(new Date());
    if (now == this.__lastuuid) {
      now += 1;
    }
    this.lastuuid = now;
    return now;
  },
  flash: function(type, text, opts) {
    var id = this.__uuid();
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
