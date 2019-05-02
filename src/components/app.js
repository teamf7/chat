import React from "react";
import { connect } from "react-redux";

import "./app.css";
import { Auth } from "./auth";
import {
  socketsAddUser,
  socketsConnect,
  socketMessageSend,
  socketsDisconnect
} from "../actions";

const mapStateToProps = state => {
  return {
    isAuthorized: state.isAuthorized,
    username: state.username,
    messages: state.messages,
    numUsers: state.numUsers
  };
};

const mapDispatchToProps = dispatch => {
  return {
    socketsAddUser: username => dispatch(socketsAddUser(username)),
    socketsConnect: () => dispatch(socketsConnect()),
    socketsDisconnect: () => dispatch(socketsDisconnect()),
    socketMessageSend: message => dispatch(socketMessageSend(message))
  };
};

class Application extends React.Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    this.props.socketsConnect();
  }
  componentWillUnmount() {
    this.props.socketsDisconnect();
  }
  render() {
    if (!this.props.isAuthorized) {
      return <Auth setUsername={this.props.socketsAddUser} />;
    }
    return (
      <>
        <div>Активных пользователей: {this.props.numUsers}</div>
        <div className="chat page">
          <div className="chatArea">
            <ul className="messages">
              {this.props.messages.map(msg => (
                <li key={msg}>
                  {msg.username} - {msg.message}
                </li>
              ))}
            </ul>
          </div>
          <input
            className="inputMessage"
            placeholder="Type here..."
            onKeyDown={this.onKeyDown.bind(this)}
          />
        </div>
      </>
    );
  }
  onKeyDown(e) {
    if (e.keyCode === 13) {
      this.props.socketMessageSend(e.target.value);
      e.target.value = "";
    }
  }
}

const App = connect(
  mapStateToProps,
  mapDispatchToProps
)(Application);

export default App;
