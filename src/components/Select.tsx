const Select = ({children}) => {
   return <Select>{children}</Select>;
};

const SelectOption = ({value,children}) => {
   return <option value={value}>{children}</option>
}

Select.SelectOption = SelectOption ;

export default Select