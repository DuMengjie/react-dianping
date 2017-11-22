import React from 'react';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import { bindActionCreators } from 'redux'
import LocalStore from '../util/localStore';
import { CITYNAME } from '../config/localStoreKey'
import { connect } from 'react-redux';
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context){
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: true,
        };
    }

    componentDidMount(){
        // 获取位置信息
        let cityName = LocalStore.getItem(CITYNAME)
        if (cityName == null) {
            cityName = '北京'
        }

        this.props.userInfoActions.update({
            cityName: cityName
        });
    }

    render(){
        return(
            <div id="container">
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
            </div>
        );
    }
}

const mapStateToProps = (state) => ({
    userinfo: state.userinfo
})

const mapDispatchToProps = (dispatch) => ({
    userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
})

export default connect(mapStateToProps, mapDispatchToProps)(App);