
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
    PageHeader 
} from 'antd'
import {useHistory} from 'react-router-dom'
import _ from 'lodash'

import SupplierSearch from '../Goods-Receipt/SupplierSearch'
import SupplierModal from '../Supplier/SupplierModal'
import ProductModal from '../Product/ProductModal'
import ProductSearch from "./ProductSearch";
 

function GoodsReceiptForm() {
  
   
    const history = useHistory();
 
    const [modalSupplier, setModalSupplier] = useState({
        visible: false,
        title: ''
    })
    const [modalProduct, setModalProduct] = useState({
        visible: false,
        title: ''
    })

    const formRef = useRef();
 
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
                                    <SupplierSearch setModalSupplier={setModalSupplier}/>
                                    <ProductSearch setModalProduct={setModalProduct}/>
                                </Card>
                            </CardBody>
                        </Card>
                    </Col>
                    <SupplierModal modal={modalSupplier} formRef={formRef} setModal={setModalSupplier}  />
                    <ProductModal modal={modalProduct} formRef={formRef} setModal={setModalProduct}/>
                </Row>
            </div>
        </>
    );
}

export default GoodsReceiptForm;
