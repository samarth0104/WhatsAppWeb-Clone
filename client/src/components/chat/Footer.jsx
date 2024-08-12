import { Box, InputBase, styled } from "@mui/material";
import { EmojiEmotionsOutlined, AttachFile, Mic, Send } from "@mui/icons-material";

const Component = styled(Box)`
  background: #ededed;
  display: flex;
  align-items: center;
  padding: 8px;
  height: 9%;
  & > svg {
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
  return (
    <Component>
      <EmojiEmotionsOutlined style={{ cursor: "pointer" }} />
      <label htmlFor="fileInput">
        <AttachFile style={{ cursor: "pointer" }} />
      </label>
      {/* <input type='file' id="fileInput" style={{ display: 'none', cursor: "pointer" }} onChange={(e) => { onFileChange(e) }} /> */}
      <InputContainer>
        <InputBase
          placeholder="Type a message"
          fullWidth
          onChange={(e) => setValue(e.target.value)}
          onKeyDown={(e) => sendText(e)}
          value={value}
        />
      </InputContainer>
      {value ? (
        <Send style={{ cursor: "pointer" }} onClick={(e) => sendText(e)} />
      ) : (
        <Mic style={{ cursor: "pointer" }} />
      )}
    </Component>
  );
};

export default Footer;
