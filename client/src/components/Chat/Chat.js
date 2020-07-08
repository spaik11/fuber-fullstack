import React, { useState, useEffect, useRef } from "react";
import ForumIcon from "@material-ui/icons/Forum";
import CloseIcon from "@material-ui/icons/Close";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import SendIcon from "@material-ui/icons/Send";
import { connect } from "react-redux";

export function Chat(props) {
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [mousingOver, setMousingOver] = useState(false);
  const [chatLog, setChatLog] = useState([]);

  const chatDiv = useRef(null);

  const container = {
    position: "absolute",
    left: ".3em",
    bottom: "20px",
    cursor: "pointer",
    color: props.darkMode.isDarkMode ? "#eee" : "#989898",
    visibility: !chatOpen ? "initial" : "hidden",
  };

  const chatContainer = {
    position: "absolute",
    left: ".3em",
    bottom: "20px",
    width: "25em",
    color: "#0f0f0f",
    background: "rgba(238, 238, 238, 0.8)",
    borderRadius: "15px",
    cursor: "default",
    maxHeight: "30em",
    overflowY: "auto",
    overflowX: "hidden !important",
    visibility: chatOpen ? "initial" : "hidden",
  };

  const closeIcon = {
    position: "sticky",
    zIndex: 1555,
    top: 10,
    right: 10,
    float: "right",
    borderRadius: "50%",
    cursor: "pointer",
    background: "rgba(238, 238, 238)",
  };

  const sendIconStyle = {
    color: mousingOver ? "#3f50b5" : "black",
    cursor: "pointer",
  };

  const messageContainer = {
    display: "flex",
    margin: "10px",
  };

  const authorContainer = {
    fontStyle: "italic",
    fontWeight: "bold",
  };

  const inputStyle = {
    position: "sticky",
    bottom: 0,
    backgroundColor: "white",
  };

  const showChat = (bool) => {
    setChatOpen(bool);
  };

  const sendMessage = () => {
    if (chatMessage.trim()) {
      if (props.socket) {
        props.socket.emit("receive-message", {
          author: props.username,
          message: chatMessage.trim(),
        });
      }
      setChatMessage("");
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      sendMessage();
    }
  };

  const handleOnChange = (e) => {
    setChatMessage(e.target.value);
  };

  const scrollToBottom = () => {
    if (chatDiv) {
      const scrollHeight = chatDiv.current.scrollHeight;
      chatDiv.current.scrollTop = scrollHeight;
    }
  };

  useEffect(() => {
    if (props.socket) {
      props.socket.on("get-chat-messages", (chatMessages) => {
        setChatLog(chatMessages);
        scrollToBottom();
        setChatMessage("");
      });
    }
  }, [props]);

  return (
    <div style={container}>
      <ForumIcon style={{ fontSize: 60 }} onClick={() => showChat(true)} />
      <div style={chatContainer} ref={chatDiv}>
        <CloseIcon style={closeIcon} onClick={() => showChat(false)} />
        {chatLog &&
          chatLog.map((entry, i) => {
            return (
              <div style={messageContainer} key={i}>
                <div style={authorContainer}>{entry.author}: &nbsp;</div>
                <div>{entry.message}</div>
              </div>
            );
          })}
        <TextField
          style={inputStyle}
          label="Start typing ..."
          variant="filled"
          value={chatMessage}
          onKeyPress={(e) => handleKeyPress(e)}
          onChange={(e) => handleOnChange(e)}
          fullWidth
          multiline
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendIcon
                  style={sendIconStyle}
                  onMouseOver={() => setMousingOver(true)}
                  onMouseLeave={() => setMousingOver(false)}
                  onClick={() => sendMessage()}
                />
              </InputAdornment>
            ),
          }}
        />
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  darkMode: state.isDarkMode,
  socket: state.authUser.socket,
  username: state.authUser.user.username,
});

export default connect(mapStateToProps, {})(Chat);
