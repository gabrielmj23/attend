import { BarChart, Card, Title } from "@tremor/react";

const chartdata2 = [
  {
    name: "Semana 1",
    "Asistencias ": 890,
    "Inasistencias ": 338,
  },
  {
    name: "Semana 2",
    "Asistencias ": 289,
    "Inasistencias ": 233,
  },
];

const valueFormatter = (number) =>
  ` ${new Intl.NumberFormat("us").format(number).toString()}`;

function Barras() {
  return (
    <Card>
      <Title>Asistencias / Inasistencias</Title>
      <BarChart
        className="mt-6"
        data={chartdata2}
        index="name"
        categories={["Asistencias ", "Inasistencias "]}
        colors={["green", "red"]}
        valueFormatter={valueFormatter}
        yAxisWidth={48}
      />
    </Card>
  );
}

export default Barras;
