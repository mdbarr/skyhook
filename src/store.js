function Store () {
  const self = this

  self.state = {
    loggedIn: false,
    name: 'Mark',
    notifications: 0
  }

  return self
}

export default new Store()
