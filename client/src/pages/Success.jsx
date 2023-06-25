import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { userRequest } from "../requestMethods";
import {clearCart} from '../redux/cartRedux';

const Success = () => {
  const cart = useSelector((state) => state.cart);
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  
  const params = new URLSearchParams(window.location.search);

  useEffect(() => {
    const createOrder = async () => {
      try {
        const res = await userRequest.post("/orders", {
          userId: currentUser._id,
          products: cart.products.map((item) => ({
            productId: item._id,
            quantity: item._quantity,
          })),
          amount: cart.total
        });
        dispatch(clearCart());
      } catch (err) { console.log(err) }
      window.location.replace('/orders');
    };
    return () => {
      if(params.get('success') === process.env.REACT_APP_SUCCESS_KEY)
       createOrder();
      else window.location.replace('/cancel');
    };
  }, []);

  return (
    <></>
  );
};

export default Success;