import { BarChart, Card, Title } from "@tremor/react";

const chartdata2 = [
  {
    name: "Algreba Lineal",
    "Asistencias ": 890,
    "Inasistencias ": 338,
  },
];

const valueFormatter = (number) =>
  ` ${new Intl.NumberFormat("us").format(number).toString()}`;

function Barras() {
  return (
    <div>
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
        <h1 className="text-center text-2xl font-semibold text-gray-400"></h1>
      </Card>
    </div>
  );
}

export default Barras;
