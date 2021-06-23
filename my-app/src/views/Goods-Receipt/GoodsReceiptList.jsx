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

import brandAPI from '../../api/brandApi'
import categoryAPI from '../../api/categoryApi'
import GoodsReceiptModal from '../Goods-Receipt/GoodsReceiptModal'
import {confirm, warning} from '../../utils/AppUtils'
import {
  getListPSSFProduct,
  deleteProduct
} from '../../redux/action/productAction'

function GoodsReceiptList(props) {
  const dispatch = useDispatch();
  const {isLoading, products} = useSelector(state => state.product);
  const [filter, setFilter] = useState({
    "searchKey" : "",
    "sortCase" : 1,
    "ascSort": true,
    "pageNumber": 1,
    "pageSize": 5,
    "categoryId": "",
    "brandId": ""
  });

  const [search, setSearch] = useState({
    "categoryId": "",
    "brandId": "",
    "searchKey": ""
  })

  const [categories, setCategory] = useState('');
  const [brands, setBrands] = useState('');

  useEffect(()=>{
    dispatch(getListPSSFProduct({...filter}));
  },[filter])

  const getBrand = async () => {
    const {data} = await brandAPI.getListActive();
    setBrands(data);
  }
  const getCategory = async () => {
      const {data} = await categoryAPI.getListActive();
      setCategory(data);
  }
  useEffect(async ()=>{
      await getBrand();
      await getCategory();
  },[])

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
      title : 'Cân nặng',
      dataIndex: 'weight',
    },{
      title : 'Số lượng',
      dataIndex: 'count',
    },{
      title : 'Giá tiền',
      dataIndex: 'price',
    },{
      title : 'Giảm giá',
      dataIndex: 'discount',
    },{
      title : 'Tổng tiền',
      dataIndex: 'totalPrice',
    },{
      title : 'Nhà cung cấp',
      dataIndex: 'supplier_name',
    },{
      title : 'Ngày xuất hoá đơn',
      dataIndex: 'dateExport',
    },{
      title : 'Ngày tạo',
      dataIndex: 'create_date',
      responsive: ['sm','md'],
    },{
      title : 'Ngày cập nhật',
      dataIndex: 'update_date',
      responsive: ['sm','md'],
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
      },
      responsive: ['sm','lg'],
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
      ...search,
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
  
  const onHandleChangeCategory = (value) => {
    setSearch({
      ...search,
      "categoryId": value
    })
  }

  const onHandleChangeBrand = (value) => {
    setSearch({
      ...search,
      "brandId": value
    })
  }
    return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Đơn nhập hàng</CardTitle>
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
                      <Col md="4" sm="4">
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
                              <Select.Option value="1">Sắp xếp theo id</Select.Option>
                              <Select.Option value="2">Sắp xếp theo tên</Select.Option>
                              <Select.Option value="3">Sắp xếp theo code</Select.Option>
                              <Select.Option value="4">Sắp xếp theo nhãn hiệu</Select.Option>
                              <Select.Option value="5">Sắp xếp theo danh mục</Select.Option>
                              <Select.Option value="6">Sắp xếp theo giá</Select.Option>
                            </Select>
                          </Space>
                      </Col>
                      <Col md="8" sm="8">
                        <Space>
                             
                              <Select defaultValue='' onChange={onHandleChangeCategory}>
                                <Select.Option  value=''>Chọn danh mục</Select.Option>
                                {
                                  categories && categories.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)
                                }                           
                              </Select>                                                     
                              <Select defaultValue='' onChange={onHandleChangeBrand}   >
                                <Select.Option  value=''>Chọn nhãn hiệu</Select.Option>
                                {
                                  brands && brands.map(item => <Select.Option value={item.id}>{item.name}</Select.Option>)
                                }                           
                              </Select>
                              <Input                             
                                ref={searchRef}
                                onPressEnter={onHandleSearch} 
                                placeholder="Nhập tên hoặc code để tìm kiếm..."
                                className="max-width"
                              />
                              <Button
                                type="primary"
                                onClick={onHandleSearch}
                                icon={<SearchOutlined />}            
                              >Tìm kiếm</Button>
                        </Space>
                      </Col>
                    
                    </Row>
                    <Divider/>
                    
                    <Row>
                      <Col>
                        <Spin spinning={isLoading} tip="Đang tải">
                          <Table
                            columns={columns} 
                            rowSelection={rowSelection}
                            // dataSource={products.content || []}
                            // pagination= {{
                            //   pageSize: products.pageable && products.pageable.pageSize || 10,
                            //   current: products.pageable && products.pageable.pageNumber + 1,
                            //   total : products.totalElements,
                            //   onChange: onHandlePagination,
                            // }}
                            rowKey={record => record.id}
                          />
                        </Spin>
                      </Col>
                    </Row>
                  </CardBody>
                </Card>
              </Col>

           {/*Modal form*/}
            <GoodsReceiptModal 
              modal={modal} 
              formRef={formRef} 
              setModal={setModal}
              categories={categories}
              brands={brands}
            />

            </Row>
          </div>
        </>
      );
}

export default GoodsReceiptList;