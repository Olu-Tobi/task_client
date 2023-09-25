import { parseCookies } from "nookies";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import baseUrl from "../Apis/baseUrl";
import { UserContext } from "../context/userContext";

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 2rem;
  width: 100%;
  flex-wrap: wrap;
`;

const ImgDiv = styled.div`
  background: rgba(255, 255, 255, 0.5);
  width: 9rem;
  height: 8rem;
  border-radius: 7px;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  object-fit: cover;
`;

const Thumbnails = () => {
  const { images, setImages, updatedImages } = useContext(UserContext);

  const cookies = parseCookies();
  //   const navigate = useNavigate();
  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  const getImages = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await baseUrl.get(`/user/${user?.id}/image`, {}, config);
      setImages(data.images);
      //console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getImages();
  }, []);

  //console.log(images);

  return (
    <>
      {images.length !== 0 && (
        <Div>
          {images?.map((image, i) => (
            <ImgDiv key={i}>
              <Img src={image?.image} alt="image" />
            </ImgDiv>
          ))}
        </Div>
      )}
    </>
  );
};

export default Thumbnails;
