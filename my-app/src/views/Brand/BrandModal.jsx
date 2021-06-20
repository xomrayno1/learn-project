import { Form, Field, ErrorMessage, Formik } from 'formik'
import {Button, Modal} from 'antd'
import {
    Row,
    Col,
    Label
  } from "reactstrap";

import { CustomInputText, CustomTextArea } from '../../variables/CustomInput'
 
function BrandModal({modal, formRef, setModal }) {
    
    const onCancelModal = () => {
        setModal({
            ...modal,
            visible: false,
        })
        formRef.current.resetForm();
    }

    const onHandleSave = (data) => {
        console.log("save");
    }

    return (
        <Modal
            title={modal.title}
            visible={modal.visible}
            onOk={onHandleSave}
            onCancel={onCancelModal}
            footer={[
                <Button key="save" type="primary" onClick={onHandleSave}>
                    Lưu
                </Button>,
                <Button key="cancel" onClick={onCancelModal}>
                    Huỷ
                </Button>,
            ]}
        >
            <Formik
                initialValues={{
                    name: '',
                    description: '',
                }}
                onSubmit={onHandleSave}
                innerRef={formRef}
            >
                <Form>
                    <Row>
                        <Col md="12">
                            <Label>Tên nhãn hiệu :</Label>
                            <Field name="name" as={CustomInputText} placeholder="Tên nhãn hiệu" />
                        </Col>
                        <Col md="12">
                            <ErrorMessage name="name" component="div" className="error-message" />
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Label>Mô tả :</Label>
                            <Field name="description" as={CustomTextArea} placeholder="Mô tả" />
                        </Col>
                    </Row>
                </Form>
            </Formik>
        </Modal>
    )
}
export default BrandModal;