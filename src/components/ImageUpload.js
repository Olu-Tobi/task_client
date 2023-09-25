import { useContext, useState } from "react";
import styled from "styled-components";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import app from "../firebase";
import { BsFillImageFill } from "react-icons/bs";
import baseUrl from "../Apis/baseUrl.js";
import { parseCookies } from "nookies";
import { toast } from "react-toastify";
import { UserContext } from "../context/userContext";

const Div = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 100%;
  align-items: center;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const InputDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 30rem;
  margin: 0 auto;
  gap: 0.2rem;

  @media screen and (max-width: 600px) {
    width: 100%;
  }
`;
const Label = styled.label`
  font-size: 1rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;
const Input = styled.input``;

const Label2 = styled.label`
  width: 100%;

  height: 12rem;
  border-radius: 10px;
  outline: none;
  border: 2px dashed #4f1bff;
  font-family: inherit;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  font-size: 3rem;
  cursor: pointer;
`;

const Btn = styled.button`
  width: 7rem;
  height: 3rem;
  font-family: inherit;
  border: none;
  background-color: #4f1bff;
  color: white;
  border-radius: 10px;
  box-shadow: 3px 3px 15px 0 rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;

const BigBar = styled.div`
  width: 7rem;
  margin-top: 1rem;
  border-radius: 7px;
`;

const ProgressBar = styled.div`
  width: ${(props) => props.width};
  height: 0.5rem;
  transition: ease-in-out;
  background: #4f1bff;
  border-radius: 7px;
`;

const Span = styled.span`
  @media screen and (max-width: 600px) {
    padding: 0 1rem;
  }
`;

const ImageUpload = () => {
  const [file, setFile] = useState(null);
  const [progress, setProgress] = useState(null);

  const { images, setImages, updatedImages } = useContext(UserContext);

  const cookies = parseCookies();

  const user = cookies?.data ? JSON.parse(cookies?.data) : "";

  const handleFile = (e) => {
    const image = e.target.files[0];

    if (image.size <= 5000000) {
      setFile(image);
    }
  };

  const id = user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    const handleDataUpload = async ({ image }) => {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const { data } = await baseUrl.post(
          `/user/${id}/image`,
          { image },
          config
        );

        console.log(data);
        toast.success(data?.status);
        // console.log(data.result[0]);
        updatedImages(data?.result[0]);
        setFile(null);
        setProgress(null);
      } catch (error) {
        console.log(error.response);
      }
    };

    if (file !== null) {
      // create file and upload on firebase
      const fileName = new Date().getTime() + file.name;
      const storage = getStorage(app);
      const storageRef = ref(storage, fileName);

      const uploadTask = uploadBytesResumable(storageRef, file);

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            handleDataUpload({ image: downloadURL });
          });
        }
      );
    } else {
      handleDataUpload({ image: "" });
    }
  };
  return (
    <Div>
      <Form onSubmit={handleSubmit}>
        <InputDiv>
          <Label>Upload Image</Label>

          <Input
            onChange={(e) => handleFile(e)}
            type="file"
            id="file"
            accept="image/jpeg, image/png, image/gif, image/jpg"
          />

          <Label2 htmlFor="file">
            <BsFillImageFill style={{ opacity: "0.3" }} />
            <Span style={{ fontSize: "0.8rem", textAlign: "center" }}>
              Only JPG, PNG, GIF, and JPEG files with 5mb max size are allowed
            </Span>
            {file && file?.size < 5000000 && (
              <span style={{ fontSize: "0.8rem" }}>{file.name}</span>
            )}

            <BigBar>
              {progress !== null && <ProgressBar width={`${progress}%`} />}
            </BigBar>
          </Label2>
        </InputDiv>
        <Btn
          type="submit"
          disabled={!file && true}
          style={{ opacity: !file && "0.4" }}
        >
          Upload
        </Btn>
      </Form>
    </Div>
  );
};

export default ImageUpload;
