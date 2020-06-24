import React from 'react';

import './SetCard.scss';

class SetCard extends React.Component {
  render() {
    const { set } = this.props;
    return (
      <div className="SetCard col-3">
        <div className="card">
            <div className="card-body">
              <h5 className="card-title">{set.setTitle}</h5>
            </div>
              <ul className="list-group list-group-flush">
                <li className="list-group-item"></li>
              </ul>
                <div className="card-body">
                  <a href="#" className="card-link">Card link</a>
                  <a href="#" className="card-link">Another link</a>
                </div>
          </div>
      </div>
    );
  }
}

export default SetCard;
