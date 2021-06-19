import React, { useRef, useState } from 'react';
import "../style/style.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
    Label
  } from "reactstrap";
import {Table, Space, Button, Divider, Input, Modal, TextA} from 'antd'
import {Form, Field, ErrorMessage, Formik} from 'formik'

import {confirm, warning} from '../../utils/AppUtils'

function ListBrand(props) {
  const {TextArea } = Input;
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, setModal] = useState({
    visible: false, 
    item : null,
    title: ''
  });
  const formRef = useRef();
 
  const columns = [
    {
      title : 'Mã',
      dataIndex: 'key',
      responsive: ['sm'],
    },{
      title : 'Tên nhãn hiệu',
      dataIndex: 'name',
    },{
      title : 'Mô tả',
      dataIndex: 'description',
    },{
      title : 'Ngày tạo',
      dataIndex: 'create_date',
      responsive: ['sm'],
    },{
      title : 'Ngày cập nhật',
      dataIndex: 'update_date',
      responsive: ['sm'],
    },{
      title :  ' + ',
      render : (_, record) => {
        return <>
          <Space>
            <Button 
              key="1" 
              type="primary" 
              onClick={() => onUpdate(record)}
              >Cập nhật</Button>
          </Space>
        </>
      }
    }
  ]

  const data = [
    {
      key : 1,
      name : 'Red start', 
      description : 'Chuyên cám gà cám vit',
      create_date : '19/06/2021',
      update_date : '19/06/2021',
    },{
      key : 2,
      name : 'Yellow start', 
      description : 'Chuyên cám heo',
      create_date : '19/06/2021',
      update_date : '19/06/2021',
    }
  ]
  
  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys, selectedRows) => {
      setSelectedRowKeys(selectedRowKeys);
    },
  }

  const onUpdate =  (data) =>{
    setModal({
      ...modal,
      visible: true,
      item : data,
      title: 'Cập nhật nhãn hiệu',
    });
    setTimeout(() => {
      formRef.current.setValues({
        name: data.name,
        description: data.description
      })
    }, 200);
    //formRef.current.resetForm
  }

  const onHandleSave = (data) => {
    console.log("save");
  }

  const onHandleDelete = ()=>{
    console.log("delete", selectedRowKeys);
    setSelectedRowKeys([]);
  }

    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Danh sách nhãn hiệu</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="6" sm="4">
                        <Space>
                          <Button 
                            type="primary"
                            onClick={ () => setModal({
                              ...modal,
                              visible: true,
                              item : '',
                              title: 'Thêm nhãn hiệu'
                            })}
                          >Thêm</Button>
                          <Button 
                            type="danger" 
                            onClick={ ()=> selectedRowKeys.length == 0 
                             ? warning("Vui lòng chọn mục để xoá !")
                             : confirm("Bạn có chắc chắn muốn xoá không ?",onHandleDelete)
                            }>Xoá</Button>
                        </Space>
                      </Col>
                      <Col md="4" sm="6">
                        <Input placeholder="Nhập mã hoặc tên để tìm kiếm ...."/>
                      </Col>
                      <Col md="2" sm="2">
                        <Button type="primary">Tìm kiếm</Button>
                      </Col>
                    </Row>
                    <Divider/>
                    <Table
                      columns={columns} 
                      dataSource={data}
                      rowSelection={rowSelection}
                    />
                  </CardBody>
                </Card>
              </Col>

           {/*Modal form*/}
            <Modal
              title={modal.title}
              visible={modal.visible}
              onOk={onHandleSave}
              onCancel={ () => setModal({
                ...modal,
                visible: false,
              })}
              footer={[
                <Button key="save" type="primary" onClick={onHandleSave}> 
                  Lưu
                </Button>,
                <Button key="cancel"  
                onClick={() => setModal({
                  ...modal,
                  visible: false,
                })}>
                  Huỷ
                </Button>,
              ]}
            >
            <Formik
              initialValues={{
                name : modal.item && modal.item.name || '',
                description : '',
              }}
              onSubmit={onHandleSave}
              innerRef={formRef}
            >
              <Form>
                  <Row>
                    <Col md="12">
                      <Label>Tên nhãn hiệu :</Label>
                      <Field name="name">
                      {
                        ({ field, form, meta })=> (
                          <div>
                            <Input {...field} type="text"  placeholder="Tên nhãn hiệu" />
                          </div>
                        )
                      }
                      </Field>
                    </Col>
                    <Col md="12">
                      <ErrorMessage name="name" component="div" className="error-message"/>
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <Label>Mô tả :</Label>
                      <Field name="description"> 
                        {
                          ({ field, form, meta })=> (
                            <div>
                              <TextArea {...field} placeholder="Mô tả" />
                            </div>
                          )
                        }
                      </Field>
                    </Col>
                  </Row>
                </Form>
            </Formik>
            </Modal>

            </Row>
          </div>
        </>
      );
}

export default ListBrand;