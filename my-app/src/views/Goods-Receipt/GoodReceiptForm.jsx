
import React, { useEffect, useRef, useState } from "react";
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
} from "reactstrap";
import {
    SearchOutlined,
    UserOutlined,
    CloseOutlined,
    PlusOutlined,
    CodeSandboxOutlined,
    IdcardOutlined,
    ArrowLeftOutlined
} from '@ant-design/icons';
import "../style/style.css"
import { 
    Input, 
    Button, 
    Space, 
    Table, 
    Typography, 
    Descriptions, 
    Divider, 
    AutoComplete,
    PageHeader 
} from 'antd'
import SupplierModal from '../Supplier/SupplierModal'
import ProductModal from '../Product/ProductModal'
import {Link, useHistory} from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import {getListPSSFSupplier} from '../../redux/action/supplierAction';

import _ from 'lodash'

function GoodsReceiptForm() {
    const { Text } = Typography;
    const [isEnableSupplier, setEnableSupplier] = useState(false)
    const [data, setData] = useState([]);
    const history = useHistory();
    const dispatch = useDispatch();
    let {suppliers} = useSelector(state => state.supplier)
    console.log( suppliers.content)
    
    const [searchKeyProduct, setSearchKeyProduct] = useState('');

    !suppliers && (suppliers = {content : []})
 

    const [modalSupplier, setModalSupplier] = useState({
        visible: false,
        title: ''
    })
    const [modalProduct, setModalProduct] = useState({
        visible: false,
        title: ''
    })

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
    
    const formRef = useRef();
 

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

    const renderItemSupplier = (item) => ({
        value: `${item.id}`,
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

    const renderItemProduct = (item, prefixIcon) => ({
        value: item.name,
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
    console.log(optionsSupplier);

    //option poduct
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
                   name :  'Product 1',
                   price:  150
                },<CodeSandboxOutlined />), 
                renderItemProduct({
                    name :  'Product 2',
                    price:  250
                }, <CodeSandboxOutlined />),
            ],
        }
    ];

    const handleOnSelectSearchSupplier = (item) => {
        console.log(` value : `, item);
        if(item){
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
        console.log("onCloseSupplier");
        setEnableSupplier(false);
    }

    const handleOnSelectSearchProduct = (value) => {
        console.log(` value : `, value);
        if(value){
            setSearchKeyProduct('')
            setData([...data,{
                id: 1,
                weight : 10,
                price: 100,
                name: `${value}`,
                count: 10,
                totalPrice: 1000
            }])
        }else {
            setModalProduct({
                visible: true,
                title: 'Thêm sản phẩm'
            })
        }
    }

    const handleOnChangeSearchProduct = (value) => {
        console.log(` value : `, value);
        setSearchKeyProduct(value)
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
                                    {
                                        !isEnableSupplier && <CardBody>
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
                                                    allowClear={true}
                                                >
                                                    <Input 
                                                        prefix={<SearchOutlined />}
                                                        placeholder="Tìm nhà cung cấp theo sdt, tên ..." />
                                                </AutoComplete>
                                           </Col>
                                        </Row>
                                    </CardBody>}
                                    {
                                        isEnableSupplier && <CardBody >
                                        <h4>Thông tin nhà cung cấp</h4>
                                        <Row style={{
                                            backgroundColor: 'white',
                                            padding: '15px',
                                            margin: '0px'
                                         }}>
                                             <Col md="6" sm="6">
                                                 <Space>
                                                     <UserOutlined />
                                                     <Typography.Link style={{
                                                         fontWeight: 'bold'
                                                     }} >Huy Bùi</Typography.Link>
                                                    <a onClick={onCloseSupplier}><CloseOutlined /></a>
                                                 </Space>
                                             </Col>
                                             <Divider/>
                                             <Col md="6" sm="6">
                                                 <Descriptions title="Thông tin">
                                                     <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
                                                     <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
                                                     <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
                                                     <Descriptions.Item label="Remark">empty</Descriptions.Item>
                                                     <Descriptions.Item label="Address">
                                                     No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
                                                     </Descriptions.Item>
                                                 </Descriptions>
                                             </Col>
                                        </Row>
                                     </CardBody>
                                    }
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
                                                    key={row => row.id}
                                                    dataSource={data}
                                                    columns={columns} 
                                                    summary={
                                                        pageData => {
                                                            let total = 0;
                                                            let totalCount = 0;
                                                    
                                                            pageData.forEach(({ totalPrice, count }) => {
                                                            total += totalPrice;
                                                            totalCount += count;
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
                                                                    <Text>{totalCount}</Text>
                                                                    </Table.Summary.Cell>
                                                                </Table.Summary.Row>
                                                                <Table.Summary.Row>
                                                                <Table.Summary.Cell colSpan={3}/>
                                                                    <Table.Summary.Cell colSpan>Tổng tiền</Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    {/* <Text type="danger">{totalBorrow - totalRepayment}</Text> */}
                                                                    </Table.Summary.Cell>
                                                                    <Table.Summary.Cell  >
                                                                    <Text  >{total }</Text>
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
