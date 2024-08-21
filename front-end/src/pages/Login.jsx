import Forms from "../components/Forms";


const handleButtonClick = () => {
  alert("Botão clicado!");
  
};

const Login = () => {
  return <Forms type="Login" acao={handleButtonClick} />;
};

export default Login;