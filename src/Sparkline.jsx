import React, { Component } from 'react';
import { observer } from 'mobx-react';
import Promise from 'bluebird';

@observer(['SparkStore'])
class Sparkline extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [145, 123, 121, 78, 23, 9, 23, 24, 25, 89, 35, 124, 78, 98]
    };

    // this.drawCanvas = this.drawCanvas.bind(this);
  }

  componentDidMount() {
    // const { SparkStore } = this.props;
    // SparkStore.loadData(this.props.name);
    this.poll();
  }

  componentWillUnmount() {
    cancelAnimationFrame(this.drawCanvas);
  }

  async poll () {
    try {
      const { SparkStore } = this.props;
      await SparkStore.loadData(this.props.name);
      await Promise.delay(5000);
      console.log('polling');
      this.poll();
    }
    catch(err) { console.log(err); }
  }

  showDot(x, y) {
    const canvas = this.refs.canvas;
    const ctx = canvas.getContext('2d');
    const radius = 2 * Math.PI;
    ctx.beginPath();
    ctx.arc(x, y, 1, 0, radius, false);
    ctx.fillStyle = 'red';
    ctx.strokeStyle = 'red';
    ctx.fill();
    ctx.stroke();
    ctx.closePath();

    if(x > canvas.width - radius || y > canvas.height - radius) {
      console.log('touching!');
    }
  }

  drawCanvas() {
    const { SparkStore } = this.props;

    if(!this.refs.canvas) {
      return;
    }

    const data = SparkStore.data.slice(),
          canvas = this.refs.canvas,
          ctx = canvas.getContext('2d');

    let total = data.length,
        max = Math.max.apply(Math, data),
        min = Math.min.apply(Math, data),
        xstep = canvas.width/total;

    //clearing canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    for(let i=0; i<total; i++) {
      let x = Math.floor(xstep * (i + 1)),
          y = Math.floor(canvas.height * (data[i] - min) / (max - min));

      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }

      if(data[i] == min) {
        console.log(x,y,min);
      }
    }
    console.log(min,max);
    ctx.strokeStyle = 'black';
    ctx.stroke();
    ctx.closePath();
    this.showDot(10,0);
  }

  render() {
    const { SparkStore } = this.props;
    this.drawCanvas();
    return(
      <div>
        <small>{SparkStore.size} </small>
        <small>Symbol: {SparkStore.symbol}</small>
        <canvas ref="canvas" width="500" height="100"></canvas>
      </div>
    );
  }

};

export default Sparkline;
