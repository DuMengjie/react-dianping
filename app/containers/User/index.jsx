import userinfo from '../../reducers/store';
import React from 'react'
import { hashHistory } from 'react-router'
import { connect } from 'react-redux'

import UserInfo from '../../components/UserInfo'
import Header from '../../components/Header'
import OrderList from './subpage/OrderList'

class User extends React.Component {
    render() {
        return (
            <div>
                <Header title="用户信息" backRouter="/home" />
                <UserInfo username={this.props.userinfo.username} city={this.props.userinfo.cityName} />
                <OrderList username={this.props.userinfo.username}/>
            </div>
        )
    }
    componentDidMount() {
        if(!this.props.userinfo.username){
            hashHistory.push('/Login')
        }
    }
}

const mapStateToProps = (state) => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(User)