import React from "react";
import { Link } from "react-router-dom";


function QuesContainer(props) {
  return (
    <div className='ques-section'>
      <div className='question'>
        <div className='heading'>
          <h3>{props.author}</h3>
        </div>
        <div className='img-part'>
          <img src={props.avatar} height={100} width={100} alt='avatar' />
        </div>
        <div className='poll-part'>
          <h3>Would you rather ...</h3>
          <h4 className='option-text'>{props.text}</h4>
          <h3>Or ...</h3>
          <Link to={`questions/${props.id}`}>
            <button className='poll-link'>View Poll</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default QuesContainer;
