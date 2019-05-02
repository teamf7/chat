import React from "react";

export class Auth extends React.Component {
  constructor(props){
    super(props);
    this.onKeyDown = this.onKeyDown.bind(this);
  }
  render() {
    return (
      <div className="login">
        <div className="form">
          <h3 className="title">What's your nickname?</h3>
          <input className="usernameInput" type="text" onKeyDown={this.onKeyDown} />
        </div>
      </div>
    );
  }

  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.setUsername(e.target.value);
    }
  }
}
