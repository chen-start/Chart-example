import React from 'react';
import eCharts from 'echarts';
import $ from 'jquery';
import css from './DoubleLayer.module.css';
import {Breadcrumb} from 'antd';
import {HomeOutlined} from '@ant-design/icons';

export default class DoubleLayer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tree1: {
                id: 1,
                label: '根节点1',
                name: '根节点1',
                children: [
                    {
                        id: 2,
                        label: '子节点1-1',
                        name: '子节点1-1',
                        children: [
                            {
                                id: 5,
                                label: '子节点1-1-1',
                                name: '子节点1-1-1'
                            },
                            {
                                id: 6,
                                label: '子节点1-1-2',
                                name: '子节点1-1-2'
                            }
                        ]
                    },
                    {
                        id: 3,
                        label: '子节点1-2',
                        name: '子节点1-2',
                        children: [
                            {
                                id: 7,
                                label: '子节点1-2-1',
                                name: '子节点1-2-1'
                            },
                            {
                                id: 8,
                                label: '子节点1-2-2',
                                name: '子节点1-2-2'
                            }
                        ]
                    },
                    {
                        id: 4,
                        label: '子节点1-3',
                        name: '子节点1-3',
                        children: [
                            {
                                id: 9,
                                label: '子节点1-3-1',
                                name: '子节点1-3-1'
                            },
                            {
                                id: 10,
                                label: '子节点1-3-2',
                                name: '子节点1-3-2'
                            }
                        ]
                    }
                ]
            },
            tree2: {
                id: 11,
                label: '根节点2',
                name: '根节点2',
                children: [
                    {
                        id: 12,
                        label: '子节点2-1',
                        name: '子节点2-1',
                        children: [
                            {
                                id: 15,
                                label: '子节点2-1-1',
                                name: '子节点2-1-1'
                            },
                            {
                                id: 16,
                                label: '子节点2-1-2',
                                name: '子节点2-1-2'
                            }
                        ]
                    },
                    {
                        id: 13,
                        label: '子节点2-2',
                        name: '子节点2-2',
                        children: [
                            {
                                id: 17,
                                label: '子节点2-2-1',
                                name: '子节点2-2-1'
                            },
                            {
                                id: 18,
                                label: '子节点2-2-2',
                                name: '子节点2-2-2'
                            }
                        ]
                    },
                    {
                        id: 14,
                        label: '子节点2-3',
                        name: '子节点2-3',
                        children: [
                            {
                                id: 19,
                                label: '子节点2-3-1',
                                name: '子节点2-3-1'
                            },
                            {
                                id: 20,
                                label: '子节点2-3-2',
                                name: '子节点2-3-2'
                            }
                        ]
                    }
                ]
            },
            graph: undefined,
            frame: undefined,
            data: [
                {
                    name: "所有物品",
                    children: [
                        {
                            name: "水果",
                            children: [{name: "苹果", children: [{name: '青苹果'}, {name: '红苹果'}]}]
                        },
                        {
                            name: '主食',
                            children: [
                                {name: "米饭", children: [{name: '北方米饭'}, {name: '南方米饭'}]}
                            ]
                        },
                        {
                            name: '生活用品',
                            children: [
                                {name: "电脑类", children: [{name: '联想电脑'}, {name: '苹果电脑'}]},
                                {name: "工具类", children: [{name: "锄头"}, {name: "锤子"}]},
                                {name: "生活用品", children: [{name: "洗发水"}, {name: "沐浴露"}]}
                            ]
                        }
                    ]
                }],
            isMove: false
        };
    };

    componentDidMount() {
        this.state.graph = eCharts.init(document.getElementById('charts'));
        this.setOption();

        // jQuery 控制拖动悬浮窗
        $(document).mousemove(function(e){
            let X = e.clientX;
            let Y = e.clientY + $(this).scrollTop();
            $('#frame').offset({left: X + 10, top: Y});

        })
        $('#frame').hide();
        $(document).mouseup(e => {
            $('#frame').hide();
        });

    };

    setOption() {
        let _this = this;
        this.state.graph.setOption({
            tooltip: {
                trigger: 'item',
                triggerOn: 'mousemove'
            },
            series: [
                {
                    type: 'tree',

                    data: [_this.state.tree1],

                    top: '1%',
                    left: '5%',
                    bottom: '1%',
                    right: '60%',

                    symbolSize: 7,

                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },

                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                },
                {
                    type: 'tree',

                    data: [_this.state.tree2],

                    top: '1%',
                    left: '55%',
                    bottom: '1%',
                    right: '10%',

                    symbolSize: 7,

                    label: {
                        position: 'left',
                        verticalAlign: 'middle',
                        align: 'right',
                        fontSize: 9
                    },

                    leaves: {
                        label: {
                            position: 'right',
                            verticalAlign: 'middle',
                            align: 'left'
                        }
                    },

                    expandAndCollapse: true,
                    animationDuration: 550,
                    animationDurationUpdate: 750
                }
            ]
        });

        this.state.graph.on('mousedown', ev => {
            _this.setState({
                frame: ev.data,
                isMove: false
            });
            $('#frame').show();
        });

        this.state.graph.on('mousemove', ev => {
            _this.setState({
                isMove: true
            })
        });

        this.state.graph.on('mouseup', ev => {
            if (_this.state.isMove) {
                _this.dealWith(ev.data);
            } else {
                return false;
            }

            if(_this.state.frame.id === ev.data.id){
                return false;
            }

            $('#frame').hide();
            _this.dealWith(ev.data);
            _this.setState({
                isMove: false
            })
        });
    };

    // TODO 目前只支持三级岔树，等有时间再用递归搞。
    dealWith(data) {
        let _this = this;
        if (_this.state.tree2.children) {
            _this.state.tree2.children.map((item, index) => {

                if (item.id === data.id) {
                    console.log(_this.state.tree2.children[index]);
                    return _this.state.tree2.children[index].children.push(_this.state.frame);
                }

                if (item.children) {
                    item.children.map((it, i) => {
                        console.log(it, i);
                        if (it.id === data.id) {
                            return _this.state.tree2.children[index].children[i].children.push(_this.state.frame);
                        }
                    })
                } else {
                    item.children = [_this.state.frame];
                }
            })
        } else {
            _this.state.tree2.children = [_this.state.frame];
        }
        this.setOption();
    };

    render() {
        return (
            <div className={css.home}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined/>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        双层图表嵌套
                    </Breadcrumb.Item>
                </Breadcrumb>
                <div className={css.title}>
                    <span>树1</span>
                    <span>树2</span>
                </div>
                <div id='charts' style={{width: '100%', height: '800px'}}/>
                <div className={css.Introduction}>
                    <h2>可操作树图</h2>
                    <p>可通过点击拖拽操作树图，利用jQuery来控制悬框。</p>
                    <h3>操作步骤</h3>
                    <p>点击拖拽树1节点，将树1节点放入树2某个节点中，树2节点会自动刷新添加的数据</p>
                    <div>
                        <h2>代码详情</h2>
                        <h3>关于jQuery操作部分及节点的事件</h3>
                        <div>
                            <pre>
                                {`
    componentDidMount() {
        this.state.graph = eCharts.init(document.getElementById('charts'));
        this.setOption();
        
        /** 
        * @description jQuery 控制拖动悬浮窗
        */ 
        $(document).mousemove(function(e){
            let X = e.clientX; // 鼠标距离浏览器左边的距离
            // 如果不加$(this).scrollTop()，当浏览器向下滚动时出现的方框会偏移鼠标的位置
            let Y = e.clientY + $(this).scrollTop(); // 鼠标距离浏览器上边的距离 + 浏览器滚动条的距离
            // 设置方框位置
            $('#frame').offset({left: X + 10, top: Y});
        })
        $('#frame').hide();
        $(document).mouseup(e => {
            $('#frame').hide();
        });
    
    };

    
    setOption() {
        let _this = this;
        // echart配置项，具体看文档
        this.state.graph.setOption({...});

        // 设置鼠标按下事件
        this.state.graph.on('mousedown', ev => {
            _this.setState({
                frame: ev.data,
                isMove: false
            });
            $('#frame').show();
        });

        // 设置鼠标移动事件，判断鼠标是否移动确定是否为点击事件还是拖拽事件
        this.state.graph.on('mousemove', ev => {
            _this.setState({
                isMove: true
            })
        });

        // 设置鼠标松开事件
        this.state.graph.on('mouseup', ev => {
            if (_this.state.isMove) {
                // 鼠标拖拽事件
                _this.dealWith(ev.data);
            } else {
                // 鼠标点击事件
                return false;
            }
            
            // 判断是否为节点内拖拽
            if(_this.state.frame.id === ev.data.id){
                return false;
            }
            
            // 控制拖拽后节点的添加，详情看下一节
            $('#frame').hide();
            _this.dealWith(ev.data);
            _this.setState({
                isMove: false
            })
        });
    };
                                `}
                            </pre>
                        </div>
                        <h3>拖拽节点后的处理部分</h3>
                        <h4>目前只支持三级节点嵌套，后续会利用递归实现无限子节点嵌套</h4>
                        <pre>
                            {`
dealWith(data) {
        let _this = this;
        
        // 判断是否为根节点
        if (_this.state.tree2.children) {
            _this.state.tree2.children.map((item, index) => {
                // 判断是否为二级节点
                if (item.id === data.id) {
                    console.log(_this.state.tree2.children[index]);
                    // 将数据添加进树中并停止循环
                    return _this.state.tree2.children[index].children.push(_this.state.frame);
                }
                
                // 判断该节点是否还有子节点
                if (item.children) {
                    item.children.map((it, i) => {
                        
                        // 判断该节点是否为鼠标松开时所在位置的节点
                        if (it.id === data.id) {
                            // 将数据添加进树中并停止循环
                            return _this.state.tree2.children[index].children[i].children.push(_this.state.frame);
                        }
                    })
                } else {
                
                    item.children = [_this.state.frame];
                }
            })
        } else {
            _this.state.tree2.children = [_this.state.frame];
        };
        
        // 重新刷新树状图
        this.setOption();
    };
                            `}
                        </pre>
                    </div>
                </div>
                <div id='frame' className={css.frame}>
                    {this.state.frame ? this.state.frame.name : ''}
                </div>
            </div>
        )
    };

}