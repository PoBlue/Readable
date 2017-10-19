import React, {Component} from 'react'
import {
    OPTION_TIME,
    OPTION_VOTE
} from './constant'

class SortSelector extends Component {
    selectHandler(event) {
        let selectValue = event.target.value;
        this.props.updateSortby({ sortby: selectValue })
    }

    render() {
        return (
            <div className="sort-selector">
                <select name="sort" id="sort"
                    value={this.props.sortby}
                    onChange={(event) => this.selectHandler(event)}>
                    <option value="sortby" disabled>sort by</option>
                    <option value={OPTION_TIME}>time</option>
                    <option value={OPTION_VOTE}>vote</option>
                </select>
            </div>
        )
    }
}

export default SortSelector;