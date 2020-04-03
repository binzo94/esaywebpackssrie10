import React from 'react'

class CountDown extends React.Component {
  constructor({count = 10}) {
    super();
    this.count = count;
    this.state = {
      isCounting: false,
      count: this.count
    };
    this.onClickHandler = this.onClickHandler.bind(this)
  }

  onClickHandler(e) {
    e.preventDefault()
    if (this.state.isCounting) {
      return false;
    }
    if(this.props.sendCode) 
      Promise.all([
        this.props.sendCode()
      ]).then(() => {
        this.startCounting()
      })
    
    else this.startCounting()
  }

  startCounting() {
    this.setState({
      ...this.state,
      isCounting: true
    }, () => {
      setTimeout(() => this.countDown(), 1);
    });
  }


  componentDidMount() {
    if (this.props.auto) {
      this.startCounting();
    }
  }

  clearTimer() {
    this.timer && clearTimeout(this.timer);
  }

  componentWillUnmount() {
    this.clearTimer();
  }

  countDown() {
    var currentCount = this.state.count;
    if (currentCount) {
      this.setState({
        ...this.state,
        count: currentCount - 1
      });
      this.timer = setTimeout(() => this.countDown(), 1000);
    } else {
      this.clearTimer();
      this.setState({
        isCounting: false,
        count: this.count
      });
    }
  }


  render() {
    let {children, defaultText, style} = this.props;
    let {isCounting, count} = this.state;
    return (
      children
        ? React.cloneElement(React.Children.only(children), {
          className: 'countdown-button',
          style,
          onClick: (e) => this.onClickHandler(e)
        }, isCounting ? count + 's' : defaultText)
        : <button
          style = {style}
          className="countdown-button"
          onClick={this.onClickHandler}>
          {isCounting ? count + 's' : defaultText}
        </button>
    );
  }
}

CountDown.defaultProps = {
  defaultText: '点击获取验证码'
};

export default CountDown
