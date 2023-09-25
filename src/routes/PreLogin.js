import styled from "styled-components";
import { parseCookies } from "nookies";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const ImgDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;
const Img = styled.img`
  width: 10rem;
`;
const BtnDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
`;
const Btn = styled.button`
  width: 9rem;
  height: 3rem;
  font-family: inherit;
  border: 1px solid #4f1bff;
  background: ${(props) => props.background};
  color: ${(props) => props.color};
  border-radius: 10px;
  box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const PreLogin = () => {
  const cookies = parseCookies();
  const navigate = useNavigate();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  useEffect(() => {
    if (cookies?.data) {
      navigate(`/user/${user?.id}`);
    }
  }, []);
  return (
    <Div>
      <Wrapper>
        <ImgDiv>
          <Img src="/profile.png" alt="image" />
        </ImgDiv>

        <BtnDiv>
          <Link to="/register">
            <Btn background="#4f1bff" color="#fff">
              Sign up
            </Btn>
          </Link>

          <Link to="/login">
            <Btn background="#fff" color="#000">
              Login
            </Btn>
          </Link>
        </BtnDiv>
      </Wrapper>
    </Div>
  );
};

export default PreLogin;
