import { AiOutlineClose } from "react-icons/ai";
import styled from "styled-components";

const PopupDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: #282727b7;
  box-shadow: 0 3px 5px 3px grey;
  display: flex;
  justify-content: center;

  transition: all 700ms ease;
  z-index: 110;
  color: #fff;
`;
const PopupIn = styled.div`
  position: absolute;
  right: 0;
  left: 0;
  top: 0;
  bottom: 0;
  margin: auto;

  width: 80%;

  height: 80%;

  @media screen and (max-width: 1024px) {
    width: 90%;

    height: 90%;
  }
`;

const CloseDiv = styled.div`
  color: #fff;
  cursor: pointer;
  font-size: 2.3rem;
  position: absolute;
  top: 2rem;
  z-index: 120;
`;

const Popup = (props) => {
  return props.trigger ? (
    <PopupDiv>
      <CloseDiv>
        <AiOutlineClose
          onClick={() => {
            props.setTrigger(false);
          }}
        />
      </CloseDiv>
      <PopupIn>{props.children}</PopupIn>
    </PopupDiv>
  ) : (
    ""
  );
};

export default Popup;
