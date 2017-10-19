import React, {Component} from 'react'

class VoteButton extends Component {
    voteHandler(isUp) {
        this.props.setVote(isUp)
    }

    render() {
        return (
            <div className="vote-button">
                <button onClick={() => this.voteHandler(true)}>up vote</button>
                <button onClick={() => this.voteHandler(false)}>down vote</button>
            </div>
        )
    }
}

export default VoteButton;