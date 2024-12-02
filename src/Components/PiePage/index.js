import { PieChart, Pie, Cell,ResponsiveContainer,Legend, } from "recharts"
import { useEffect, useState } from "react"
import Cookies from "js-cookie";

const PiePage = () => {
    const [data, setData] = useState([]);
   
    useEffect(() => {
        const fetchData = async () => {
            const url = "https://todos-backend-d9im.onrender.com/todos"
            const options = {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('jwt_token')}`, // Authorization header
                }
            }
            const response = await fetch(url, options)
            const jsonData = await response.json()

            const total = jsonData.length;
            const completed = jsonData.filter(todo => todo.status === "completed").length;
            const pending = jsonData.filter(todo => todo.status === "pending").length;

            const formattedData = [
                { name: "Total", value: total },
                { name: "Completed", value: completed },
                { name: "Pending", value: pending },
            ];
            if (response.ok) {
                setData(formattedData);
            }


        }
        fetchData()
    }, [])

    const renderLabel = (entry) => {
        const totalValue = data.reduce((acc, curr) => acc + curr.value, 0);
        const percentage = ((entry.value / totalValue) * 100).toFixed(1);
        return `${entry.value} (${percentage}%)`;
    };

    return (
        <ResponsiveContainer className="pie-chart" width="100%" height={300}>
            <PieChart width={500} height={500} data={data}>
                <Pie
                    data={data}
                    dataKey="value"
                    label={(entry) => renderLabel(entry)}
                >
                    <Cell name="Total" fill="#5a8dee" />
                    <Cell name="Completed" fill="#a3df9f" />
                    <Cell name="Pending" fill="#2cc6c6" />
                    
                </Pie>
                <Legend
                    iconType="circle"
                    layout="horizontal"
                    verticalAlign="bottom"
                    marginTop={50}
          />
            </PieChart>
        </ResponsiveContainer>
    )
}

export default PiePage;