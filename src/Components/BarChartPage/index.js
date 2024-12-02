import { BarChart, Bar, XAxis, YAxis,  ResponsiveContainer, LabelList } from "recharts";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

const BarChartPage = () => {
    const [tagData, setTagData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const url = "https://todos-backend-d9im.onrender.com/todos";
            const options = {
                method: "GET",
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('jwt_token')}`,
                }
            };
            const response = await fetch(url, options);
            const jsonData = await response.json();

            // Aggregate tags count
            const tags = jsonData.reduce((acc, todo) => {
                const tag = todo.tag; // Adjust to 'tag'
                if (tag) {
                    acc[tag] = (acc[tag] || 0) + 1; // Count occurrences of each tag
                }
                return acc;
            }, {});

            // Filter out tags with a count of 0, and then sort by count
            const sortedTags = Object.keys(tags)
                .map(tag => ({ name: tag, count: tags[tag] }))
                .filter(tag => tag.count > 0) // Remove tags with count 0
                .sort((a, b) => b.count - a.count); // Sort in descending order

            // Get top 4 tags, ensuring at least 4 tags are displayed
            const topTags = sortedTags.slice(0, 4);

            if (response.ok) {
                setTagData(topTags); // Set the sorted top tags
            }
        };

        fetchData();
    }, []);

    return (
        <ResponsiveContainer width="100%" height={300}>
            <BarChart data={tagData}>
                <XAxis dataKey="name" />
                <YAxis />
                
                <Bar radius={[15, 15, 0, 0]} dataKey="count" fill="orange" barSize={40}>
                    <LabelList dataKey="count" position="top" />
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    );
};

export default BarChartPage;
