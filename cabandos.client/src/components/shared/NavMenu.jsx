import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink,
    Button
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavMenu.css';
import { isLoginAsync, logoutAsync } from '../../redux/slice/auth/authSlice'
import { fetchMeAsync } from '../../redux/slice/user/userSlice'
import { connect } from 'react-redux';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false
        };
    }

    async componentDidMount() {
        if (!this.props.isLogin) {
            this.props.isLoginAsync();
        }
    }

    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed
        });
    }

    toggleDropdown() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen
        });
    }

    render() {
        const { isLogin, me } = this.props
        if (isLogin && !me) {
            this.props.fetchMeAsync({ includeTasks: true, includeRoles: true });
        }

        
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    container light>

                    <ul className="navbar-nav flex-grow">
                        <NavbarBrand tag={Link} to="/">cabandoSSS</NavbarBrand>
                    </ul>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />


                    {this.props.isLogin ?
                        <div>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/users">Users</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" onClick={this.props.logoutAsync}>Logout</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </div>
                        :
                        <div>
                            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                            <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                                navbar>
                                <ul className="navbar-nav flex-grow">
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/signin">Sign In</NavLink>
                                    </NavItem>
                                    <NavItem>
                                        <NavLink tag={Link} className="text-dark" to="/signup">Sign Up</NavLink>
                                    </NavItem>
                                </ul>
                            </Collapse>
                        </div>
                    }
                </Navbar>
            </header>
        );
    }
}

const mapStateToProps = (state) => ({
    isLogin: state.auth.isLogin,
    me: state.user.me,
});

const mapDispatchToProps = {
    isLoginAsync,
    logoutAsync,
    fetchMeAsync,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavMenu);