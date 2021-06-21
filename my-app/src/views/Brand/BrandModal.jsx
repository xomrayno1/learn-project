import { Form, Field, ErrorMessage, Formik } from 'formik'
import {Button, Modal, Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'

import {
    Row,
    Col,
    Label
  } from "reactstrap";
import {createBrand, updateBrand} from '../../redux/action/brandAction'
import { CustomInputText, CustomTextArea } from '../../variables/CustomInput'
import { useState } from 'react';
 
 
function BrandModal({modal, formRef, setModal}) {
    const dispatch = useDispatch();
    const {isLoading} = useSelector(state => state.brand);
     

    const brandSchema = Yup.object({
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
        console.log("data", data);
        if(data['id']){
            dispatch(updateBrand(formRef, setModal));  
        }else{
            dispatch(createBrand(formRef, setModal));  
        }
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
                    id: '',
                    name:'',
                    description: '',
                }}
                onSubmit={onHandleSave}
                innerRef={formRef}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={brandSchema}
            >
                <Form>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Tên nhãn hiệu :</Label>
                            <Field name="name" as={CustomInputText} placeholder="Tên nhãn hiệu" />
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
                                loading={isLoading}
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
export default BrandModal;