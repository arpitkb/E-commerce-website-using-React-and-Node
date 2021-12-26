import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Alert, Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllUsers, deleteUser } from "../../Redux/actions/user";
import Loader from "../../components/UI/Loader";
import Meta from "../../components/UI/Meta";

const UserListScreen = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  const deleteHandler = (id) => {
    if (
      window.confirm(
        "Are you sure you want to delete this user? This action cannot be undone!"
      )
    ) {
      dispatch(deleteUser(id));
    }
  };

  return (
    <>
      <Meta title='Admin | Users' />
      <div className='display-6 mb-4'>Users</div>
      {loading ? (
        <Loader />
      ) : error ? (
        <Alert className='alert-fail-bold my-3'>{error}</Alert>
      ) : (
        <>
          <Table className='striped tab-2 bordered table-hover' responsive>
            <thead>
              <tr>
                <th scope='col-3'>ID</th>
                <th scope='col-2'>USERNAME</th>
                <th scope='col-3'>EMAIL</th>
                <th scope='col-2'>ADMIN</th>
                <th scope='col-2'>OPTIONS</th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.map((u) => (
                  <tr key={u._id}>
                    <td>{u._id}</td>
                    <td>{u.name.trim()} </td>
                    <td>
                      <a href={`mailto:${u.email.trim()}`}>{u.email.trim()}</a>
                    </td>
                    <td>
                      {u.isAdmin ? (
                        <span className='text-success'>YES</span>
                      ) : (
                        <span className='text-danger'>NO</span>
                      )}{" "}
                    </td>
                    <td className='px-0 pt-2 m-0'>
                      <Link className='my-0 mx-1' to={`/admin/users/${u._id}`}>
                        <Button className='btn-sm m-0'>
                          <i className='fas fa-edit'></i>
                        </Button>
                      </Link>
                      <Button
                        className='my-0 mx-1 btn-sm btn-danger'
                        onClick={() => deleteHandler(u._id)}
                      >
                        <i className='fas fa-user-minus'></i>
                      </Button>
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

export default UserListScreen;
