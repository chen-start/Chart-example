import React from 'react';

export default class Index extends React.Component{
    componentDidMount() {
        this.$http({
            method: 'GET',
            url: '/getData'
        }).then(res => {
            console.log(res);
        })
    }

    render(){
        return(
            <div>
                说明页
            </div>
        )
    }
}