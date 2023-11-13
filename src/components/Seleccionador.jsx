import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import Barras from "./Barras";

const tabClass =
  "bg-white-200 mb-[-1px] cursor-pointer rounded px-5 py-2 text-lg hover:underline";
function Seleccionador({ datosGrafica }) {
  return (
    <div className="mx-auto w-1/2 pt-2">
      <Tabs
        selectedTabClassName="mb-[-1px] cursor-pointer rounded bg-green-400 px-5 py-2 text-lg"
        className="rounded-xl border-4 border-green-500 bg-white shadow-xl "
      >
        <TabList className="flex list-none justify-around p-0 pb-2 pt-2">
          <Tab className={tabClass}>Total</Tab>
        </TabList>

        <TabPanel>
          <Barras datosGrafica={datosGrafica} />
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Seleccionador;
