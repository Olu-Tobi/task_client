import styled from "styled-components";
import { parseCookies } from "nookies";
import Navbar from "../components/Navbar";
import ImageUpload from "../components/ImageUpload";
import ProfileForm from "../components/ProfileForm";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Thumbnails from "../components/Thumbnails";

const Div = styled.div`
  background: #d1e2ff;
  position: relative;
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
`;

const ImageDiv = styled.div`
  margin-top: 2.5rem;
`;

const FormDiv = styled.div`
  margin-top: 2rem;
`;

const ThumbDiv = styled.div`
  margin: 2rem 0;
`;

const Home = () => {
  const cookies = parseCookies();
  //   const navigate = useNavigate();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";
  const name = user.full_name;

  //console.log(cookies);

  const navigate = useNavigate();

  useEffect(() => {
    if (!cookies?.data) {
      navigate(`/login`);
    }
  }, []);

  return (
    <Div className="noSelect">
      <Navbar />
      <Wrapper>
        <H2>Welcome, {name}</H2>
        <P>
          With this app, you are able to upload your favourite images and create
          a profile.
        </P>

        <ImageDiv>
          <ImageUpload />
        </ImageDiv>

        <ThumbDiv>
          <Thumbnails />
        </ThumbDiv>

        <FormDiv>
          <ProfileForm />
        </FormDiv>
      </Wrapper>
    </Div>
  );
};

export default Home;
