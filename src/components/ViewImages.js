import { parseCookies } from "nookies";
import { useContext, useEffect, useState } from "react";
import styled from "styled-components";

import { UserContext } from "../context/userContext";
import Popup from "./Popup";
import baseUrl from "../Apis/baseUrl";

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
  cursor: pointer;
`;

const Img = styled.img`
  width: 100%;
  height: 100%;
  border-radius: 7px;
  object-fit: cover;
`;

const Img2 = styled.img`
  width: 100%;
  height: 100%;

  object-fit: contain;
`;

const ViewImages = () => {
  const { images, setImages, updatedImages } = useContext(UserContext);
  const [trigger, setTrigger] = useState(false);
  const [imgSrc, setImgSrc] = useState("");

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

  const handleClick = ({ image }) => {
    setImgSrc(image);
    setTrigger(true);
    //console.log(image);
  };

  //console.log(images);
  return (
    <>
      {images.length !== 0 && (
        <Div>
          {images?.map((image, i) => (
            <ImgDiv
              key={i}
              onClick={() => handleClick(image)}
              className="noSelect"
            >
              <Img src={image?.image} alt="image" />
            </ImgDiv>
          ))}
        </Div>
      )}
      {/* <Img2 src={imgSrc} alt="image" /> */}

      <Popup trigger={trigger} setTrigger={setTrigger}>
        <Img2 src={imgSrc} alt="image" />
      </Popup>
    </>
  );
};

export default ViewImages;
