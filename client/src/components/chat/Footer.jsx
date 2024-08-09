import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic } from "@mui/icons-material";
import { useEffect } from "react";
import { uploadFile } from "../../service/api"

const Component = styled(Box)`
  background: #ededed;
  display: flex;
  align-items: center;
  padding: 8px;
  height: 9%;
  & > svg{
  color: #919191;
  }
`;

const InputContainer = styled(Box)`
  flex-grow: 1;
  margin: 0 8px;
  background: #fff;
  border-radius: 16px;
  padding: 0 12px;
`;

const Footer = ({ sendText, setValue, value, file, setFile }) => {
  // useEffect(() => {
  //   const getImage = async () => {
  //     if (file) {
  //       const data = new FormData();
  //       data.append("name", file.name);
  //       data.append("file", file);
  //       await uploadFile(data);
  //     }
  //   }
  //   getImage();
  // }, [file])  // Only trigger when 'file' changes

  // const onFileChange = (e) => {
  //   setFile(e.target.files[0]);
  //   setText(e.target.files[0].name)
  // }

  return (
    <Component>
      <EmojiEmotionsOutlined style={{ cursor: "pointer" }} />
      <label htmlFor="fileInput">
        <AttachFile style={{ cursor: "pointer" }} />
      </label>
      {/* <input type='file' id="fileInput" style={{ display: 'none', cursor: "pointer" }} onChange={(e) => { onFileChange(e) }} /> */}
      <InputContainer>
        <InputBase placeholder="Type a message" fullWidth
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={value} />
      </InputContainer>
      <Mic style={{ cursor: "pointer" }} />
    </Component>
  );
}

export default Footer;
