import React, {Component} from 'react'
import {connect} from 'react-redux'
import {withRouter, Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Login, Signup, UserHome} from './components'
import AddLocation from './components/AddLocation'
import {me} from './store'
import UpdateLocation from './components/UpdateLocation';
import SingleLocation from './components/SingleLocation';


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Switch>
        {/* Routes placed here are available to all visitors */}
        <Route path="/login" component={Login} />
        <Route path="/signup" component={Signup} />

        {/* route below needs to be added to an area that is only accessible as admin */}
        <Route path="/addLocation" component={AddLocation}/>
        <Route path="/updateLocation" component={UpdateLocation}/>
        <Route exact path="/singleLocation/:locationId" component={SingleLocation}/>
        <Route exact path="/singleLocation/:locationId/update" component={UpdateLocation}/>
        
        {/* Displays our Login component as a fallback */}
        {/*<Route component={Login} />*/}
        <Route exact path="/" component={UserHome} />
      </Switch>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    loadInitialData() {
      dispatch(me())
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Routes))

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}

//Code for logged in routes only
/*

        {isLoggedIn && (
          <div>
            <Route path="/home" component={UserHome} />
          </div>
        )}
*/