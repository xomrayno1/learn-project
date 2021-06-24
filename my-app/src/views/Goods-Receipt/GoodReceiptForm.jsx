/*!

=========================================================
* Black Dashboard React v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/black-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/black-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// reactstrap components
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
    SearchOutlined
} from '@ant-design/icons';

import { Input, Button, Space, Table, Typography, Checkbox,InputNumber   } from 'antd'

function GoodsReceiptForm() {
    const { Text } = Typography;
    const onChangeHandlePaySupplier = (e) => {
        console.log(`checked : ${e.target.checked}`);
    }
    const columns = [
        {
            title: 'Mã SP',
            dataIndex: 'id',
            responsive: ['sm'],
        }, {
            title: 'Tên sản phẩm',
            dataIndex: 'weight',
        }, {
            title: 'Cân nặng',
            dataIndex: 'weight',
        },{
            title: 'Giá nhập',
            dataIndex: 'price',
        },{
            title: 'Số lượng',
            dataIndex: 'count',
        },{
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
        }, {
            render: (_, record) => {
                return <>
                    <Space>
                        <Button>Xoá</Button>
                    </Space>
                </>
            },
            responsive: ['sm', 'lg'],
        }
    ]
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Tạo đơn nhập hàng</CardTitle>
                            </CardHeader>
                            <CardBody>
                                <Card>
                                    <CardBody>
                                        <h4>Thông tin nhà cung cấp</h4>
                                        <Input
                                            prefix={<SearchOutlined />}
                                            placeholder="Tìm nhà cung cấp theo sdt, tên ..." />
                                    </CardBody>
                                    <CardBody>
                                        <h4>Thông tin sản phẩm</h4>
                                        <Input
                                            prefix={<SearchOutlined />}
                                            placeholder="Tìm kiếm sản phẩm theo tên, code ..." />
                                    </CardBody>
                                    <CardBody>
                                        <Row>
                                            <Col md="12" sm="12">
                                                <Table 
                                                    columns={columns} 
                                                    summary={
                                                        pageData => {
                                                            let totalBorrow = 0;
                                                            let totalRepayment = 0;
                                                    
                                                            pageData.forEach(({ borrow, repayment }) => {
                                                            totalBorrow += borrow;
                                                            totalRepayment += repayment;
                                                            });
                                                            return (
                                                                <>
                                                                <Table.Summary.Row>
                                                                    <Table.Summary.Cell colSpan={3}/>
                                                                    <Table.Summary.Cell >Số lượng</Table.Summary.Cell>
                                                                    <Table.Summary.Cell>
                                                                    {/* <Text type="danger">{totalBorrow}</Text> */}
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell>
                                                                    <Text>{totalRepayment}</Text>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                                <Table.Summary.Row>
                                                                <Table.Summary.Cell colSpan={3}/>
                                                                    <Table.Summary.Cell colSpan>Tổng tiền</Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    <Text  >{totalBorrow - totalRepayment}</Text>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                                <Table.Summary.Row>
                                                                <Table.Summary.Cell colSpan={3}/>
                                                                    <Table.Summary.Cell colSpan>Giảm giá</Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    <Text  >0</Text>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                                <Table.Summary.Row>
                                                                <Table.Summary.Cell colSpan={3}/>
                                                                    <Table.Summary.Cell colSpan>
                                                                        <Text   style={{
                                                                            fontWeight: 'bold'
                                                                        }}>Tiền cần trả</Text>
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                        <Text type="danger" >0</Text>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                                </>
                                                            );
                                                            }}
                                                />
                                            </Col>
                                        </Row>   
                                    </CardBody>
                                    <CardBody>
                                        <Row>
                                            <Col md="6" sm="6"><h4>Thanh toán</h4></Col>
                                            <Col md="6" sm="6">
                                                <Checkbox value='true' onChange={onChangeHandlePaySupplier}>Thanh toán với nhà cung cấp</Checkbox> 
                                            </Col>
                                        </Row>

                                        <Row>
                                            <Col md="6" sm="6">
                                                <Label>Hình thức thanh toán</Label>
                                                <Input />
                                            </Col>
                                            <Col md="6" sm="6">
                                                <Label>Số tiền thanh toán</Label>
                                                <Input prefix="đ" />
                                            </Col>
                                        </Row>
                                    </CardBody>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>

                </Row>
            </div>
        </>
    );
}

export default GoodsReceiptForm;
