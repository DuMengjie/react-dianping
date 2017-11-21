import React from 'react'
import './style.less';

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
                    <span>{this.props.cityName}</span>
                    <i className="icon-angle-down"></i>
                </div>
                <div>
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <input type="text" placeholder="请输入商品名称" /> 
                    </div>
                </div>
                <div><i className="icon-user"></i></div>
            </div>
        )
    }
}

export default HomeHeader