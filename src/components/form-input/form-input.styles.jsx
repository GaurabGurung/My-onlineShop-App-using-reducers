import { styled, css } from "styled-components"; 
export const Group = styled.div`
    position: relative; 
    margin: 45px 0; 
    input[type='password'] {
        letter-spacing: 0.3em; 
    }   
`

const subColor = 'grey';
const mainColor = 'black';

const shrinkLabelStyles = css` \\CSS block is used to create a css block and use it conditionally to other styled components
    position: absolute;
    top: -14px; 
    font-size: 12px; 
    color: ${mainColor}; 
`
export const FormInputLabel = styled.label`
    color: ${subColor}; 
    font-size: 16px; 
    font-weight: normal; 
    position: absolute; 
    pointer-events: none; 
    left: 5px; 
    top: 10px; 
    transition: 300ms ease all; 

    ${({shrink}) => shrink && shrinkLabelStyles}; \\passed shrink props from the main component
`

export const InputWithStyle= styled.input`
    background: none; 
        background-color: white; 
        color: ${subColor}; 
        font-size: 18px; 
        padding: 10px 10px 10px 5px; 
        display: block; 
        width: 100%; 
        border: none; 
        border-radius: 0; 
        border-bottom: 1px solid ${subColor}; 
        margin: 25px 0; 
        &:focus { 
            outline: none; 
        } 
        &:focus ~ ${FormInputLabel} { 
           ${shrinkLabelStyles};
        }
        /*
         the user "focus " (focuses or click) on the input , 
         I want you to find next sibling or generally subsequent sibling with the class ".form-input-label"
         and attach that shrinlabel mixing, it create the shrinking effect
         However, the next or sequent sibling should be above the current one
        */       
    }
`

