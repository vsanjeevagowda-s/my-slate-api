class Socket {
  constructor({ client }) {
    this.client = client;
    this.registerWorkspaceEvent();
    this.registerToDoEvent();
    this.registerDisconnectEvent()
  }

  registerWorkspaceEvent() {
    this.client.on('workspace_change', (date) => {
      console.log('inside [registerWorkspaceEvent]: [workspace_change] event', date)
      this.client.broadcast.emit('update_workspace', date);
    })
  };

  registerToDoEvent() {
    this.client.on('todo_change', (data) => {
      console.log('inside [registerToDoEvent]: [ todo_change ] event', data)
      this.client.broadcast.emit('update_todo', "Please update your todo");
    })
  };

  registerDisconnectEvent() {
    console.log("inside [ registerDisconnectEvent ]...");
    this.client.on('disconnect', () => {
      console.log('inside the [disconnect] event')
    })
  }

}

module.exports = {
  Socket
}