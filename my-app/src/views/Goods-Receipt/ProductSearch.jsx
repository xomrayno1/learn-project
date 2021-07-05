import React, { useEffect, useRef, useState } from 'react';
import {
    CardBody,
    Row,
    Col
} from 'reactstrap'
import {
    Input,
    AutoComplete,
    Space,
    Button,
    Table,
    Typography
} from 'antd'
import {
    SearchOutlined,
    CodeSandboxOutlined,
    PlusOutlined,
    CloseOutlined
} from '@ant-design/icons'
import { useHistory } from 'react-router-dom';
import { getListPSSFProduct } from 'redux/action/productAction';
import { useDispatch, useSelector } from 'react-redux';

import {
    EditableCell,
    EditableRow
} from './EditableCell'
import { renderVND } from '../../utils/AppUtils'


function ProductSearch({setModalProduct, invoice, onHandleSaveInvoice}) {
    const { Text } = Typography;
    const [data, setData] = useState([]);
    const dispatch = useDispatch();
 
    let {products} = useSelector(state => state.product);
    !products && (products = {content: []}) // first render products is null

    const history = useHistory();

    const [filterPro, setFilterPro] = useState({
        "searchKey" : "",
        "sortCase" : 1,
        "ascSort": true,
        "pageNumber": 1,
        "pageSize": 5
    })
    const searchRef = useRef('');

    useEffect(() => {
        dispatch(getListPSSFProduct({...filterPro}))
    }, [filterPro])

    const columns = [
        {
            title: 'Mã SP',
            dataIndex: 'product_id',
            responsive: ['sm'],
        }, {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
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
            editable: true
        },{
            title: 'Thành tiền',
            dataIndex: 'total_price',
            render: (text) => {
                return renderVND(text)
            }
        }, {
            render: (_, record) => {
                return <>
                    <Space>
                        <CloseOutlined onClick={()=> removeItem(record)} />
                    </Space>
                </>
            },
            responsive: ['sm', 'lg'],
        }
    ]

    const newColumn = columns.map( col => {
        if(!col.editable){
            return col
        }
        return {
            ...col,
            onCell: (record) => ({
                record,
                editable: col.editable,
                dataIndex: col.dataIndex,
                title: col.title,
                handleSave: updateItem,
            })
        }
    })

    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
    };
 
    const renderItemProduct = (item) => ({
        value: `${item.name}`,
        key: item.id,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <span><CodeSandboxOutlined /></span>
                {item.name}
                <span>{renderVND(item.price)}</span>
            </div>
        ),
    })

    const optionsProduct = [
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
                            {'Thêm mới sản phẩm'}
                            <span></span>
                        </div>
                    ),
                },
                ...products.content.map(item => renderItemProduct(item))
            ],
        }
    ];

    const handleOnSelectSearchProduct = (value, {key}) => {
        console.log('select', key);
        if (key) {
            const item = createItem(key);
            // setSearchKeyProduct('')
            addItem(item);
        } else {
            setModalProduct({
                visible: true,
                title: 'Thêm sản phẩm'
            })
        }
    }

    const handleOnChangeSearchProduct = (value) => { //?
        //setSearchKeyProduct(value)
        setFilterPro({...filterPro,searchKey: value});
    }

    const createItem = (id) => {
        const pro = products.content.find(element => element.id === Number(id));
        let item = {
            id: 0,
            name: pro.name,
            weight: pro.weight,
            price: pro.price,
            count: 1,
            total_price: pro.price,
            product_id: pro.id
        }
        return item;
    }

    const addItem = (item) => {
        console.log('add item', item);
        if(data.length <= 0){
            setData([item])
        }else{
            const idx = data.findIndex(element => element.product_id == item.product_id);
            let newData = [];
            newData  = idx == -1 ?  [...data, item] : [...data.slice(0)]
            setData(newData);
        }
    }

    const removeItem = (item) => {
        console.log('remove item', item);
        const idx = data.findIndex(element => element.product_id == item.product_id);
        let newData = [];
        newData  = idx == -1 ? [...data.slice(0)] : [...data.slice(0, idx), ...data.slice(idx + 1)];
        setData(newData);
    }

    const updateItem = (item) => {
        console.log('update item', item);
        const idx = data.findIndex(element => element.product_id == item.product_id);
        let newData = [];
        newData  = idx == -1 ? [...data.slice(0)]
                             : [...data.slice(0, idx),{...item, count: item.count, total_price: item.price * item.count}, ...data.slice(idx + 1)];
        setData(newData);
    }

    const onHandleSave = () => {
        let price = data.map(item => item.total_price).reduce((total, element) => total + element );
        let weight = data.map(item => item.weight * item.count).reduce((total, element) => total + element );
        let count = data.map(item => Number(item.count)).reduce((total, element) => total + element );
        let discount = 0;
        const newInvoice = {
            ...invoice,
            count,
            price,
            weight,
            discount, /// discount ?
            total_price: price - discount, // subtract discount
            invoice_details: [...data],
        }
        onHandleSaveInvoice(newInvoice)
    }

    const onBack = () => {
        history.push("/admin/goods-receipt")
    }

    return (
        <>
            <CardBody>
                <h4>Thông tin sản phẩm</h4>
                <AutoComplete
                    dropdownClassName="certain-category-search-dropdown"
                    dropdownMatchSelectWidth={500}
                    style={{ width: '100%' }}
                    options={optionsProduct}
                    onSelect={handleOnSelectSearchProduct}
                    onChange={handleOnChangeSearchProduct}
                    backfill={true}
                    allowClear={true}
                   // value={searchKeyProduct}
                    notFoundContent="Không có sản phẩm nào được tìm thấy"
                >
                    <Input
                        ref={searchRef}
                        prefix={<SearchOutlined />}
                        placeholder="Tìm kiếm sản phẩm theo tên, code ..." />
                </AutoComplete>
            </CardBody>
            <CardBody>
                <Row>
                    <Col md="12" sm="12">
                        <Table
                            components={components}
                            key={row => row.id}
                            dataSource={data}
                            columns={newColumn}
                            summary={
                                pageData => {
                                    let total = 0;
                                    let totalCount = 0;

                                    pageData.forEach(({ total_price, count, weight}) => {
                                        total += total_price;
                                        totalCount += Number(count);
                                    });
                                
                                    return (
                                        <>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan="4" />
                                                <Table.Summary.Cell>Số lượng</Table.Summary.Cell>         
                                                <Table.Summary.Cell>
                                                    <Text>{totalCount}</Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan="4" />
                                                <Table.Summary.Cell>Tổng tiền</Table.Summary.Cell>                 
                                                <Table.Summary.Cell>
                                                    <Text  >{renderVND(total)}</Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            <Table.Summary.Row >
                                                <Table.Summary.Cell colSpan="4"/>
                                                <Table.Summary.Cell >Giảm giá</Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    <Text  >0 đ</Text>
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
                                                    <Text type="danger" >{renderVND(total)}</Text>
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
                    <Col md="6" sm="6"></Col>
                    <Col md="6" sm="6">
                        <Space>
                            <Button key="save" type="primary" onClick={onHandleSave}>Lưu</Button>
                            <Button key="back" onClick={onBack}>Quay lại</Button>
                        </Space>
                    </Col>
                </Row>
            </CardBody>
        </>
    );
}

export default ProductSearch;