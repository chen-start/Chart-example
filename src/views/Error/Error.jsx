import React from 'react';

class Error extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        console.log(this.props);
    }

    render(){
        return (
            <div>错误页面</div>
        )
    }
}

export default Error;