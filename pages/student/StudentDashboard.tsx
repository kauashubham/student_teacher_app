
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import PerformanceChart from '../../components/charts/PerformanceChart';
import SentimentChart from '../../components/charts/SentimentChart';
import { useAuth } from '../../context/AuthContext';
import { MOCK_STUDENTS, MOCK_STUDY_MATERIALS } from '../../services/mockDataService';
import { BarChart2, BookOpen, MessageSquare, Video, FileText, Activity } from 'lucide-react';

const StudentDashboard: React.FC = () => {
    const { user } = useAuth();
    const studentData = MOCK_STUDENTS.find(s => s.id === user?.id);

    if (!studentData) {
        return <Layout title="Student Dashboard"><div>Student data not found.</div></Layout>;
    }

    const getIcon = (type: string) => {
        switch (type) {
            case 'video': return <Video className="h-6 w-6 text-red-500" />;
            case 'pdf': return <FileText className="h-6 w-6 text-blue-500" />;
            case 'animation': return <Activity className="h-6 w-6 text-green-500" />;
            default: return <BookOpen className="h-6 w-6 text-gray-500" />;
        }
    }

    return (
        <Layout title="Student Dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main content */}
                <div className="lg:col-span-2 space-y-6">
                    <Card title="Study Materials" icon={<BookOpen />}>
                        <div className="space-y-4">
                            {MOCK_STUDY_MATERIALS.map(material => (
                                <Link to={`/student/study/${material.id}`} key={material.id} className="block p-4 bg-gray-50 dark:bg-gray-700 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors">
                                    <div className="flex items-center space-x-4">
                                        {getIcon(material.type)}
                                        <div>
                                            <p className="font-semibold">{material.title}</p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">Type: {material.type}</p>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </Card>

                    <Card title="Performance Analytics" icon={<BarChart2 />}>
                        <PerformanceChart data={studentData.performance} />
                    </Card>
                </div>

                {/* Right sidebar */}
                <div className="space-y-6">
                    <Card title="Sentiment Analysis" icon={<Activity />}>
                        <SentimentChart data={studentData.sentiments} />
                    </Card>
                    <Card title="AI Study Suggestions" icon={<MessageSquare />}>
                        <ul className="space-y-2 list-disc list-inside">
                            <li>Focus on algebraic equations to improve your score.</li>
                            <li>Review Chapter 3 of the history text for the upcoming quiz.</li>
                            <li>Try using the Pomodoro technique for longer study sessions.</li>
                        </ul>
                    </Card>
                     <Card title="Teacher Messages" icon={<MessageSquare />}>
                        {studentData.messages.length > 0 ? (
                            <ul className="space-y-2">
                                {studentData.messages.map((msg, index) => (
                                    <li key={index} className="p-2 bg-indigo-50 dark:bg-indigo-900/50 rounded-md text-sm">{msg}</li>
                                ))}
                            </ul>
                        ) : (
                            <p>No new messages.</p>
                        )}
                    </Card>
                </div>
            </div>
        </Layout>
    );
};

export default StudentDashboard;
