import React from "react";

const Button = (props) => {
    
    return(
        <button className="btn btn-outline-dark" onClick={props.onClick} disabled={props.disabled} >{props.value}</button>
    )
}

export default Button