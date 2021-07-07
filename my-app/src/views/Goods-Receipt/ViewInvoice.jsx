import React, { useEffect, useState } from 'react';
import {
    Modal,
    Typography,
    Descriptions,
    Table
} from 'antd'
import {
    Card,
    CardBody,
    Row,
    Col
} from 'reactstrap'

import { 
    renderVND
 } from '../../utils/AppUtils'

import supplierAPI from '../../api/supplierApi'
import goodReceiptAPI from '../../api/goodsReceiptApi'

function ViewInvoice({view, onHandleCancel}) {
    const { Text } = Typography;

    const {supplier_id, date_export, id, total_price, count, price, discount} = view.data;

    const [suplierInfo, setSuplierInfo] = useState('');

    const [item, setItem] = useState([]);

    const onCancel = () => {
        onHandleCancel();
    }

    const getSupplier = async () => {
        const {data} = await supplierAPI.getSupplier(supplier_id);
        setSuplierInfo(data);
    }

    const getInvoiceDetail = async () => {
        const {data} = await goodReceiptAPI.getInvoiceDetailByInvoiceId(id);
        setItem(data);
    }

    useEffect( async () => {
        //call api get supplier by supplier_id
        supplier_id && await getSupplier();
        //call api get list invoicedetail by invoiceId
        id && await getInvoiceDetail();
    }, [supplier_id, id])

    const columns = [
        {
            title: 'Mã SP',
            dataIndex: 'product_id',
            responsive: ['sm'],
        }, {
            title: 'Tên sản phẩm',
            dataIndex: 'product_name',
        }, {
            title: 'Cân nặng',
            dataIndex: 'weight',
            render: (text) => {
                return `${text} kg`
            },
        },{
            title: 'Giá nhập',
            dataIndex: 'price',
            render: (text) => {
                return renderVND(text)
            }
        },{
            title: 'Số lượng',
            dataIndex: 'count',
        },{
            title: 'Thành tiền',
            dataIndex: 'total_price',
            render: (text) => {
                return renderVND(text)
            }
        } 
    ]

    return (
        <>
            <Modal
                title="Chi tiết hoá đơn nhập"
                visible={view.visible}
                footer={null}
                onCancel={onCancel}
                width={1000}
            >
                <Card>
                    <CardBody>
                        <h4>Ngày hoá đơn xuất</h4>
                        <Row style={{
                            backgroundColor: 'white',
                            padding: '5px 0px 0px 15px',
                            margin: '0px',
                            border: '1px solid'
                        }}>
                            <Typography.Link
                                style={{
                                    fontWeight: 'bold',
                                    fontSize: '16px',
                                    color: '#423838'
                                }}
                            >{date_export}</Typography.Link>
                        </Row>
                    </CardBody>
                    <CardBody >
                        <h4>Thông tin nhà cung cấp</h4>
                        <Row style={{
                            backgroundColor: 'white',
                            padding: '5px 0px 0px 15px',
                            margin: '0px',
                            border: '1px solid'
                        }}>
                            <Row style={{
                                padding: '0px 0px 0px 15px'
                            }}>
                                <Descriptions title="Thông tin nhà cung cấp">
                                    <Descriptions.Item span="2" label="Tên">{suplierInfo.name}</Descriptions.Item>
                                    <Descriptions.Item span="2" label="Điện thoại">{suplierInfo.phone}</Descriptions.Item>
                                    <Descriptions.Item span="2" label="Email">{suplierInfo.email}</Descriptions.Item>
                                    <Descriptions.Item span="2" label="Địa chỉ">{suplierInfo.address}</Descriptions.Item>
                                </Descriptions>
                            </Row>
                        </Row>
                    </CardBody>
                    <CardBody >
                        <h4>Sản phẩm</h4>
                        <Row style={{
                            backgroundColor: 'white',
                            padding: '0px 0px 0px 0px',
                            margin: '0px',
                            border: '1px solid'
                        }}>
                            <Col md="12">
                                <Table 
                                    columns={columns}
                                    dataSource={item}
                                    pagination={{
                                        total: item.size,
                                        defaultPageSize: 5
                                    }}
                                    summary={
                                        () => {
                                           
                                            return (
                                                <>
                                                    <Table.Summary.Row>
                                                        <Table.Summary.Cell colSpan="4" />
                                                        <Table.Summary.Cell>Số lượng</Table.Summary.Cell>         
                                                        <Table.Summary.Cell>
                                                            <Text>{count}</Text>
                                                        </Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                    <Table.Summary.Row>
                                                        <Table.Summary.Cell colSpan="4" />
                                                        <Table.Summary.Cell>Tổng tiền</Table.Summary.Cell>                 
                                                        <Table.Summary.Cell>
                                                            <Text  >{renderVND(total_price)}</Text>
                                                        </Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                    <Table.Summary.Row >
                                                        <Table.Summary.Cell colSpan="4"/>
                                                        <Table.Summary.Cell >Giảm giá</Table.Summary.Cell>
                                                        <Table.Summary.Cell  >
                                                            <Text  >{discount} đ</Text>
                                                        </Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                    <Table.Summary.Row>
                                                        <Table.Summary.Cell colSpan="4"/>
                                                        <Table.Summary.Cell>
                                                            <Text style={{
                                                                fontWeight: 'bold'
                                                            }}>Tiền cần trả</Text>
                                                        </Table.Summary.Cell>
                                                        <Table.Summary.Cell  >
                                                            <Text type="danger" >{renderVND(price)}</Text>
                                                        </Table.Summary.Cell>
                                                    </Table.Summary.Row>
                                                </>
                                            );
                                        }}
                                />
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </Modal>
        </>
    );
}

export default ViewInvoice;