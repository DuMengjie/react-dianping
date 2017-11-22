import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import List from './subpage/List'

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName} />
                <Category/>
                <Ad />
                <List cityName={this.props.userinfo.cityName}/>
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(Home);