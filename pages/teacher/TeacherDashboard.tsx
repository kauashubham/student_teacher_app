
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import { MOCK_STUDENTS } from '../../services/mockDataService';
import { Student } from '../../types';
import PerformanceChart from '../../components/charts/PerformanceChart';
import SentimentChart from '../../components/charts/SentimentChart';
import { Users, MessageSquare, Send } from 'lucide-react';

const TeacherDashboard: React.FC = () => {
    const [selectedStudent, setSelectedStudent] = useState<Student | null>(MOCK_STUDENTS[0]);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<Record<string, string[]>>(
        MOCK_STUDENTS.reduce((acc, student) => ({...acc, [student.id]: student.messages}), {})
    );

    const handleSendMessage = () => {
        if (message.trim() && selectedStudent) {
            const studentId = selectedStudent.id;
            setMessages(prev => ({
                ...prev,
                [studentId]: [...(prev[studentId] || []), message]
            }));
            setMessage('');
            // Here you would typically call an API to send the message
        }
    };
    
    return (
        <Layout title="Teacher Dashboard">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Student List */}
                <div className="lg:col-span-1">
                    <Card title="My Students" icon={<Users />}>
                        <ul className="space-y-2">
                            {MOCK_STUDENTS.map(student => (
                                <li key={student.id}>
                                    <button 
                                        onClick={() => setSelectedStudent(student)}
                                        className={`w-full text-left p-3 rounded-lg transition-colors ${selectedStudent?.id === student.id ? 'bg-indigo-100 dark:bg-indigo-900 font-semibold' : 'hover:bg-gray-100 dark:hover:bg-gray-700'}`}
                                    >
                                        {student.name}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </Card>
                </div>

                {/* Student Details */}
                <div className="lg:col-span-2">
                    {selectedStudent ? (
                        <div className="space-y-6">
                            <Card title={`${selectedStudent.name}'s Analytics`}>
                                <PerformanceChart data={selectedStudent.performance} />
                            </Card>
                            <Card title="Sentiment Analysis">
                                <SentimentChart data={selectedStudent.sentiments} />
                            </Card>
                            <Card title="Direct Message" icon={<MessageSquare />}>
                                <div className="mb-4 space-y-2">
                                    <h4 className="font-semibold">Message History:</h4>
                                    {messages[selectedStudent.id]?.length > 0 ? (
                                        <ul className="max-h-40 overflow-y-auto p-2 bg-gray-50 dark:bg-gray-700 rounded-md">
                                            {messages[selectedStudent.id].map((msg, index) => <li key={index} className="text-sm p-1">{msg}</li>)}
                                        </ul>
                                    ) : <p className="text-sm text-gray-500">No messages yet.</p>
                                    }
                                </div>
                                <div className="flex space-x-2">
                                    <input 
                                        type="text"
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder={`Message ${selectedStudent.name}...`}
                                        className="flex-grow p-2 border rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500"
                                    />
                                    <button onClick={handleSendMessage} className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 flex items-center">
                                        <Send className="h-5 w-5" />
                                    </button>
                                </div>
                            </Card>
                        </div>
                    ) : (
                        <Card title="Select a Student">
                            <p>Please select a student from the list to view their details.</p>
                        </Card>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default TeacherDashboard;
