import  React  from "react";

function LBBoxContainer(props) {

  const userName = props.name;
  const userAvatar = props.avatar;
  const answersCount = Object.keys(props.answers).length;
  const questionsCount = props.questions.length;

  return (
    <div>
      <div className='LBBox'>
        <div className='LBBox-img'>
          <img src={userAvatar} height={100} width={100} alt='avatar' />
        </div>
        <div className='LBBox-ques-stats'>
            <h2>{userName}</h2>
            <div className="answered-created-questions">
                <span>Answered questions</span> <span>{answersCount}</span>
                <hr />
                <span>Created questions</span> <span>{questionsCount}</span>

            </div>
        </div>
        <div className='LBBox-score'>
            <div className="score-card">
                <h2>Score</h2>
                <div className="score-circle">
                    {answersCount+questionsCount}
                </div>
            </div>
        </div>
      </div>
    </div>
  );
}

export default LBBoxContainer;
