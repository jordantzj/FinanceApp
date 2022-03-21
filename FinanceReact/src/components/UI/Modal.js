import classes from './Modal.module.css';
import reactDom from 'react-dom';
import { Fragment } from 'react/cjs/react.production.min';


function Modal(props) {


    const Backdrop = (props) => {
        return <div className={classes.backdrop} onClick={props.onClose} />
    }
    const ModalOverlay = (props) => {
        return <div className={classes.modal}>
            <div className={classes.content}>{props.children}</div>
        </div>
    }
    return (
        <Fragment>
            {reactDom.createPortal(<Backdrop onClose={props.onClose}></Backdrop>, document.getElementById('backdrop-root'))}
            {reactDom.createPortal(<ModalOverlay onClose={props.onClose}>{props.children}</ModalOverlay>, document.getElementById('modal-root'))}
        </Fragment>

    )
};

export default Modal