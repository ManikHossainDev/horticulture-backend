import  { forwardRef } from 'react';

type inputCssStyle = {
    className: string;
}

const CustomInput = forwardRef<HTMLInputElement | null, inputCssStyle>(({className},inputRef) => {
    return (
        <div>
           <input 
         ref={inputRef}
          className={className}
          type="text"
          name="name"
          id="name"
          
        /> 
        </div>
    );
});

export default CustomInput;