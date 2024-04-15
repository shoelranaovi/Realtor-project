import { useNavigate, useLocation } from "react-router-dom";

function Header() {
  const logation = useLocation();
  const navigate = useNavigate();
  function checkpath(path) {
    if (path === logation.pathname) {
      return true;
    }
  }

  return (
    <div className="header  sticky bg-white flex justify-between mr-1 pr-4 items-center border-b-2 shadow-sm ">
      <div className="header__left">
        <img
          onClick={() => navigate("/")}
          className="h-[25px] cursor-pointer "
          src="https://static.rdc.moveaws.com/rdc-ui/logos/logo-brand.svg"
          alt=""
        />
      </div>
      <div className="header__right">
        <ul className="flex gap-4 text-[18px] pt-4 ">
          <li
            className={`cursor-pointer text-gray-400  font-sm pb-4 ${
              checkpath("/") && " text-black-600 border-b-4  border-red-600 active"
            }`}

            onClick={() => navigate("/")}
          >
            Home
          </li>
          <li
            className={`cursor-pointer text-gray-400 font-sm pb-4 ${
              checkpath("/Offer") && "text-black-500 border-b-4  border-red-600 active"
            }`}
            onClick={() => navigate("/Offer")}
          >
            Offer
          </li>
          <li
            className={`cursor-pointer text-gray-400 font-sm pb-4 ${
              checkpath("/SingIn") && " text-black border-b-4  border-red-600 active"
            }`}
            onClick={() => navigate("/SingIn")}
          >
            SingIn
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
