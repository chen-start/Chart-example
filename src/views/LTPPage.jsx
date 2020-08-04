import React from 'react';
import {withRouter} from 'react-router-dom';
import $ from 'jquery';

import {Breadcrumb, Input} from "antd";
import {HomeOutlined} from '@ant-design/icons';

class LTPPage extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            input: '他叫汤姆去拿外衣。',
            graph: undefined,
            graphData: undefined,
            offsets: [],
            wordsSubscript: '',
            wordsIndex: [],
            canvas: undefined,
            canvasX: 60,  // 初始化root的x位置
            canvasY: 240,  // 初始化root的y位置
            index: 0,  //
            startX: 120,  // 循环的第一个节点x位置
            offsetType: []
        }
    }
    componentDidMount() {
        this.getData();
        console.log('width: ' , $('#graph').width() , ', ' , 'height: ' , $('#graph').height());
    };

    getData(){
        let _this = this;

        if(_this.state.canvas){
            _this.state.canvas.clearRect(0, 0, 1630, 422);
        }
        $.ajax({
            method: 'POST',
            url: 'http://39.96.43.154:8080/api',
            data: JSON.stringify({
                text: _this.state.input
            })
        }).then(res => {
            _this.setState({
                graphData: res
            });
            _this.setCanvas();
        })
    };

    setCanvas() {
        this.state.index = 0;
        this.state.offsets = [];
        this.state.wordsSubscript = '';
        this.state.wordsIndex = [];
        let _this = this;
        let ctx = _this.state.canvas = document.getElementById('graph').getContext('2d');
        ctx.clearRect(0,0,$('#graph').width(),$('#graph').height());
        ctx.font = '14px serif';
        ctx.fillStyle = "#000";
        _this.state.graphData.words.forEach(item => {
            _this.state.offsets.push(item.offset);

            _this.state.wordsSubscript = _this.state.wordsSubscript.concat(item.text);
            for(let i = 0; i < item.length; i++){
                _this.state.wordsIndex.push(item.id);
            }
        });

        _this.state.graphData.words.map((item, index) => {
            _this.state.offsetType = [];
            ctx.fillText(item.text, _this.state.canvasX*(index+2), _this.state.canvasY);
            ctx.fillText(item.pos, _this.state.canvasX*(index+2), _this.state.canvasY + 50);
            if(item.pos === 'nh' || item.pos === 'ni' || item.pos === 'ns'){
                ctx.fillStyle = 'green';
                ctx.fillRect(_this.state.canvasX*(index+2) - 20, _this.state.canvasY + 82, 70, 25);
                ctx.fillStyle = '#000';
                ctx.fillText(_this.judgmentNoun(item.pos), _this.state.canvasX*(index+2), _this.state.canvasY + 100);
            }

            // 通过用words中的offset去匹配roles中的offset，indexOf不返回-1代表当前roles中的offset可以获取索引，从而获取本次循环的开始索引和结束索引。

            if(JSON.stringify(item.roles) !== '[]'){
                _this.state.index += 1;
                // 将roles中的type、text放入两个数组中，匹配两个数组
                let type = [];
                let all = [];
                item.roles.map(nt => {
                    type.push(nt.type);
                    all.push(nt.text);
                });

                // 绘制动词，x为词的x，y自定义
                ctx.fillText(item.text, _this.state.canvasX*(index+2), _this.state.canvasY + 100 + _this.state.index * 50)

                all.map((li, i) => {
                    ctx.fillStyle = 'green';
                    // 设置x，通过词获取在短句中的索引，从而获取该词的id，来设置x。
                    let x = _this.state.canvasX * (_this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li)] + 2) - 20;
                    // 设置y，index为roles存在的个数
                    let y = _this.state.canvasY + 85 + _this.state.index * 50;
                    // _this.wordsIndex[_this.wordsSubscript.indexOf(li) + li.length]为词的结束id，_this.wordsIndex[_this.wordsSubscript.indexOf(li)]为词的起始id
                    let length = _this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li) + li.length] - _this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li)];
                    // 绘制圆角矩形，可复用
                    _this.fillRoundRect(ctx, x, y, 60 * length, 25, 8, '#e69138');
                    ctx.fillStyle = '#000';
                    ctx.fillText(type[i], x + (60*length/2) - 10, y + 15);

                });
            }

            ctx.fillText('root', _this.state.canvasX, _this.state.canvasY);

            // 利用三次贝塞尔曲线画箭头

            let count = Math.abs(item.id - item.parent);
            // if(count > 3){
            //   count = 3;
            // }
            ctx.beginPath();
            if(item.parent - item.id > 0){
                ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY-20);
                ctx.bezierCurveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2), _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2), _this.state.canvasY-20);
            }else{
                ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY-20);
                ctx.bezierCurveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2) + 20, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2) + 20, _this.state.canvasY-20);
            }
            ctx.strokeStyle = "green";

            ctx.fillText(item.relation, (_this.state.canvasX*(index+2) + _this.state.canvasX*(item.parent+2)) / 2, _this.state.canvasY - 40*count + 20);

            ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 20);
            ctx.lineTo(_this.state.canvasX*(index+2) + 5, _this.state.canvasY - 25);
            ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 20);
            ctx.lineTo(_this.state.canvasX*(index+2) + 15, _this.state.canvasY - 25);
            ctx.stroke();
        });
        ctx.save();
    };

    fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor){
        //圆的直径必然要小于矩形的宽高
        if (2 * radius > width || 2 * radius > height) { return false; }

        cxt.save();
        cxt.translate(x, y);
        //绘制圆角矩形的各个边
        this.drawRoundRectPath(cxt, width, height, radius);
        cxt.fillStyle = fillColor || "#000000"; //若是给定了值就用给定的值否则给予默认值
        cxt.fill();
        cxt.restore();
    };

    drawRoundRectPath(cxt, width, height, radius){
        cxt.beginPath(0);
        //从右下角顺时针绘制，弧度从0到1/2PI
        cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

        //矩形下边线
        cxt.lineTo(radius, height);

        //左下角圆弧，弧度从1/2PI到PI
        cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

        //矩形左边线
        cxt.lineTo(0, radius);

        //左上角圆弧，弧度从PI到3/2PI
        cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

        //上边线
        cxt.lineTo(width - radius, 0);

        //右上角圆弧
        cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

        //右边线
        cxt.lineTo(width, height - radius);
        cxt.closePath();
    };

    judgmentNoun(noun){
        switch(noun){
            case 'nh':
                return '人名';
            case 'ni':
                return '机构名';
            case 'ns':
                return '地名';
            default:
                return null;
        }
    };

    change(e){
        this.setState({
            input: e.target.value
        });
    };

    render(){
        return (
            <div style={{padding: '10px', boxSizing: 'border-box'}}>
                <Breadcrumb>
                    <Breadcrumb.Item>
                        <HomeOutlined/>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>
                        LTP
                    </Breadcrumb.Item>
                </Breadcrumb>
                <canvas id='graph' width='1630' height='600' style={{width: '100%', height: 600, border: '1px solid #ccc'}} />
                <div style={{marginTop: '10px', marginBottom: '10px'}}>
                    <Input.Search placeholder="input search text" value={this.state.input} enterButton="Search" size="large" onChange={(e) => {this.change(e)}} onSearch={() => {this.getData()}} />
                </div>
                <div>
                    <h2>ltp自然语言处理</h2>
                    <p>最近有需求，做这种图表，但是在网上有没有找到比较好示例，最后自己用原生canvas画了一个图表。</p>
                    <h2>代码部分</h2>
                    <pre>
{`
this.state = {
    input: '他叫汤姆去拿外衣。',
    graph: undefined, 
    graphData: undefined, // 请求的数据
    offsets: [],  // 短句offset组成的数组
    wordsSubscript: '',  // input中输入的短句
    wordsIndex: [],   // 回传的数据id，具体下面会讲
    canvas: undefined, // canvas图
    canvasX: 60,  // 初始化root的x位置
    canvasY: 240,  // 初始化root的y位置
    index: 0,  // 控制动词的位置
    startX: 120,  // 循环的第一个节点x位置
    offsetType: []  // offset对应的数据
};
        
componentDidMount() {
    this.getData();  // 请求接口回传数据
    console.log('width: ' , $('#graph').width() , ', ' , 'height: ' , $('#graph').height());
};

getData(){
    let _this = this;

    // 点击搜索时，初始化canvas图表
    if(_this.state.canvas){
        _this.state.canvas.clearRect(0, 0, 1630, 422);
    }
    $.ajax({
        method: 'POST',
        url: 'http://39.96.43.154:8080/api',
        data: JSON.stringify({
            text: _this.state.input
        })
    }).then(res => {
        _this.setState({
            graphData: res
        });
        _this.setCanvas();  // 设置canvas函数
    })
};
`}
                    </pre>
                    <h3>重点部分！！！canvas图配置！！！</h3>
                    <pre>
{`
setCanvas() {
    // 初始化canvas中使用的数据
    this.state.index = 0;
    this.state.offsets = [];
    this.state.wordsSubscript = '';
    this.state.wordsIndex = [];
    
    
    let _this = this;
    let ctx = _this.state.canvas = document.getElementById('graph').getContext('2d');
    // 初始化canvas图表
    ctx.clearRect(0,0,$('#graph').width(),$('#graph').height());
    
    // 设置canvas中字体样式
    ctx.font = '14px serif';
    ctx.fillStyle = "#000";
    
    // 循环graphData中的words，取出返回的每个词和其对应的属性
    _this.state.graphData.words.forEach(item => {
        /* 数据格式
         * words: [
         *      {
         *          id: 3,              // 数据id
         *          length: 2,          // 数据的长度，由几个字组成
         *          offset: 5,          // offset，唯一值，确定词的格式
         *          text: '昂扬',        // 词
         *          pos: 'a',           // 词性标注
         *          parent: 5,          // 他的父数据的id
         *          relation: 'ATT',    // 与父数据连线的句法分析结果
         *          roles: [            // 语义角色标注
         *              text: '斗志',    // 对应的语义词
         *              offset: 8,      // 对应的语义词offset
         *              length: 2,      // 对应的语义词长度
         *              type: 'A0'      // 对应的语义词标注
         *          ],
         *          parents: [          // 语义依存图的父节点
         *              {
         *                  parent: 5,  // id
         *                  relate: 'FEAT'  // 语义依存分析结果
         *              }
         *          ]
         *      }
         * ]
         */
         
        // 将数据的offset放入一个数组
        _this.state.offsets.push(item.offset);
           
        // 将词及字合成一句话
        _this.state.wordsSubscript = _this.state.wordsSubscript.concat(item.text);
        
        // 循环放入数据的id
        for(let i = 0; i < item.length; i++){
            _this.state.wordsIndex.push(item.id);
        }
    });

    // 再次循环绘制canvas图
    _this.state.graphData.words.map((item, index) => {
        // 初始化offsetType
        _this.state.offsetType = [];
        
        // 绘制字词，因为索引index从0开始，并且第一个root不是接口回调数据，所以从第三个开始绘制数据， canvasY为自定义数据
        ctx.fillText(item.text, _this.state.canvasX*(index+2), _this.state.canvasY);
        
        // 绘制词性标注，高度提高50，其他其他数据不变。
        ctx.fillText(item.pos, _this.state.canvasX*(index+2), _this.state.canvasY + 50);
        
        // 判断绘制命名实体，命名实体的pos值只有三个’nh‘，’ni‘，’ns‘
        if(item.pos === 'nh' || item.pos === 'ni' || item.pos === 'ns'){
            ctx.fillStyle = 'green';
            
            // 先绘制矩形，然后再将问题绘制到矩形上。过程基本和绘制字词相似。
            ctx.fillRect(_this.state.canvasX*(index+2) - 20, _this.state.canvasY + 82, 70, 25);
            ctx.fillStyle = '#000';
            ctx.fillText(_this.judgmentNoun(item.pos), _this.state.canvasX*(index+2), _this.state.canvasY + 100);
        }


        // 通过用words中的offset去匹配roles中的offset，indexOf不返回-1代表当前roles中的offset可以获取索引，从而获取本次循环的开始索引和结束索引。
        // 判断当前条数据是否具有roles字段。
        if(JSON.stringify(item.roles) !== '[]'){
            // 使index+1，可以使每条数据的语义标注不同行。
            _this.state.index += 1;
            
            // 将roles中的type、text放入两个数组中，匹配两个数组
            let type = [];
            let all = [];
            item.roles.map(nt => {
                type.push(nt.type);
                all.push(nt.text);
            });

            // 绘制动词，x为词的x，y自定义
            ctx.fillText(item.text, _this.state.canvasX*(index+2), _this.state.canvasY + 100 + _this.state.index * 50)

            all.map((li, i) => {
                ctx.fillStyle = 'green';
                // 设置x，通过词获取在短句中的索引，从而获取该词的id，来设置x。
                let x = _this.state.canvasX * (_this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li)] + 2) - 20;
                
                // 设置y，index为roles存在的个数
                let y = _this.state.canvasY + 85 + _this.state.index * 50;
                
                // _this.wordsIndex[_this.wordsSubscript.indexOf(li) + li.length]为词的结束id，_this.wordsIndex[_this.wordsSubscript.indexOf(li)]为词的起始id
                let length = _this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li) + li.length] - _this.state.wordsIndex[_this.state.wordsSubscript.indexOf(li)];
                
                // 绘制圆角矩形，可复用，具体逻辑在下方
                _this.fillRoundRect(ctx, x, y, 60 * length, 25, 8, '#e69138');
                ctx.fillStyle = '#000';
                ctx.fillText(type[i], x + (60*length/2) - 10, y + 15);

            });
        }

        ctx.fillText('root', _this.state.canvasX, _this.state.canvasY);

        // 利用三次贝塞尔曲线画箭头

        let count = Math.abs(item.id - item.parent);
        // if(count > 3){
        //   count = 3;
        // }
        ctx.beginPath();
        
        // 判断他的子节点在当前节点的左侧还是右侧，如果在左侧，箭头起始点偏左，在右侧起始点偏右，两种情况落点都在中间
        if(item.parent - item.id > 0){ 
            ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY-20);
            ctx.bezierCurveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2), _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2), _this.state.canvasY-20);
        }else{
            ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY-20);
            ctx.bezierCurveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2) + 20, _this.state.canvasY - 40*count, _this.state.canvasX*(item.parent+2) + 20, _this.state.canvasY-20);
        }
        ctx.strokeStyle = "green";
        
        // 绘制句法分析结果(箭头上的标注)
        ctx.fillText(item.relation, (_this.state.canvasX*(index+2) + _this.state.canvasX*(item.parent+2)) / 2, _this.state.canvasY - 40*count + 20);

        // 绘制箭头，
        ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 20);
        ctx.lineTo(_this.state.canvasX*(index+2) + 5, _this.state.canvasY - 25);
        ctx.moveTo(_this.state.canvasX*(index+2) + 10, _this.state.canvasY - 20);
        ctx.lineTo(_this.state.canvasX*(index+2) + 15, _this.state.canvasY - 25);
        ctx.stroke();
    });
    ctx.save();
};
`}
                    </pre>
                    <h3>在下面为语义标注矩形圆角绘制</h3>
                    <pre>
{`
fillRoundRect(cxt, x, y, width, height, radius, /*optional*/ fillColor){
        //圆的直径必然要小于矩形的宽高
        if (2 * radius > width || 2 * radius > height) { return false; }

        cxt.save();
        cxt.translate(x, y);
        //绘制圆角矩形的各个边
        this.drawRoundRectPath(cxt, width, height, radius);
        cxt.fillStyle = fillColor || "#000000"; //若是给定了值就用给定的值否则给予默认值
        cxt.fill();
        cxt.restore();
    };

    drawRoundRectPath(cxt, width, height, radius){
        cxt.beginPath(0);
        //从右下角顺时针绘制，弧度从0到1/2PI
        cxt.arc(width - radius, height - radius, radius, 0, Math.PI / 2);

        //矩形下边线
        cxt.lineTo(radius, height);

        //左下角圆弧，弧度从1/2PI到PI
        cxt.arc(radius, height - radius, radius, Math.PI / 2, Math.PI);

        //矩形左边线
        cxt.lineTo(0, radius);

        //左上角圆弧，弧度从PI到3/2PI
        cxt.arc(radius, radius, radius, Math.PI, Math.PI * 3 / 2);

        //上边线
        cxt.lineTo(width - radius, 0);

        //右上角圆弧
        cxt.arc(width - radius, radius, radius, Math.PI * 3 / 2, Math.PI * 2);

        //右边线
        cxt.lineTo(width, height - radius);
        cxt.closePath();
    };
`}
                    </pre>
                </div>
            </div>
        )
    }
}

export default withRouter(LTPPage);