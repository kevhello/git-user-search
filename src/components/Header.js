import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap';

class Header extends Component {

    onLogin = () => {
        this.props.onLogin();
    };

    onLogout = () => {
        this.props.onLogout();
    };

    render(){
        let page;
        if(this.props.idToken){
            page = <NavItem onClick={this.onLogout} href="#">Logout</NavItem>
        } else {
            page = <NavItem onClick={this.onLogin} href="#">Login</NavItem>
        }

        return(
            <div>
                <Navbar>
                    <Navbar.Header>
                        <Navbar.Brand>
                            Github Searcher
                        </Navbar.Brand>
                    </Navbar.Header>
                    <Nav>
                        {/* Shows login or logout depending on idToken */}
                        {page}
                    </Nav>
                </Navbar>
            </div>
        );
    }
}
 export default Header;