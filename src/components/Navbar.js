import { useEffect, useState } from "react";
import styled from "styled-components";
import cookie from "js-cookie";
import { parseCookies } from "nookies";
import { CgMenuLeft } from "react-icons/cg";
import { CgClose } from "react-icons/cg";
import { Link, useNavigate } from "react-router-dom";

const NavContainer = styled.div`
  position: fixed;
  width: 100%;
  z-index: 100;
  background-color: rgba(255, 255, 255, 0.3);
  position: fixed;
  height: 5rem;
  @media screen and (max-width: 1024px) {
    height: 4rem;
  }
`;
const NavWrapper = styled.div`
  width: 90%;
  height: 100%;
  margin: auto;

  display: flex;
  align-items: center;
`;

const LogoDiv = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Ul = styled.ul`
  flex: 4;
  list-style: none;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 3rem;
  font-weight: 400;
  @media screen and (max-width: 1024px) {
    display: none;
  }
`;

const Ul2 = styled.ul`
  flex: 4;
  list-style: none;
  display: none;

  justify-content: flex-start;
  gap: 3rem;
  @media screen and (max-width: 1024px) {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 4rem;
    right: 0;
    width: 18rem;
    height: 40rem;
    background: rgba(255, 255, 255, 0.9);
    padding: 2.5rem 1.5rem;
  }

  @media screen and (max-width: 600px) {
    width: 12rem;
  }
`;

const NewLink = styled(Link)`
  text-decoration: none;
  color: inherit;
`;
const Li = styled.li`
  cursor: pointer;

  font-size: 1rem;
`;

const Btn = styled.button`
  width: 9rem;
  height: 3rem;
  font-family: inherit;
  border: none;
  background-color: #4f1bff;
  color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const MenuDiv = styled.div`
  display: none;
  @media screen and (max-width: 1024px) {
    display: inline;
  }
`;

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [click, setClick] = useState(false);

  const navigate = useNavigate();

  const cookies = parseCookies();

  const user = cookies?.data ? JSON.parse(cookies?.data) : "";
  const id = user.id;

  const handleClick = () => {
    cookie.remove("data");

    navigate("/login");
  };

  const controlNavbar = () => {
    if (typeof window !== "undefined") {
      if (window.scrollY > lastScrollY) {
        // if scroll down hide the navbar
        setShow(false);
      } else {
        // if scroll up show the navbar
        setShow(true);
      }

      // remember current page location to use in the next move
      setLastScrollY(window.scrollY);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar);

      // cleanup function
      return () => {
        window.removeEventListener("scroll", controlNavbar);
      };
    }
  }, [lastScrollY]);

  return (
    <NavContainer className={show ? "active" : "hidden"}>
      <NavWrapper>
        <LogoDiv>
          <h2 style={{ fontSize: "2rem" }}>
            Lo<span style={{ color: "#4f1bff" }}>go</span>
          </h2>
        </LogoDiv>

        <Ul>
          <NewLink to={`/user/${id}`}>
            <Li>Home</Li>
          </NewLink>
          <NewLink to={`/user/${id}/profile`}>
            <Li>Profile</Li>
          </NewLink>

          <Btn onClick={handleClick}>Sign out</Btn>
        </Ul>

        <MenuDiv>
          {!click && (
            <CgMenuLeft
              onClick={() => setClick(true)}
              style={{ fontSize: "2rem" }}
            />
          )}
          {click && (
            <CgClose
              onClick={() => setClick(false)}
              style={{ fontSize: "2rem" }}
            />
          )}
        </MenuDiv>

        {click && (
          <Ul2>
            <NewLink to={`/user/${id}`} onClick={() => setClick(false)}>
              <Li>Home</Li>
            </NewLink>
            <NewLink to={`/user/${id}/profile`} onClick={() => setClick(false)}>
              <Li>Profile</Li>
            </NewLink>

            <Btn onClick={handleClick}>Sign out</Btn>
          </Ul2>
        )}
      </NavWrapper>
    </NavContainer>
  );
};

export default Navbar;
