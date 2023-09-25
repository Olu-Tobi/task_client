import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import baseUrl from "../Apis/baseUrl";
import styled from "styled-components";
import { toast } from "react-toastify";
import { parseCookies } from "nookies";
import cookie from "js-cookie";
import { MdOutlineVisibility } from "react-icons/md";
import { MdOutlineVisibilityOff } from "react-icons/md";

const Div = styled.div`
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100vh;
  gap: 2rem;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const H2 = styled.h2`
  font-weight: 400;
`;

const P = styled.p``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 28%;

  @media screen and (max-width: 1024px) {
    width: 50%;
  }

  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  position: relative;
`;
const Label = styled.label`
  font-size: 0.9rem;
`;
const Input = styled.input`
  outline: none;
  width: 96%;
  padding: 0 2%;
  height: 2.5rem;
  border: 1px solid #d1e2ff;
  font-family: inherit;
  background: inherit;
  border-radius: 7px;
`;

const Visible = styled.div`
  position: absolute;
  right: 5%;
  top: 50%;
  font-size: 1.3rem;
  cursor: pointer;
`;
const Invisible = styled.div`
  position: absolute;
  right: 5%;
  top: 50%;
  font-size: 1.3rem;
  cursor: pointer;
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

const P2 = styled.p`
  margin-top: 5px;
`;
const NewLink = styled(Link)`
  text-decoration: none;
  color: #4f1bff;
`;

const Register = () => {
  const [visible, setVisible] = useState(false);
  const [invisible, setInvisible] = useState(true);
  const [type, setType] = useState("password");
  const [visible2, setVisible2] = useState(false);
  const [invisible2, setInvisible2] = useState(true);
  const [type2, setType2] = useState("password");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [err1, setErr1] = useState(false);

  const cookies = parseCookies();
  const navigate = useNavigate();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  useEffect(() => {
    if (cookies?.data) {
      navigate(`/user/${user?.id}`);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email.length === 0 ||
      fullname.length === 0 ||
      password.length === 0 ||
      repeatPassword.length === 0
    ) {
      setErr1(true);
    } else {
      setErr1(false);
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseUrl.post(
        `/auth/register`,
        { email, fullname, password, repeatPassword },
        config
      );
      toast.success(data?.status);

      //console.log(data);
      navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.error);
    }
  };

  return (
    <Div>
      <Head>
        <H2>Sign up</H2>
        <P>Input required details to get started</P>
      </Head>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label>Full Name</Label>
          <Input
            placeholder="John Doe"
            onChange={(e) => setFullname(e.target.value)}
            value={fullname}
            style={{ borderColor: err1 && fullname.length <= 0 && "red" }}
          />
        </InputDiv>

        <InputDiv>
          <Label>Email Address</Label>
          <Input
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            style={{ borderColor: err1 && email.length <= 0 && "red" }}
          />
        </InputDiv>

        <InputDiv>
          <Label>Password</Label>
          <Input
            type={type}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            style={{ borderColor: err1 && password.length <= 0 && "red" }}
          />

          {invisible ? (
            <Visible
              onClick={() => {
                setVisible(true);
                setInvisible(false);
                setType("text");
              }}
            >
              <MdOutlineVisibility />
            </Visible>
          ) : (
            <Invisible
              onClick={() => {
                setInvisible(true);
                setVisible(false);
                setType("password");
              }}
            >
              <MdOutlineVisibilityOff />
            </Invisible>
          )}
        </InputDiv>

        <InputDiv>
          <Label>Repeat Password</Label>
          <Input
            type={type2}
            placeholder="Repeat password"
            onChange={(e) => setRepeatPassword(e.target.value)}
            value={repeatPassword}
            style={{ borderColor: err1 && repeatPassword.length <= 0 && "red" }}
          />

          {invisible2 ? (
            <Visible
              onClick={() => {
                setVisible2(true);
                setInvisible2(false);
                setType2("text");
              }}
            >
              <MdOutlineVisibility />
            </Visible>
          ) : (
            <Invisible
              onClick={() => {
                setInvisible2(true);
                setVisible2(false);
                setType2("password");
              }}
            >
              <MdOutlineVisibilityOff />
            </Invisible>
          )}
        </InputDiv>

        <InputDiv>
          <Btn type="submit">Sign up</Btn>
          <P2>
            Have an account? <NewLink to="/login">Login</NewLink>
          </P2>
        </InputDiv>
      </Form>
    </Div>
  );
};

export default Register;
