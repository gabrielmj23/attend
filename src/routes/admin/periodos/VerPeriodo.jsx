import { Link } from "react-router-dom";
import WebNav from "../../../components/WebNav";
import Input from "../../../components/Input";
import SearchIcon from '@mui/icons-material/Search';
import CardMateriaWeb from "../../../components/CardMateriaWeb";

function VerPeriodo() {
    return (
        <div>
            <WebNav>
                <Link to="/admin/home" className="hover:underline font-semibold">Periodos</Link>
                <Link to="/admin/docentes" className="text-neutral-800 hover:text-neutral-900 hover:underline">
                Docentes
                </Link>
            </WebNav>
            <h2 className="py-8 ps-16 text-2xl pl- font-semibold">Periodo Academico Actual</h2>
            <div className="ps-16 pl- flex w-1/2 max-w-lg flex-col gap-6">
                <Input
                id="buscar"
                textoLabel="Buscar materia"
                textoPlaceholder="Materia"
                icono={<SearchIcon />}
                />
            </div>
            <div className="mx-10 py-8 grid grid-cols-3 gap-6 items-center justify-center place-self-center">
                <div className="">
                    <CardMateriaWeb
                        idPeriodo="2021-1"
                        nombreMateria="Algebra lineal"
                        nombreDocente="Yoel"
                        seccion="401"
                        color="verde"
                    />
                </div>
                <div className="">
                    <CardMateriaWeb
                        idPeriodo="2021-1"
                        nombreMateria="Algebra lineal"
                        nombreDocente="Yoel"
                        seccion="401"
                        color="verde"
                    />
                </div>
                <div className="">
                    <CardMateriaWeb
                        idPeriodo="2021-1"
                        nombreMateria="Algebra lineal"
                        nombreDocente="Yoel"
                        seccion="401"
                        color="verde"
                    />
                </div>
                <div className="">
                    <CardMateriaWeb
                        idPeriodo="2021-1"
                        nombreMateria="Algebra lineal"
                        nombreDocente="Yoel"
                        seccion="401"
                        color="verde"
                    />
                </div>
            </div>
        </div>
        
    );
}

export default VerPeriodo;
    