import React, {Component} from 'react';


class Search extends Component {
    state = {
        userInput: '',
    };

    submitForm = (e) => {
        e.preventDefault();
        let value = this.state.userInput;
        this.props.searchProfile(value);
        this.setState({userInput: ''});
    };

    onChangeInput = (e) => {
        this.setState({userInput: e.target.value});
    };

    render(){
        return(
            <div className="search-box">
                <form onSubmit={this.submitForm}>
                    <label>
                        <input
                        type="search"
                        value={this.state.userInput}
                        placeholder="type username and hit enter"
                        onChange={this.onChangeInput}
                        />
                    </label>
                </form>
            </div>
        )
    }
}

export default Search;