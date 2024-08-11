import Messenger from "./components/Messenger";
import { GoogleOAuthProvider } from '@react-oauth/google';
import AccountProvider from "./components/context/AccountProvider";

function App() {
  const clientId = "1070140487876-imkha8j3jg9vkg9u35rfh9ebh2kghdg7.apps.googleusercontent.com"
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider props>
        <Messenger />
      </AccountProvider>
    </GoogleOAuthProvider>
  );
}

document.title = "WhatsApp Web Clone";
export default App;
