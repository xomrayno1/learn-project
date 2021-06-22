import React, { useEffect, useRef, useState } from 'react';
import "../style/style.css"
import {
  DeleteOutlined,
  PlusOutlined,
  FormOutlined,
  SearchOutlined
 } from '@ant-design/icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  } from "reactstrap";
import {
  Table, 
  Space, 
  Button, 
  Divider, 
  Input, Spin, 
  Menu, 
  Dropdown, 
  Select
} from 'antd'
import {useDispatch, useSelector} from 'react-redux'

import ProductModal from '../Product/ProductModal'
import {confirm, warning} from '../../utils/AppUtils'
import {
  getListPSSFProduct,
  deleteProduct
} from '../../redux/action/productAction'

function ListProduct(props) {
  const dispatch = useDispatch();
  const {isLoading, products} = useSelector(state => state.product);
  const [filter, setFilter] = useState({
    "searchKey" : "",
    "sortCase" : 1,
    "ascSort": true,
    "pageNumber": 1,
    "pageSize": 5
  });

  useEffect(()=>{
    dispatch(getListPSSFProduct({...filter}));
  },[filter])

  const onHandlePagination = (page) => {
    setFilter({
      ...filter,
      pageNumber: page
    })
  }

  const formRef = useRef();
  const searchRef = useRef('');

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [modal, setModal] = useState({
    visible: false, 
    title: ''
  });
   
  const columns = [
    {
      title : 'Mã',
      dataIndex: 'id',
      responsive: ['sm'],
    },{
      title : 'Tên nhãn hiệu',
      dataIndex: 'name',
    },{
      title : 'Code',
      dataIndex: 'code',
    },{
      title : 'Cân nặng',
      dataIndex: 'weight',
    },{
      title : 'Thương hiệu',
      dataIndex: 'brand_name',
    },{
      title : 'Danh mục',
      dataIndex: 'category_name',
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
              icon={<FormOutlined />}
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


  const onCreate = () =>{
    setModal({
      ...modal,
      visible: true,                        
      title: 'Thêm sản phẩm'
    })
  }

  const onUpdate = (data) =>{
    setModal({
      ...modal,
      visible: true,
      title: 'Cập nhật sản phẩm',
    });
    setTimeout(() => {
      formRef.current.setValues({
        ...data,
      })
    }, 200);
  }

  const onHandleDelete = () => {
    console.log("delete", selectedRowKeys);
    dispatch(deleteProduct(selectedRowKeys));
    setSelectedRowKeys([]);
  }
  
  const onHandleSearch = () => {
    setFilter({
      ...filter,
      searchKey: searchRef.current.state.value,
      pageNumber: 1
    })
  }

  const onHandleChangeSortAsc = (value) => {
    setFilter({
      ...filter,
      ascSort: value === 'asc' ? true : false
    })
  }

  const onHandleChangeSortKey = (value) => {
    setFilter({
      ...filter,
      sortCase: Number(value)
    })
  }

    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Danh sách sản phẩm</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="2" sm="2">
                        <Space>
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={onCreate}
                            >Thêm</Button>
                          <Button 
                            type="danger"
                            icon={<DeleteOutlined/>}
                            onClick={() => selectedRowKeys.length == 0 
                              ? warning("Vui lòng chọn mục để xoá !")
                              : confirm("Bạn có chắc chắn muốn xoá không ?",onHandleDelete)}
                            >Xoá</Button>  
                        </Space>
                      </Col>
                    </Row>
                    <Divider/>
                    <Row>
                      <Col md="6" sm="6">
                          <Space>
                            <Select 
                                defaultValue='asc' 
                                onChange={onHandleChangeSortAsc}>
                              <Select.Option value="asc">Tăng dần</Select.Option>
                              <Select.Option value="desc">Giảm dần</Select.Option>
                            </Select>
                            <Select 
                                defaultValue='1'
                                onChange={onHandleChangeSortKey}>
                              <Select.Option value="1">Sắp xếp theo Id</Select.Option>
                              <Select.Option value="2">Sắp xếp theo Tên</Select.Option>
                            </Select>
                          </Space>
                      </Col>
                      <Col md="4" sm="4">
                        <Input 
                          ref={searchRef}
                          onPressEnter={onHandleSearch} 
                          placeholder="Nhập tên để tìm kiếm..." />
                      </Col>
                      <Col md="2" sm="2" style={{
                        padding: '0 0 0 0'
                      }}>
                        <Button
                          type="primary"
                          onClick={onHandleSearch}
                          icon={<SearchOutlined />}            
                          >Tìm kiếm</Button>
                      </Col>
                    </Row>
                    <Divider/>
                    
                    <Row>
                      <Col>
                        <Spin spinning={isLoading} tip="Đang tải">
                          <Table
                            columns={columns} 
                            dataSource={products.content || []}
                            rowSelection={rowSelection}
                            pagination= {{
                              pageSize: products.pageable && products.pageable.pageSize || 10,
                              current: products.pageable && products.pageable.pageNumber + 1,
                              total : products.totalElements,
                              onChange: onHandlePagination,
                            }}
                            rowKey={record => record.id}
                          />
                        </Spin>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

           {/*Modal form*/}
            <ProductModal 
              modal={modal} 
              formRef={formRef} 
              setModal={setModal}
            />

            </Row>
          </div>
        </>
      );
}

export default ListProduct;