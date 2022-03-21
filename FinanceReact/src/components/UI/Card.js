import classes from './Card.module.css';
import { Fragment } from 'react';

const Card = props => {
    return (
        <Fragment>
            <div className={`${classes.card} ${props.className}`}>{props.children}</div>
        </Fragment>
    )
};

export default Card