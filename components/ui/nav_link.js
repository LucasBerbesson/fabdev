import React from 'react';
import { Link, useLocation } from 'react-router-dom';

class NavLink extends React.Component {
    render() {
        return(
            <Link className={className} {...this.props}>
                {this.props.children}
            </Link>
        );
    }
}
export default NavLink;
