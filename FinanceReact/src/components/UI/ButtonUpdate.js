import classes from './ButtonUpdate.module.css';

const ButtonUpdate= (props) =>{
    
    return(
        <button 
        className={classes.button} 
        type={props.type || 'button'} 
        onClick = {props.onClick} 
        >
        {props.children}
        </button>
    );
};

export default ButtonUpdate;