import React from "react";
import { connect } from "react-redux";
import {} from "../actions";

const mapStateToProps = state => {
  return {
    loaded: state.loaded,
    message: state.message,
    connected: state.connected
  };
};

class SocketMessageLog extends React.Component {
  render() {
    const { loaded, message, connected } = this.props;
    return (
      <ul>
        <li>{message}</li>
      </ul>
    );
  }
}

const SocketMessage = connect(mapStateToProps)(SocketMessageLog);

export default SocketMessage;
