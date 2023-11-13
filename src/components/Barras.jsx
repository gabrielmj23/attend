import { BarChart, Card, Title } from "@tremor/react";

const valueFormatter = (number) =>
  ` ${new Intl.NumberFormat("us").format(number).toString()}`;

function Barras({ datosGrafica, tipo }) {
  let label = "";

  if (tipo === "2") {
    label = "Semanas";
  }

  return (
    <div>
      <Card>
        <Title>Asistencias / Inasistencias</Title>
        <BarChart
          className="mt-6"
          data={datosGrafica}
          index="name"
          categories={["Asistencias ", "Inasistencias "]}
          colors={["green", "red"]}
          valueFormatter={valueFormatter}
          yAxisWidth={48}
        />
        <h1 className="text-center text-2xl font-semibold text-gray-400">
          {label}
        </h1>
      </Card>
    </div>
  );
}

export default Barras;
