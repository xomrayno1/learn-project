import React, { useEffect, useState } from 'react';
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

import {
    EditableCell,
    EditableRow
} from './EditableCell'

function ProductSearch({setModalProduct}) {
    const { Text } = Typography;
    const [data, setData] = useState([]);
    const history = useHistory();
 
    const [searchKeyProduct, setSearchKeyProduct] = useState('');

    const columns = [
        {
            title: 'Mã SP',
            dataIndex: 'id',
            responsive: ['sm'],
        }, {
            title: 'Tên sản phẩm',
            dataIndex: 'name',
        }, {
            title: 'Cân nặng',
            dataIndex: 'weight',
        },{
            title: 'Giá nhập',
            dataIndex: 'price',
        },{
            title: 'Số lượng',
            dataIndex: 'count',
            editable: true
        },{
            title: 'Thành tiền',
            dataIndex: 'totalPrice',
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
 
    const renderItemProduct = (item) => ({
        value: `${item.name}`,
        label: (
            <div
                style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                }}
            >
                <span><CodeSandboxOutlined /></span>
                {item.name}
                <span>{item.price}</span>
            </div>
        ),
    });

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
                renderItemProduct({
                    name: 'Product 1',
                    price: 150
                }),
                renderItemProduct({
                    name: 'Product 2',
                    price: 250
                }),
            ],
        }
    ];

    const handleOnSelectSearchProduct = (value) => {
        console.log(` value : `, value);
        if (value) {
            setSearchKeyProduct('')
            addItem({
                id: Math.floor(Math.random() * 5),
                weight: 10,
                price: 100,
                name: `${value}`,
                count: 1,
                totalPrice: 1000
            })
        } else {
            setModalProduct({
                visible: true,
                title: 'Thêm sản phẩm'
            })
        }
    }

    const addItem = (item) => {
        if(data.length <= 0){
            setData([item])
        }else{
            const idx = data.findIndex(element => element.id == item.id);
            let newData = [];
            newData  = idx == -1 ?  [...data, item] : [...data.slice(0)]
            setData(newData);
        }
    }

    const removeItem = (item) => {
        const idx = data.findIndex(element => element.id == item.id);
        let newData = [];
        newData  = idx == -1 ? [...data.slice(0)] : [...data.slice(0, idx), ...data.slice(idx + 1)];
        setData(newData);
    }

    const updateItem = (item) => {
        const idx = data.findIndex(element => element.id == item.id);
        let newData = [];
        newData  = idx == -1 ? [...data.slice(0)]
                             : [...data.slice(0, idx),{...item, count: item.count, totalPrice: item.price * item.count}, ...data.slice(idx + 1)];
        setData(newData);
    }


    const handleOnChangeSearchProduct = (value) => {
        console.log(` value : `, value);
        setSearchKeyProduct(value)
    }

    const components = {
        body: {
          row: EditableRow,
          cell: EditableCell,
        },
    };

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
                    value={searchKeyProduct}
                >
                    <Input
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

                                    pageData.forEach(({ totalPrice, count }) => {
                                        total += totalPrice;
                                        totalCount += Number(count);
                                    });
                                    return (
                                        <>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan={3} />
                                                <Table.Summary.Cell >Số lượng</Table.Summary.Cell>
                                                <Table.Summary.Cell>
                                                    {/* <Text type="danger">{totalBorrow}</Text> */}
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell>
                                                    <Text>{totalCount}</Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan={3} />
                                                <Table.Summary.Cell colSpan>Tổng tiền</Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    <Text  >{total}</Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan={3} />
                                                <Table.Summary.Cell colSpan>Giảm giá</Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    <Text  >0</Text>
                                                </Table.Summary.Cell>
                                            </Table.Summary.Row>
                                            <Table.Summary.Row>
                                                <Table.Summary.Cell colSpan={3} />
                                                <Table.Summary.Cell colSpan>
                                                    <Text style={{
                                                        fontWeight: 'bold'
                                                    }}>Tiền cần trả</Text>
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                </Table.Summary.Cell>
                                                <Table.Summary.Cell  >
                                                    <Text type="danger" >{total}</Text>
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
                            <Button key="save" type="primary">Lưu</Button>
                            <Button key="back">Quay lại</Button>
                        </Space>
                    </Col>
                </Row>
            </CardBody>
        </>
    );
}

export default ProductSearch;