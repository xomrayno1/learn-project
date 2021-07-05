import React, {useEffect, useState} from 'react';
import {
    CardBody,
    Row,
    Col
} from 'reactstrap'
import {
    Input,
    AutoComplete,
    Descriptions,
    Divider,
    Space,
    Typography
} from 'antd'
import {
    SearchOutlined,
    IdcardOutlined,
    PlusOutlined,
    UserOutlined,
    CloseOutlined,
} from '@ant-design/icons'
import { useDispatch, useSelector } from 'react-redux';
import {useParams} from 'react-router-dom'

import {
    GOODS_RECEIPT_API_GET_DETAIL
} from '../../utils/Constant'
import {
    getListPSSFSupplier
} from '../../redux/action/supplierAction'

function SupplierSearch({ setModalSupplier, onSetInvoice}) {
    const {id} = useParams(); // get params

    const [isEnableSupplier, setEnableSupplier] = useState(id ? true : false);

    const dispatch = useDispatch();

    let {suppliers} = useSelector(state => state.supplier)
    !suppliers && (suppliers = {content : []})

    const [suplierInfo, setSuplierInfo] = useState('');

    const [filterSupp, setFilterSupp] = useState({
        "searchKey" : "",
        "sortCase" : 1,
        "ascSort": true,
        "pageNumber": 1,
        "pageSize": 5
    })

    useEffect(() => {
        dispatch(getListPSSFSupplier({...filterSupp}))
    }, [filterSupp])

    const handleOnSelectSearchSupplier = (value, {key}) => {
        console.log(` key : `, key);
        if(key){
           const object = suppliers.content.find(item => item.id === Number(key));
           onSetInvoice({supplier_id: key});
           setSuplierInfo(object);
           setEnableSupplier(true);
        }else {
            setModalSupplier({
                visible: true,
                title: 'Thêm nhà cung cấp'
            })
        }
    }

    const handleOnChangeSearchSupplier = (value) => {
        console.log(value);
        setFilterSupp({
            ...filterSupp,
            searchKey : `${value}`
        })
    }

    const onCloseSupplier = () => {
        setEnableSupplier(false);
        setFilterSupp({
            ...filterSupp,
            searchKey: '',
        })
        onSetInvoice({supplier_id: ''})
    }
    
    const renderItemSupplier = (item) => ({
        value: `${item.name}`,
        key: `${item.id}`,
        label: (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            <span><IdcardOutlined /></span>
            {item.name}
            <span> </span>
          </div>
        ),
    });
      
    const optionsSupplier = [
        {
        label: 'Kết quả tìm kiếm',
        options: [
                {
                    value: '',
                    label: (
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                          }}
                        >
                          <span>
                              <PlusOutlined />
                          </span>
                            {'Thêm mới nhà cung cấp'}
                          <span></span>
                        </div>
                      )
                },
                ...suppliers.content.map(item => renderItemSupplier(item))
            ],
        },
    ];
  
    return (
        !isEnableSupplier && 
        (<CardBody>
            <h4>Thông tin nhà cung cấp</h4>
                <Row tyle={{
                        padding: '15px',
                        margin: '0px'
                    }}>
                    <Col md="12" sm="12">
                        <AutoComplete
                            dropdownClassName="certain-category-search-dropdown"
                            dropdownMatchSelectWidth={500}
                            style={{ width: '100%' }}
                            options={optionsSupplier}
                            onSelect={handleOnSelectSearchSupplier}
                            onChange={handleOnChangeSearchSupplier} 
                            backfill={true}
                            allowClear={true}>
                            <Input 
                                prefix={<SearchOutlined />}
                                placeholder="Tìm nhà cung cấp theo sdt, tên ..." />
                        </AutoComplete>
                    </Col>
                </Row>
        </CardBody>) || 
        (<CardBody >
            <h4>Thông tin nhà cung cấp</h4>
            <Row style={{
                backgroundColor: 'white',
                padding: '15px',
                margin: '0px',
                border: '1px solid'
            }}>
                <Row style={{
                    padding: '10px 0px 0px 15px'
                }}>
                    <Space>
                        <UserOutlined />
                        <Typography.Link style={{
                            fontWeight: 'bold'
                        }} >{suplierInfo.name}</Typography.Link>
                        <a onClick={onCloseSupplier}><CloseOutlined /></a>
                    </Space>
                </Row>              
                <Divider/>
                <Row style={{
                    padding: '10px 0px 0px 15px'
                }}>
                    <Descriptions title="Thông tin nhà cung cấp">
                        <Descriptions.Item span="2" label="Tên">{suplierInfo.name}</Descriptions.Item>
                        <Descriptions.Item span="2" label="Điện thoại">{suplierInfo.phone}</Descriptions.Item>
                        <Descriptions.Item span="2" label="Email">{suplierInfo.email}</Descriptions.Item>
                        <Descriptions.Item span="2" label="Địa chỉ">{suplierInfo.address}</Descriptions.Item>
                    </Descriptions>
                </Row>
            </Row>
 
        </CardBody>)
    );
}

export default SupplierSearch; 