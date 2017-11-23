import React from 'react'
import { Link } from 'react-router'
import { hashHistory } from 'react-router'
import SearchInput from '../SearchInput'
import './style.less'

// const HomeHeader = (props) => (
//     <div id="home-header">
//         <div>
//             <span>{props.cityName}</span>
//             <i className="icon-angle-down"></i>
//         </div>
//         <div>
//             <div className="search-container">
//                 <i className="icon-search"></i>
//                 <input type="text" placeholder="请输入商品名称" /> 
//             </div>
//         </div>
//         <div><i className="icon-user"></i></div>
//     </div>
// );

class HomeHeader extends React.Component {
    render() {
        return (
            <div id="home-header">
                <div>
                    <Link to="/city">
                        <span>{this.props.cityName}</span>
                        <i className="icon-angle-down"></i>
                    </Link>
                </div>
                <div>
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <SearchInput value="" enterHandle={this.enterHandle.bind(this)} />
                    </div>
                </div>
                <div><Link to="/User"><i className="icon-user"></i></Link></div>
            </div>
        )
    }
    enterHandle(value) {
        hashHistory.push('/search/all/' + encodeURIComponent(value))
    }
}

export default HomeHeader