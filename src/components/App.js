import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import Signin from './Signin'
import Form from './Form'
import Page404 from './Page404'

class App extends Component {
    render() {
        return (
            <Switch>
                <Route path="/" exact component={Signin}/>
                <Route path="/form" component={Form}/>
                {/* <Route path="/404" component={Page404}></Route> */}
                {/* <Route path="/goods" component={Goods} />
                <Route path="/goods2" component={Goods2} /> */}
                {/* <Redirect to="/404"></Redirect> */}
            </Switch>
        )
    }
}

export default App
