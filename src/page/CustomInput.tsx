import  { forwardRef } from 'react';

type inputCssStyle = {
    className: string;
}

const CustomInput = forwardRef<HTMLInputElement, inputCssStyle>(({className}, inputRef) => {
    return (
        <div>
           <input 
           ref={inputRef}
          className={className}
          type="text"
          name="name"
          id="name"
          value=""
        /> 
        </div>
    );
});

export default CustomInput;