import React from 'react'
import './style.less'

class SearchInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: ''
        }
    }
    
    render() {
        return (
            <input
                className="search-input" 
                type="text" 
                placeholder="请输入关键字" 
                onChange={this.ChangeHandle.bind(this)}
                onKeyUp={this.KeyUpHandle.bind(this)}
                value={this.state.value}/>
        )
    }

    componentDidMount() {
        this.setState({
            value: this.props.value || ''
        })
    }

    ChangeHandle(e) {
        this.setState({
            value: e.target.value
        });
    }

    KeyUpHandle(e) {
        // 监控 enter 事件
        if (e.keyCode !== 13) {
            return
        }
        this.props.enterHandle(e.target.value)
    }
}

export default SearchInput