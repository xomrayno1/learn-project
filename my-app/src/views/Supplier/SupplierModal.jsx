import { Form, Field, ErrorMessage, Formik } from 'formik'
import {Button, Modal, Space} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'
import _ from 'lodash'
import {
    Row,
    Col,
    Label
  } from "reactstrap";
import {createSupplier, updateSupplier} from '../../redux/action/supplierAction'
import { CustomInputText, CustomTextArea } from '../../variables/CustomInput'
import { useState } from 'react';
 
 
function SupplierModal({modal, formRef, setModal}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const supplierSchema = Yup.object({
        name: Yup.string().required("Không được để trống tên !"),
        email: Yup.string().required("Không được để trống email !"),
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
                dispatch(updateSupplier(formRef, setModal));  
            }else{
                dispatch(createSupplier(formRef, setModal));  
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
                    phone: '',
                    email: '',
                    address: ''
                }}
                onSubmit={onHandleSave}
                innerRef={formRef}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={supplierSchema}
            >
                <Form>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Tên nhà cung cấp :</Label>
                            <Field name="name" as={CustomInputText} placeholder="Tên nhà cung cấp" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Email :</Label>
                            <Field name="email" as={CustomInputText} placeholder="Email" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="email" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Số điện thoại :</Label>
                            <Field name="phone" as={CustomInputText} placeholder="Số điện thoại" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Địa chỉ :</Label>
                            <Field name="address" as={CustomTextArea} placeholder="Địa chỉ" />
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
                            <Button key="cancel" 
                                onClick={onCancelModal}>
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
export default SupplierModal;