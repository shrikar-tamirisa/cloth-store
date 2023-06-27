import React from "react";
import "./custom-button.styles.scss";

function CustomButton({children, isGoogle, ...otherProps}){
    return <button className={`${isGoogle ? 'google-sign-in' : ''} custom-button`} {...otherProps}>
        {children}
    </button>
}

export default CustomButton;