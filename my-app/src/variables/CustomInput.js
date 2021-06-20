import {Input} from 'antd'
 

export const CustomInputText = (props) => <Input {...props}  type="text"/>

export const CustomTextArea = (props) => {
    const {TextArea} = Input;
    return  <TextArea   {...props}/>
}