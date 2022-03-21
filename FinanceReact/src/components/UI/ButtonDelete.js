import classes from './ButtonDelete.module.css';

const ButtonDelete = (props) =>{
    
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

export default ButtonDelete;