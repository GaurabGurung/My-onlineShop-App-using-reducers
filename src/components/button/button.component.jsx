import { BaseBotton, GoogleSignInBotton, InvertedButton } from './button.styles';



export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'
}

const getButton = (buttonType = BUTTON_TYPE_CLASSES.base ) => 
    ({
        [BUTTON_TYPE_CLASSES.base]: BaseBotton,
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInBotton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton,
    }[buttonType])


const Button = ({children, buttonType, ...otherProps}) => {

    const CustomButton = getButton(buttonType);

    return (
        <CustomButton {...otherProps}> 
        {children} 
        </CustomButton> 
    )
}

export default Button;

/**
 * in the getButton function, we are not assigning new values to the BUTTON_TYPE_CLASSES properties. 
 * Instead, we are using the values of BUTTON_TYPE_CLASSES as keys to access the corresponding button components.

Here's how it works:

getButton takes buttonType as an argument (which has a default value of BUTTON_TYPE_CLASSES.base).
It uses square brackets [] to dynamically access the value associated with buttonType in the BUTTON_TYPE_CLASSES object.
This value will be one of 'base', 'google', or 'inverted'.
The value is then used to look up the corresponding component.
For example, if buttonType is 'google', the line:

javascript:
        [BUTTON_TYPE_CLASSES.google]: GoogleSignInBotton,
            will evaluate to:    { 'google-sign-in': GoogleSignInBotton }

So, CustomButton will be assigned the value of GoogleSignInBotton. This allows the Button component to render the correct button component based on the buttonType provided.
 */