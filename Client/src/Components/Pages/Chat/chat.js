import React from 'react';
import './chat.css';
import { useDispatch } from 'react-redux'
import { getRealTimeUsers } from './auth.actions';

const Chat = (props) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getRealTimeUsers)
  }, []);
  return (
    <section className="contain">
      <div className="chatArea">
        <div className="chatHeader"> Rizwan Khan </div>
        <div className="messageSections">

          <div style={{ textAlign: 'left' }}>
            <p className="messageStyle" >Hello User</p>
          </div>

        </div>
        <div className="chatControls">
          <textarea />
          <button>Send</button>
        </div>
      </div>
      <div className="listUsers">

        <div className="displayName">

          <div style={{ display: 'flex', flex: 0.5, justifyContent: 'space-between', margin: '0 10px' }}>
            <span>online</span>
            <span style={{ fontWeight: 500 }}>Rizwan Khan</span>
          </div>
          <div className="displayPic">
            <img src="https://i.pinimg.com/originals/be/ac/96/beac96b8e13d2198fd4bb1d5ef56cdcf.jpg" alt="" />
          </div>
        </div>

      </div>

    </section>
  );
}

export default Chat

