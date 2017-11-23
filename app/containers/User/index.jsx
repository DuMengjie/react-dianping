import userinfo from '../../reducers/store';
import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import UserInfo from '../../components/UserInfo'
import Header from '../../components/Header'

class User extends React.Component {
    render() {
        return (
            <div>
                <Header title="用户信息" backRouter="/home" />
                <UserInfo username={this.props.userinfo.username} city={this.props.userinfo.cityName} />
            </div>
        )
    }
    componentDidMount() {
        console.log(this.props.userinfo)
        if(!this.props.userinfo.username){
            hashHistory.push('/Login')
        }
    }
}

const mapStateToProps = (state) => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(User)