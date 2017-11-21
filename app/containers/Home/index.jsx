import React from 'react';
import { connect } from 'react-redux';
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ads from './subpage/Ads'

class Home extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        return(
            <div>
                <HomeHeader cityName={this.props.userinfo.cityName} />
                <Category/>
                <Ads />
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userinfo: state.userinfo
})

export default connect(mapStateToProps, null)(Home);