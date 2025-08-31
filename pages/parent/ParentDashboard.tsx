
import React from 'react';
import Layout from '../../components/Layout';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENTS, MOCK_CLASS_AVERAGE } from '../../services/mockDataService';
import Card from '../../components/common/Card';
import PerformanceChart from '../../components/charts/PerformanceChart';
import SentimentChart from '../../components/charts/SentimentChart';
import { BarChart2, Smile, Users, MessageSquare } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ComparisonChart: React.FC<{ studentData: any; classData: any }> = ({ studentData, classData }) => {
    const combinedData = studentData.map((s_item: any, index: number) => ({
        date: s_item.date,
        studentScore: s_item.score,
        classScore: classData[index].score
    }));
    
    return (
        <ResponsiveContainer width="100%" height={300}>
            <LineChart data={combinedData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
                <XAxis dataKey="date" stroke="#9ca3af"/>
                <YAxis stroke="#9ca3af" />
                <Tooltip 
                     contentStyle={{ 
                        backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                        borderColor: '#4b5563',
                        color: '#e5e7eb'
                      }} 
                />
                <Legend />
                <Line type="monotone" dataKey="studentScore" name="Your Child's Score" stroke="#8884d8" />
                <Line type="monotone" dataKey="classScore" name="Class Average" stroke="#82ca9d" strokeDasharray="5 5" />
            </LineChart>
        </ResponsiveContainer>
    );
}

const ParentDashboard: React.FC = () => {
    const { user } = useAuth();
    const childData = MOCK_STUDENTS.find(s => s.id === user?.childId);
    
    if (!childData) {
        return <Layout title="Parent Dashboard"><div>Child data not found.</div></Layout>;
    }

    return (
        <Layout title={`${childData.name}'s Dashboard`}>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card title="Performance Analytics" icon={<BarChart2 />}>
                    <PerformanceChart data={childData.performance} />
                </Card>
                 <Card title="Performance vs. Class Average" icon={<Users />}>
                    <ComparisonChart studentData={childData.performance} classData={MOCK_CLASS_AVERAGE.performance} />
                </Card>
                 <Card title="Sentiment Analysis" icon={<Smile />}>
                    <SentimentChart data={childData.sentiments} />
                </Card>
                <Card title="Messages for You" icon={<MessageSquare />}>
                    <p className="font-semibold mb-2">From Teacher:</p>
                     {childData.messages.length > 0 ? (
                            <ul className="space-y-2">
                                {childData.messages.map((msg, index) => (
                                    <li key={index} className="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-md text-sm">{msg}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No new messages.</p>
                        )}
                </Card>
            </div>
        </Layout>
    );
};

export default ParentDashboard;
