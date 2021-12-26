import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllOrders } from "../../Redux/actions/order";
import Loader from "../../components/UI/Loader";
import formatDate from "../../utils/formatdate";
import Meta from "../../components/UI/Meta";

const OrdersListScreen = () => {
  const dispatch = useDispatch();
  const { orders, orderloading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  return (
    <>
      <Meta title='Admin | Orders' />
      <div className='display-6 mb-4'>Orders</div>
      {orderloading ? (
        <Loader />
      ) : error ? (
        <Alert className='alert-fail-bold my-3'>{error}</Alert>
      ) : (
        <>
          <Table className='striped tab-2 bordered table-hover' responsive>
            <thead>
              <tr>
                <th scope='col-3'>ID</th>
                <th scope='col-2'>USER</th>
                <th scope='col-3'>DATE</th>
                <th scope='col-2'>TOTAL</th>
                <th scope='col-2'>PAID</th>
                <th scope='col-2'>DELIVERED</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders &&
                orders.length > 0 &&
                orders.map((o) => (
                  <tr key={o._id}>
                    <td>{o._id}</td>
                    <td>{o.user && o.user.name && o.user.name.trim()} </td>
                    <td>{formatDate(o.createdAt)}</td>
                    <td>${o.totalPrice}</td>
                    <td>
                      {o.isPaid ? (
                        <span className='text-success'>
                          {formatDate(o.paidAt)}
                        </span>
                      ) : (
                        <span className='text-danger'>NOT</span>
                      )}{" "}
                    </td>
                    <td>
                      {o.isDelivered ? (
                        <span className='text-success'>
                          {formatDate(o.deliveredAt)}
                        </span>
                      ) : (
                        <span className='text-danger'>NOT</span>
                      )}{" "}
                    </td>
                    <td>
                      <Link to={`/order/${o._id}`}>Details</Link>
                    </td>
                  </tr>
                ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  );
};

export default OrdersListScreen;
