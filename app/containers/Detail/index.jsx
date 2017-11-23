import React from 'react'
import Header from '../../components/Header'
import Info from './subpage/Info'
import Comment from './subpage/Comment'
import Buy from './subpage/Buy'
class Detail extends React.Component {
    constructor(props) {
        super(props)
    }
    render() {
        //从路由params中获取参数
        const id = this.props.params.id
        return (
            <div>
                <Header title="商品详情" />
                <Info id={id} />
                <Buy id={id} />
                <Comment id={id} />
            </div>
        )   
    }
}

export default Detail