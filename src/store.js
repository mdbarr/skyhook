function Store () {
  const self = this

  self.state = {
    loggedIn: false
  }

  return self
}

export default new Store()
