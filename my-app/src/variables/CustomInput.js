import {Input, Select,Form} from 'antd'
 

export const CustomInputText = (props) => <Input {...props}  type="text"/>

export const CustomTextArea = (props) => {
    const {TextArea} = Input;
    return  <TextArea   {...props}/>
}

export const CustomSelect = (props) => {
    return (
        <select {...props} placeholder="Danh mục" />
    );
}
// style={{ display: 'block'}}