/** @jsx React.DOM */
var FlashQueue = React.createClass({
  render: function() {
    var messages = this.props.messages.map(function(message){
      var classes = React.addons.classSet({
        'flash-message': true,
        'is-notice':     message.type == 'notice',
        'is-alert':      message.type == 'alert',
        'is-warning':    message.type == 'warning',
        'is-info':       message.type == 'info'
      });

      return (
        <div className={classes}>
          {message.text}
          <DismissButton isDismissable={message.isDismissable} dismissMessage={this.dismissMessage} />
        </div>
      );
    }, this);

    return (
      <div className="flash-queue">
        {messages}
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

var App = App || {};
App.flash = (function() {
  var messages = [];
  var lastuuid = 0;

  function render() {
    React.renderComponent(<FlashQueue messages={messages}/>, document.querySelector('body'));
  }



  function uuid() {
    var now = +(new Date);
    if (now == lastuuid) now += 1;
    lastuuid = now;
    return now;
  }

  return function(type, text, opts) {
    var id = uuid()
    messages.push({
      type: type,
      text: text,
      id: id,
      dismissable: true
    })
    setTimeout(function() {
      console.log('remove message ' + id)
      messages = messages.filter(function(message){
        return message.id != id;
      });
      render();
    }, 5 * 1e3);
    render();
  }
})();
