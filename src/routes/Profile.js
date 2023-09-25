import styled from "styled-components";
import { parseCookies } from "nookies";
import Navbar from "../components/Navbar";

import EditForm from "../components/EditForm";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/userContext";

import { useNavigate } from "react-router-dom";
import ViewImages from "../components/ViewImages";

const Div = styled.div`
  background: #d1e2ff;
  padding-bottom: 1.8rem;
`;
const Wrapper = styled.div`
  padding-top: 5rem;
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 600px) {
    width: 90%;
  }
`;

const H2 = styled.h2`
  font-size: 2rem;
  font-weight: 400;
  margin-top: 2rem;
  @media screen and (max-width: 600px) {
    font-size: 1.6rem;
  }
`;
const P = styled.p`
  margin-top: 0.5rem;
  font-size: 0.9rem;
`;

const FormDiv = styled.div`
  margin-top: 2rem;
`;

const Card = styled.div`
  background-color: #4f1bff;
  //width: 22rem;
  //height: 8rem;
  border-radius: 7px;
  box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.2);
  margin-top: 1rem;
  padding: 1rem;
  color: #fff;
`;

const ImgCon = styled.div`
  margin: 3rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
`;

const Head = styled.div``;

const H3 = styled.h3`
  font-size: 1.5rem;
  text-align: center;
`;

const Profile = () => {
  const cookies = parseCookies();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  const { profile, setProfile, images } = useContext(UserContext);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies?.data) {
      navigate(`/login`);
    }
  }, []);

  return (
    <Div>
      <Navbar />
      <Wrapper>
        <H2>Your profile</H2>

        <Card>
          <P>Full Name: {profile && profile.full_name}</P>
          <P>Email Address: {profile && profile.email}</P>
          <P>Phone Number: {profile && profile.phone}</P>
          <P>Residentrial Address: {profile && profile.address}</P>
        </Card>

        <ImgCon>
          {images.length !== 0 && (
            <Head>
              <H3>View Images</H3>
              <p>Click on the image you'd like to view.</p>
            </Head>
          )}
          <ViewImages />
        </ImgCon>
        <FormDiv>
          <EditForm />
        </FormDiv>
      </Wrapper>
    </Div>
  );
};

export default Profile;
