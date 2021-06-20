import React, { useEffect, useRef, useState } from 'react';
import "../style/style.css"
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";
import {Table, Space, Button, Divider, Input, Spin} from 'antd'
import {useDispatch, useSelector} from 'react-redux'

import BrandModal from '../../views/Brand/BrandModal'
import {confirm, warning} from '../../utils/AppUtils'
import {getListPSSFBrand} from '../../redux/action/brandAction'

function ListBrand(props) {
  //get api
  const dispatch = useDispatch();
  const {isLoading, brands} = useSelector(state => state.brand);
  const [filter, setFilter] = useState({
    "searchKey" : "",
    "sortCase" : 1,
    "ascSort": true,
    "pageNumber":1,
    "pageSize": 2
  });

  useEffect(()=>{
    dispatch(getListPSSFBrand({...filter}));
  },[filter])

  const onHandlePagination = (page) => {
    setFilter({
      ...filter,
      pageNumber: page
    })
  }


  const formRef = useRef();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, setModal] = useState({
    visible: false, 
    title: ''
  });
   
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
      title: 'Cập nhật nhãn hiệu',
    });
    setTimeout(() => {
      formRef.current.setValues({
        name: data.name,
        description: data.description
      })
    }, 200);
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
                        <Input placeholder="Nhập tên để tìm kiếm ...."/>
                      </Col>
                      <Col md="2" sm="2">
                        <Button type="primary">Tìm kiếm</Button>
                      </Col>
                    </Row>
                    <Divider/>
                    {/* rowKey={record => record.id} */}
                    <Spin spinning={isLoading} tip="Đang tải">
                      <Table
                        columns={columns} 
                        dataSource={brands.content || []}
                        rowSelection={rowSelection}
                        pagination= {{
                          pageSize: brands.pageable && brands.pageable.pageSize || 10,
                          current: brands.pageable && brands.pageable.pageNumber + 1,
                          total : brands.totalElements,
                          onChange: onHandlePagination,
                        }}
                      />
                    </Spin>
                  </CardBody>
                </Card>
              </Col>

           {/*Modal form*/}
            <BrandModal modal={modal} formRef={formRef} setModal={setModal}/>

            </Row>
          </div>
        </>
      );
}

export default ListBrand;