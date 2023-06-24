import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useDispatch, useSelector } from "react-redux";
import { deleteProduct, findAndUpdate } from "../redux/cartRedux";

const Product = styled.div`
  display: flex;
  justify-content: space-between;
  position: relative;
  ${mobile({ flexDirection: "column" })}
`;

const ProductDetail = styled.div`
  flex: 2;
  display: flex;
`;

const Image = styled.img`
  width: 200px;
`;

const Details = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
`;

const Delete = styled.div`
  position: absolute;
  top: 10px;
  bottom: 0;
  right: 20px;
  color: red;
  cursor: pointer;
`;

const ProductName = styled.span``;

const ProductId = styled.span``;

const ProductColor = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
`;

const ProductColorDisplay = styled.div`
  margin-left: 5px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
`;

const ProductSize = styled.span``;

const PriceDetail = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const ProductAmountContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;

const ProductAmount = styled.div`
  font-size: 24px;
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  cursor: default;
  display: flex;
  align-items: center;
  justify-content: center;
  ${mobile({ margin: "5px 15px" })}
`;

const ProductPrice = styled.div`
  font-size: 30px;
  font-weight: 200;
  ${mobile({ marginBottom: "20px" })}
`;

const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const CartItemList = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();

  const deleteItem = (product) => {
    dispatch(deleteProduct({ product }));
  };

  const handleQuantity = ({ product, type }) => {
    let newQuantity;
    newQuantity = type === "inc" ? product.quantity + 1 : product.quantity - 1;
    if (newQuantity === 0) {
      dispatch(deleteProduct({ product }));
    } else {
      dispatch(findAndUpdate({ product, newQuantity }));
    }
  };

  return (
    <>
      {cart.products.map((product) => {
        return (
          <>
            <Product key={product._id}>
              <Delete>
                <DeleteIcon onClick={() => deleteItem(product)} />
              </Delete>
              <ProductDetail>
                <Image src={product.img} />
                <Details>
                  <ProductName>
                    <b>Product:</b> {product.title}
                  </ProductName>
                  <ProductId>
                    <b>ID:</b> {product._id}
                  </ProductId>
                  <ProductColor>
                    <b> Color:</b> <ProductColorDisplay color={product.color} />
                  </ProductColor>
                  <ProductSize>
                    <b>Size:</b> {product.size}
                  </ProductSize>
                </Details>
              </ProductDetail>
              <PriceDetail>
                <ProductAmountContainer>
                  <AddIcon
                    onClick={() => handleQuantity({ product, type: "inc" })}
                  />
                  <ProductAmount>{product.quantity}</ProductAmount>
                  <RemoveIcon
                    onClick={() => handleQuantity({ product, type: "dec" })}
                  />
                </ProductAmountContainer>
                <ProductPrice>
                  Rs. {product.price * product.quantity}
                </ProductPrice>
              </PriceDetail>
            </Product>
            <Hr />
          </>
        );
      })}
    </>
  );
};

export default CartItemList;
