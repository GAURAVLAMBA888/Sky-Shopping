import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
`;

const Info = styled.span`
  font-size: 60px;
  font-weight: 700;
  margin-bottom: 20px;
`;

const Desc = styled.span`
  font-size: 20px;
`;

const Cancel = () => {
    const [time, setTime] = useState(3);
  const navigate = useNavigate();

  useEffect(()=>{
    setTimeout(() => {
        setTime(time-1);
        if(time === 0) navigate('/');
    }, 1000)
  }, [time, navigate])

  return (
    <Container>
      <Info>Payment Cancelled</Info>
      <Desc>Redirecting to home page in {time} secs</Desc>
    </Container>
  );
};

export default Cancel;
