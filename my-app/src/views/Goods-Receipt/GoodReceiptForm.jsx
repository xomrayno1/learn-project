
import React, {useRef, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import {
    ArrowLeftOutlined
} from '@ant-design/icons';
import "../style/style.css"
import { 
    PageHeader,
    DatePicker
} from 'antd'
import {useHistory} from 'react-router-dom'
import _ from 'lodash'

import SupplierSearch from '../Goods-Receipt/SupplierSearch'
import SupplierModal from '../Supplier/SupplierModal'
import ProductModal from '../Product/ProductModal'
import ProductSearch from "./ProductSearch";

function GoodsReceiptForm() {
    const history = useHistory();
 
    const formRef = useRef();

    const [modalSupplier, setModalSupplier] = useState({
        visible: false,
        title: ''
    })
    const [modalProduct, setModalProduct] = useState({
        visible: false,
        title: ''
    })

    const [invoice, setInvoice] = useState({
        price: 0,
        discount: 0,
        count: 0,
        weight: 0,
        total_price: 0,
        date_export: '',
        supplier_id: 0,
        invoice_details: []
    })

    const onSetInvoice = (item) => {
        setInvoice({
            ...invoice,
            ...item
        })
    }

    const onHandleSaveInvoice = async (item) => {
        const newInvoice = {
            ...invoice,
            ...item
        }
        setInvoice({
            ...newInvoice
        })
        //save invoice
        console.log(newInvoice);
    }
 
    const onHandleChangeDateExport = (date, dateString) =>{
        onSetInvoice({date_export: dateString});
    }

    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader >
                                <PageHeader className="site-page-header "
                                    backIcon={<ArrowLeftOutlined  style={{color: '#fff', width: '25px', }}/>}
                                    onBack={() => history.push('/admin/goods-receipt')}
                                    title={<CardTitle tag="h4">Tạo đơn nhập hàng</CardTitle>}
                                    style={{
                                        color: '#fff',
                                        margin: '15px 0px 0px 0px',
                                        padding: '10px',
                                    }}/>
                            </CardHeader>
                            <CardBody>
                                <Card>
                                    <CardHeader>
                                        <CardTitle tag="h4">Ngày hoá đơn xuất</CardTitle>
                                        <CardBody>
                                            <Row>
                                                <DatePicker
                                                    onChange={onHandleChangeDateExport}
                                                    placeholder="Chọn ngày hoá đơn xuất"  
                                                    format='DD-MM-YYYY'
                                                    style={{
                                                        width: '500px'
                                                    }}
                                                />
                                            </Row>
                                        </CardBody>
                                    </CardHeader>
                                    <SupplierSearch onSetInvoice={onSetInvoice} setModalSupplier={setModalSupplier}/>
                                    <ProductSearch invoice={invoice} onHandleSaveInvoice={onHandleSaveInvoice} setModalProduct={setModalProduct}/>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <SupplierModal modal={modalSupplier} formRef={formRef} setModal={setModalSupplier}/>
                    <ProductModal modal={modalProduct} formRef={formRef} setModal={setModalProduct}/>
                </Row>
            </div>
        </>
    );
}

export default GoodsReceiptForm;
