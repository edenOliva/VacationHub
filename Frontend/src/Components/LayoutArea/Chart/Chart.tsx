import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface ChartProps {
    data: any;
}

function Chart(props: ChartProps): JSX.Element {

    return (
        <ResponsiveContainer
            width="90%"
            height={400}>
            <BarChart
                data={props.data}
                margin={{
                    top: 10,
                    left: 30,
                }}>

                <CartesianGrid strokeDasharray="3 3"></CartesianGrid>
                <XAxis dataKey="destination"></XAxis>
                <YAxis></YAxis>
                <Tooltip></Tooltip>
                <Bar dataKey="likes" fill="LightPink"></Bar>

            </BarChart>

        </ResponsiveContainer>
    );
}

export default Chart;
