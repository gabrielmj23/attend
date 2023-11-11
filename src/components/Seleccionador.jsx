import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import CardAsistencia from "./CardAsistencia";
import Barras from "./Barras";

const date = new Date();
const tabClass =
  "bg-white-200 mb-[-1px] cursor-pointer rounded px-5 py-2 text-lg hover:bg-gray-200";
function Seleccionador() {
  return (
    <div className="mx-auto w-1/2">
      <Tabs
        selectedTabClassName="mb-[-1px] cursor-pointer rounded bg-green-400 px-5 py-2 text-lg"
        className="rounded-xl bg-white shadow-xl "
      >
        <TabList className="flex list-none justify-around p-0">
          <Tab className={tabClass}>Pestaña 1</Tab>
          <Tab className={tabClass}>Pestaña 2</Tab>
          <Tab className={tabClass}>Pestaña 3</Tab>
        </TabList>

        <TabPanel>
          <Barras />
        </TabPanel>
        <TabPanel>
          <CardAsistencia
            idClase="2"
            fecha={date}
            contenido="tucupita"
            color="amarillo"
          />
        </TabPanel>
        <TabPanel>
          <Barras />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Seleccionador;
