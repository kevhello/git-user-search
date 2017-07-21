import React, {Component} from 'react';
import Profile from './Profile';
import Search from './Search';

const API = 'https://api.github.com/users';

class Github extends Component {

    state = {
        username: 'kevhello',
        name: '',
        avatar: '',
        repos: '',
        followers: '',
        following: '',
        homeURL: '',
        notFound: '',
    };

    getProfile = (username) => {
        let finalURL = `${API}/${username}`;

        fetch(finalURL)
            .then((res) => res.json())
            .then((data) => {
                this.setState({
                    username: data.login,
                    name: data.name,
                    avatar: data.avatar_url,
                    repos: data.public_repos,
                    followers: data.followers,
                    following: data.following,
                    homeURL: data.html_url,
                    notFound: data.message,
                })
            })
            .catch((error) => console.log('Error occurred in fetching user data'));
    };

    componentDidMount() {
        this.getProfile(this.state.username);
    }

    render(){
        return(
            <div>
                <section id="card">
                    <Search searchProfile={this.getProfile} />
                    <Profile userData={this.state} />
                </section>
            </div>
        )
    }
}

export default Github;