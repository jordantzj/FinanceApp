import { Fragment } from 'react';
import classes from './Header.module.css';

function Header() {
    const base_url = 'http://localhost:3000/'
    return (
        <Fragment>
            
            <div>
                <div className={classes.header}>
                    <a href={base_url} className={classes.logo}>Portfolio</a>
                    <div className={classes.header_right}>
                        <a className={classes.active} href={base_url}>Home</a>
                        <a href={base_url}>Contact</a>
                        <a href={base_url}>About</a>
                    </div>
                </div>
            </div>
        </Fragment>
    )
};

export default Header