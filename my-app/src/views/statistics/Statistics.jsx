import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  Table,
  Row,
  Col,
} from "reactstrap";
import {useDispatch, useSelector} from 'react-redux'

import {
    getListPSSFGoodsReceipt,
    deleteGoodsReceipt
  } from '../../redux/action/goodsReceiptAction'
  import {
    renderVND
  } from '../../utils/AppUtils'

Statistics.propTypes = {
    
};

function Statistics(props) {
    const dispatch = useDispatch();
    const {isLoading, goodsReceipts} = useSelector(state => state.goodsReceipt);
    const [filter, setFilter] = useState({
        "sortCase" : 1,
        "ascSort": true,
        "pageNumber": 1,
        "pageSize": 5,
        "fromDate": "",
        "toDate": "",
        "dateExport": "",
      });

    useEffect(()=>{
        dispatch(getListPSSFGoodsReceipt({...filter}));
      },[filter])
    return (
        <>
            <div className="content">
                <Row>
                    <Col md="12">
                        <Card>
                            <CardHeader>
                                <CardTitle tag="h4">Tháng hiện tại</CardTitle>
                                <p className="category">Thống kê khuyến mãi cho nhà cung cấp ANT MV. ( Mã ANT MV)</p>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá tiền</th>
                                            <th>Kg</th>
                                            <th>Số lượng</th>
                                            <th>Tổng số kg</th>
                                            <th className="text-center">Cần</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dakota Rice</td>
                                            <td>Niger</td>
                                            <td>Oud-Turnhout</td>
                                            <td>Niger</td>
                                            <td>Oud-Turnhout</td>
                                            <td className="text-center">$36,738</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md="12">
                        <Card className="card-plain">
                            <CardHeader>
                                <CardTitle tag="h4">Khuyến mãi</CardTitle>
                                <p className="category">Tháng tiếp theo nhận được khuyến mãi</p>
                            </CardHeader>
                            <CardBody>
                                <Table className="tablesorter" responsive>
                                    <thead className="text-primary">
                                        <tr>
                                            <th>Tên sản phẩm</th>
                                            <th>Giá</th>
                                            <th>Kg</th>
                                            <th className="text-center">Số lượng</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Dakota Rice</td>
                                            <td>Niger</td>
                                            <td>Oud-Turnhout</td>
                                            <td className="text-center">$36,738</td>
                                        </tr>
                                    </tbody>
                                </Table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        </>
    );
}

export default Statistics;