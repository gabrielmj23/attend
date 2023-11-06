import { Link } from "react-router-dom";
import WebNav from "../../components/WebNav";

function HomeAdmin() {
  return (
    <div>
      <WebNav>
        <Link to="/admin/home" className="font-bold hover:underline">
          Periodos
        </Link>
        <Link
          to="/admin/docentes"
          className="text-neutral-800 hover:text-neutral-900 hover:underline"
        >
          Docentes
        </Link>
      </WebNav>
    </div>
  );
}

export default HomeAdmin;
