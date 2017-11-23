import React from 'react'
import './style.less'

class BuyAndStore extends React.Component {
    render() {
        return (
            <div className="buy-store-container clear-fix">
                <div className="item-container float-left">
                {
                    // 是否已经收藏了
                    this.props.isStore
                    ? <button className="selected" onClick={this.storeClickHandle.bind(this)}>已收藏</button>
                    : <button onClick={this.storeClickHandle.bind(this)}>收藏</button>
                }
                </div>
                <div className="item-container float-right">
                    <button onClick={this.buyClickHandle.bind(this)}>购买</button>
                </div>
            </div>
        )
    }
    buyClickHandle() {
        const buyHandle = this.props.buyHandle
        buyHandle()
    }
    storeClickHandle() {
        const storeHandle = this.props.storeHandle
        storeHandle()
    }
}

export default BuyAndStore