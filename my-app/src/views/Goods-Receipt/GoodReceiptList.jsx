import React, { useEffect, useState } from 'react';
import "../style/style.css"
import {
  DeleteOutlined,
  PlusOutlined,
  EyeOutlined,
  SearchOutlined
 } from '@ant-design/icons';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Row,
  Col,
  Label
  } from "reactstrap";
import {
  Table, 
  Space, 
  Button, 
  Divider, 
  Spin, 
  DatePicker
} from 'antd'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

import {confirm, warning} from '../../utils/AppUtils'
import {
  getListPSSFGoodsReceipt,
  deleteGoodsReceipt
} from '../../redux/action/goodsReceiptAction'
import {
  renderVND
} from '../../utils/AppUtils'
import ViewInvoice from '../Goods-Receipt/ViewInvoice'




function GoodReceiptList(props) {
  const dispatch = useDispatch();
  const {isLoading, goodsReceipts} = useSelector(state => state.goodsReceipt);
  let history = useHistory();
   
  const [filter, setFilter] = useState({
    "sortCase" : 1,
    "ascSort": true,
    "pageNumber": 1,
    "pageSize": 5,
    "fromDate": "",
    "toDate": "",
    "dateExport": ""
  });

  const [search, setSearch] = useState({
    "fromDate": "",
    "toDate": "",
    "dateExport": ""
  })

  useEffect(()=>{
    dispatch(getListPSSFGoodsReceipt({...filter}));
  },[filter])
 
  const onHandlePagination = (page) => {
    setFilter({
      ...filter,
      pageNumber: page
    })
  }
 
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);


  const [viewInvoice, setViewInvoice] = useState({
    visible: false, 
    data: ''
  })
 
  const columns = [
    {
      title : 'Mã',
      dataIndex: 'id',
      responsive: ['sm'],
    },{
      title : 'Cân nặng',
      dataIndex: 'weight',
      render: (text) => {
        return `${text} kg`
      }
    },{
      title : 'Số lượng',
      dataIndex: 'count',
    },{
      title : 'Giá tiền',
      dataIndex: 'price',
      render: (text) => {
        return renderVND(text)
      }
    },{
      title : 'Giảm giá',
      dataIndex: 'discount',
    },{
      title : 'Tổng tiền',
      dataIndex: 'total_price',
      render: (text) => {
        return renderVND(text)
      }
    },{
      title : 'Nhà cung cấp',
      dataIndex: 'supplier_name',
    },{
      title : 'Ngày xuất hoá đơn',
      dataIndex: 'date_export',
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
              onClick={() => onHandleViewInvoice(record)}
              icon={<EyeOutlined />}
              >Chi tiết</Button>
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
    history.push("/admin/goods-receipt/invoice");
  }

  const onHandleViewInvoice = (record) =>{
    setViewInvoice({
      ...viewInvoice,
      data: record,
      visible: true
    })
  }

  const onHandleCancelViewInvoice = () => {
    setViewInvoice({
      ...viewInvoice,
      data: '',
      visible: false
    })
  }

  const onHandleDelete = () => {
    console.log("delete", selectedRowKeys);
    dispatch(deleteGoodsReceipt(selectedRowKeys));
    setSelectedRowKeys([]);
  }
  
  const onHandleSearch = () => {
    setFilter({
      ...filter,
      ...search,
      pageNumber: 1,
    })
  }

  // const onHandleChangeSortAsc = (value) => {
  //   setFilter({
  //     ...filter,
  //     ascSort: value === 'asc' ? true : false
  //   })
  // }

  // const onHandleChangeSortKey = (value) => {
  //   setFilter({
  //     ...filter,
  //     sortCase: Number(value)
  //   })
  // }
  
  const handleChangeDateFrom = (value, dateString) => {
    setSearch({
      ...search,
      fromDate: dateString
    })
  }

  const handleChangeDateTo = (value, dateString) => {
    setSearch({
      ...search,
      toDate: dateString
    })
  }

  const handleChangeDateExport = (value, dateString) =>{
    setSearch({
      ...search,
      dateExport: dateString
    })
  }

  return (
        <>
          <div className="content">
            <Row>
              <Col md="12">
                <Card>
                  <CardHeader>
                    <Row>
                      <Col md="6"><CardTitle tag="h4">Đơn nhập hàng</CardTitle></Col>
                      <Col md="6">
                        <Space>
                          <Button
                            type="primary"
                            icon={<PlusOutlined />}
                            onClick={onCreate}
                            >Tạo đơn nhập hàng</Button>
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
                  </CardHeader>
                  <CardBody>
                    {/* <Row>
                      <Col md="12" sm="12">                         
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
                                <Select.Option value="2">Sắp xếp theo giá</Select.Option>
                                <Select.Option value="3">Sắp xếp theo ngày xuất</Select.Option>
                              </Select>
                            </Space>
                      </Col>
                    </Row> */}
                    <Divider/>
                    <Row>
                      <Col md="6" sm="6">
                        <Space>
                              <Label>Từ ngày: </Label>
                              <DatePicker placeholder="Từ ngày" format="DD-MM-YYYY"  onChange={handleChangeDateFrom}/>
                              <Label>Đến ngày: </Label>
                              <DatePicker placeholder="đến ngày" format="DD-MM-YYYY"  onChange={handleChangeDateTo}/>                                          
                        </Space>
                      </Col>
                      <Col md="6" sm="6">
                        <Space>                                          
                        <Label>Ngày xuất hoá đơn: </Label>
                              <DatePicker placeholder="Ngày xuất hoá đơn" 
                                format="DD-MM-YYYY"  
                                onChange={handleChangeDateExport}/>
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
                             dataSource={goodsReceipts.content || []}
                            pagination= {{
                              pageSize: goodsReceipts.pageable && goodsReceipts.pageable.pageSize || 10,
                              current: goodsReceipts.pageable && goodsReceipts.pageable.pageNumber + 1,
                              total : goodsReceipts.totalElements,
                              onChange: onHandlePagination,
                            }}
                            rowKey={record => record.id}
                          />
                        </Spin>
                      </Col>
                      <ViewInvoice view={viewInvoice}  onHandleCancel={onHandleCancelViewInvoice}/>
                    </Row>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      );
}

export default GoodReceiptList;