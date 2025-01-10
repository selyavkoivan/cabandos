import React, { Component } from 'react';
import {
    Collapse,
    Navbar,
    NavbarBrand,
    NavbarToggler,
    NavItem,
    NavLink
} from 'reactstrap';
import { Link } from 'react-router-dom';
import '../../assets/styles/NavMenu.css';

class NavMenu extends Component {
    static displayName = NavMenu.name;

    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.toggleDropdown = this.toggleDropdown.bind(this);
        this.state = {
            collapsed: true,
            dropdownOpen: false,
            isLogin: false,
        };
    }

    componentDidMount() {
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
        return (
            <header>
                <Navbar className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
                    container light>

                    <ul className="navbar-nav flex-grow">
                        <NavbarBrand tag={Link} to="/">cabandoSSS</NavbarBrand>
                    </ul>
                    <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />


                    <div>
                        <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
                        <Collapse className="d-sm-inline-flex flex-sm-row-reverse" isOpen={!this.state.collapsed}
                            navbar>
                            <ul className="navbar-nav flex-grow">
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/signin">Вход</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink tag={Link} className="text-dark" to="/signup">Регистрация</NavLink>
                                </NavItem>
                            </ul>
                        </Collapse>
                    </div>
                </Navbar>
            </header>
        );
    }
}
export default NavMenu;