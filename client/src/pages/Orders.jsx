import "../css/orders.css";
import { useSelector } from "react-redux";
import Navbar from "../components/Navbar";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styled from "styled-components";
import { useEffect } from "react";
import { userRequest } from "../requestMethods";
import { useState } from "react";

const ListContainer = styled.div`
  -webkit-box-shadow: 2px 4px 10px 1px rgba(0, 0, 0, 0.47);
  box-shadow: 2px 4px 10px 1px rgba(201, 201, 201, 0.47);
  padding: 20px;
  margin: 20px;
`;

const ListTitle = styled.div`
  font-size: 30px;
  font-weight: 400;
  color: #353535;
  margin-bottom: 15px;
`;

const List = () => {
  const userId = useSelector((state) => state.user).currentUser._id;
  const [orders, setOrders] = useState([]); 

  useEffect(() => {
    const getOrders = async () => {
      try {
        const res = await userRequest.get(`/orders/find/${userId}`);
        setOrders(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    getOrders();
  }, [userId]);

  
  return (
    <>
      <Navbar />
      <ListContainer>
        <ListTitle>My Orders</ListTitle>
        <TableContainer component={Paper} className="table">
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell className="tableCell">Order ID</TableCell>
                <TableCell className="tableCell">Product</TableCell>
                <TableCell className="tableCell">Date</TableCell>
                <TableCell className="tableCell">Amount</TableCell>
                <TableCell className="tableCell">Payment Method</TableCell>
                <TableCell className="tableCell">Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders?.map((order) => (
                <TableRow key={order._id}>
                  <TableCell className="tableCell">{order._id}</TableCell>
                  <TableCell className="tableCell">
                    <div className="cellWrapper">
                      <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ac/No_image_available.svg/450px-No_image_available.svg.png" alt="" className="image" />
                      {order.products[0].productId}
                    </div>
                  </TableCell>
                  <TableCell className="tableCell">{order.createdAt}</TableCell>
                  <TableCell className="tableCell">{order.amount}</TableCell>
                  <TableCell className="tableCell">Online</TableCell>
                  <TableCell className="tableCell">
                    <span className={`status ${order.status}`}>{order.status}</span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ListContainer>
    </>
  );
};

export default List;
