import { useContext, useEffect, useState } from "react";
import { parseCookies } from "nookies";

import baseUrl from "../Apis/baseUrl";
import styled from "styled-components";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Div = styled.div`
  background: rgba(255, 255, 255, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 2rem 0;
  gap: 2rem;
`;

const Head = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
`;

const P = styled.h3`
  font-size: 1.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 35%;

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

const EditForm = () => {
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [err1, setErr1] = useState(false);

  const { updatedProfile, profile, setProfile } = useContext(UserContext);

  const cookies = parseCookies();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  const getProfile = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseUrl.get(`/user/${user?.id}`, {}, config);
      setProfile(data.profile[0]);
      setAddress(data.profile[0].address);
      setEmail(data.profile[0].email);
      setPhone(data.profile[0].phone);
      setFullname(data.profile[0].full_name);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, []);

  //console.log(profile);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      email.length === 0 ||
      fullname.length === 0 ||
      phone.length === 0 ||
      address.length === 0
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

      const { data } = await baseUrl.put(
        `/user/${user?.id}`,
        { email, fullname, phone, address },
        config
      );
      toast.success(data?.status);
      updatedProfile(data?.profile[0]);
      //console.log(data?.profile[0]);
      //navigate("/login");
    } catch (error) {
      console.log(error.response);
      toast.error(error.response.data.error);
    }
  };

  return (
    <>
      <Div>
        <Head>
          <P>Edit Contact Details</P>
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
            <Label>Phone Number</Label>
            <Input
              placeholder="+234 810 6170 405"
              onChange={(e) => setPhone(e.target.value)}
              value={phone}
              style={{ borderColor: err1 && phone.length <= 0 && "red" }}
            />
          </InputDiv>

          <InputDiv>
            <Label>Residential Address</Label>
            <Input
              placeholder="Ikeja, Lagos"
              onChange={(e) => setAddress(e.target.value)}
              value={address}
              style={{ borderColor: err1 && address.length <= 0 && "red" }}
            />
          </InputDiv>

          <InputDiv>
            <Btn type="submit">Update</Btn>
          </InputDiv>
        </Form>
      </Div>
    </>
  );
};

export default EditForm;
