import { Form, Field, ErrorMessage, Formik } from 'formik'
import {Button, Modal, Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'

import {
    Row,
    Col,
    Label
  } from "reactstrap";
import {createCategory, updateCategory} from '../../redux/action/categoryAction'
import { CustomInputText, CustomTextArea } from '../../variables/CustomInput'
import { useState } from 'react';
 
 
function CategoryModal({modal, formRef, setModal}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
     

    const categorySchema = Yup.object({
        name: Yup.string().required("Không được để trống tên !"),
    })

    const onCancelModal = () => {
        setModal({
            ...modal,
            visible: false,
        })
        formRef.current.resetForm();
    }

    const onHandleSave = (data) => {
        const wait = new Promise((resolve, reject) => { 
            setLoading(true);           
            setTimeout(() => {
                setLoading(false) 
                resolve(null)
            }, 2000)   
        })
        
        wait.then(() => {
            if(data['id']){
                dispatch(updateCategory(formRef, setModal));  
            }else{
                dispatch(createCategory(formRef, setModal));  
            }
        })
    }

    return (
        <Modal
            title={modal.title}
            visible={modal.visible}
            onCancel={onCancelModal}
            footer={null}
        >
            <Formik
                initialValues={{
                    name:'',
                    description: '',
                }}
                onSubmit={onHandleSave}
                innerRef={formRef}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={categorySchema}
            >
                <Form>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Tên danh mục :</Label>
                            <Field name="name" as={CustomInputText} placeholder="Tên danh mục" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Mô tả :</Label>
                            <Field name="description" as={CustomTextArea} placeholder="Mô tả" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                        <Space>
                            <Button key="save" 
                                htmlType="submit" 
                                loading={loading}
                                type="primary">
                                Lưu
                            </Button>
                            <Button key="cancel" onClick={onCancelModal}>
                                Huỷ
                            </Button>
                        </Space>
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Modal>
    )
}
export default CategoryModal;