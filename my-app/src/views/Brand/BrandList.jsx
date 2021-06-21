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

import BrandModal from '../../views/Brand/BrandModal'
import {confirm, warning} from '../../utils/AppUtils'
import {
  getListPSSFBrand,
  deleteBrand
} from '../../redux/action/brandAction'

function ListBrand(props) {
  const dispatch = useDispatch();
  const {isLoading, brands} = useSelector(state => state.brand);
  const [filter, setFilter] = useState({
    "searchKey" : "",
    "sortCase" : 1,
    "ascSort": true,
    "pageNumber": 1,
    "pageSize": 5
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

  const onUpdate = (data) =>{
    setModal({
      ...modal,
      visible: true,
      title: 'Cập nhật nhãn hiệu',
    });
    setTimeout(() => {
      formRef.current.setValues({
        ...data,
      })
    }, 200);
  }

  const onHandleDelete = () => {
    console.log("delete", selectedRowKeys);
    dispatch(deleteBrand(selectedRowKeys));
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
                    <CardTitle tag="h4">Danh sách nhãn hiệu</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Row>
                      <Col md="2" sm="2">
                        <Space>
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={() => setModal({
                              ...modal,
                              visible: true,                        
                              title: 'Thêm nhãn hiệu'})}
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
                    {/* rowKey={record => record.id} */}
                    <Row>
                      <Col>
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
                            rowKey={record => record.id}
                          />
                        </Spin>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

           {/*Modal form*/}
            <BrandModal 
              modal={modal} 
              formRef={formRef} 
              setModal={setModal}
            />

            </Row>
          </div>
        </>
      );
}

export default ListBrand;