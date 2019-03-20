import React, { Component } from 'react'
import { Hub, Auth, Logger } from 'aws-amplify'

const { Provider, Consumer } = React.createContext({
  isLoggedIn: false,
  username: null,
  id: null,
  email: null,
})
const logger = new Logger('UserProvider', 'INFO')

class User extends Component {
  state = {
    isLoggedIn: false,
    username: null,
    id: null,
    email: null,
  }

  componentDidMount = async () => {
    logger.info('listening for auth events...')
    Hub.listen('auth', this.onAuthEvent)

    try {
      const user = await Auth.currentAuthenticatedUser()
      this.setState(() => ({ isLoggedIn: true, username: user.username, id: user.attributes.sub, email: user.attributes.email }))
    } catch(error) {
      console.warn(error)
    }
  }

  componentWillUnmount = () => {
    logger.info('removed listener for auth events...')
    Hub.remove('auth', this.onAuthEvent)
  }

  render = () => (
    <Provider value={this.state}>
      {this.props.children}
    </Provider>
  )

  onAuthEvent = async data => {
    logger.info('auth event', data)
    const { payload: { event } } = data

    switch (event) {
      case 'signIn': {
        const user = await Auth.currentAuthenticatedUser()
        this.setState(() => ({ isLoggedIn: true, username: user.username, id: user.attributes.sub, email: user.attributes.email }))
        break
      }
      case 'signOut':
      default: {
        this.setState(() => ({ isLoggedIn: false, username: null, id: null, email: null }))
        break
      }
    }
  }
}

export const UserProvider = User
UserProvider.displayName = 'UserProvider'

export default Consumer