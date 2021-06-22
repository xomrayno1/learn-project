import {Form, Field, ErrorMessage, Formik, withFormik } from 'formik'
import {Button, Modal, Space, Select} from 'antd'
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup'

import {
    Row,
    Col,
    Label
  } from "reactstrap";
import {createProduct, updateProduct} from '../../redux/action/productAction'
import { CustomInputText, CustomTextArea, CustomSelect } from '../../variables/CustomInput'
import { useState } from 'react';
 
 
function ProductModal({modal, formRef, setModal}) {
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
     
    const productSchema = Yup.object({
        name: Yup.string().required("Không được để trống tên !"),
        code: Yup.string().required("Không được để trống code !"),
        weight: Yup.string().required("Không được để trống cân nặng !"),
        price: Yup.string().required("Không được để trống giá !"),
        categoryId: Yup.string().required("Không được để trống danh mục !"),
        brandId: Yup.string().required("Không được để trống thương hiệu !"),
    })

    const onCancelModal = () => {
        setModal({
            ...modal,
            visible: false,
        })
        formRef.current.resetForm();
    }

    const onHandleSave = (data) => {
        // const wait = new Promise((resolve, reject) => { 
        //     setLoading(true);           
        //     setTimeout(() => {
        //         setLoading(false) 
        //         resolve(null)
        //     }, 2000)   
        // })
        
        // wait.then(() => {
        //     if(data['id']){
        //         dispatch(updateProduct(formRef, setModal));  
        //     }else{
        //         dispatch(createProduct(formRef, setModal));  
        //     }
        // })
        console.log("data", data);
    }
  
    const handleChangeBrand = (value) => {
        console.log(value);
        formRef.current.setValues({brandId: value})
    }
    const handleChangeCategory = (value) => {
        console.log(value);
        formRef.current.setValues({brandId: value})
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
                    name : '',
                    weight: '',
                    price: '',
                    code: '',
                    brandId: '',
                    categoryId: ''
                }}
                onSubmit={onHandleSave}
                validateOnBlur={false}
                validateOnChange={false}
                validationSchema={productSchema}
                innerRef={formRef}
            >
                <Form>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Tên sản phẩm :</Label>
                            <Field name="name" as={CustomInputText} placeholder="Nhập tên" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Code :</Label>
                            <Field name="code" as={CustomInputText} placeholder="Nhập code" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="code" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Giá :</Label>
                            <Field name="price" as={CustomInputText} placeholder="Nhập giá" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="price" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Giá :</Label>
                            <Field name="weight" as={CustomInputText} placeholder="Nhập cân nặng" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="weight" component="div" className="error-message" />
                        </Col>
                    </Row>
                   
                    <Row className="margin-5px">
                        <Col md="12" >
                            <Label>Danh mục :</Label>
                            <Field
                                name="categoryId"
                                className="select-custom-ant" 
                                as={CustomSelect}  
                            >
                                <option value="" disabled hidden>Chọn danh mục</option>
                                <option value="1">Red</option>
                                <option value="2">Black</option>
                            </Field>
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="categoryId" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row className="margin-5px">
                        <Col md="12">
                            <Label>Thương hiệu :</Label>
                            <Field as={CustomSelect} 
                                name="brandId" 
                                placeholder="Chọn thương hiệu" 
                                className="select-custom-ant"
                            >
                                <option style={{color: 'gray'}} value="" disabled hidden>Chọn thương hiệu</option>
                                <option value="1">Red</option>
                                <option value="2">Black</option>
                            </Field>
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="brandId" component="div" className="error-message" />
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

export default ProductModal;