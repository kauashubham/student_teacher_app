
import React, { useState } from 'react';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import { MOCK_STUDENTS } from '../../services/mockDataService';
import { Student } from '../../types';
import Modal from '../../components/common/Modal';

const AdminDashboard: React.FC = () => {
    const [isReportModalOpen, setReportModalOpen] = useState(false);
    const [selectedStudentForReport, setSelectedStudentForReport] = useState<Student | null>(null);

    const handleGenerateReport = (student: Student) => {
        setSelectedStudentForReport(student);
        setReportModalOpen(true);
    };

    return (
        <Layout title="Administrator Dashboard">
            <Card title="All Students Overview">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Avg Score</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Fees Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Overall Progress</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                            {MOCK_STUDENTS.map((student) => {
                                const avgScore = student.performance.reduce((acc, p) => acc + p.score, 0) / student.performance.length;
                                const feeProgress = (student.fees.paid / student.fees.total) * 100;

                                return (
                                    <tr key={student.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{student.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{avgScore.toFixed(1)}%</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                                                <div className="bg-green-600 h-2.5 rounded-full" style={{ width: `${feeProgress}%` }}></div>
                                            </div>
                                            <span className="text-xs">${student.fees.paid} / ${student.fees.total}</span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                                            <div className="flex items-center">
                                                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700 mr-2">
                                                    <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: `${student.progress}%` }}></div>
                                                </div>
                                                <span>{student.progress}%</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                            <button onClick={() => handleGenerateReport(student)} className="text-indigo-600 hover:text-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200">Generate Report</button>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </Card>

            <Modal isOpen={isReportModalOpen} onClose={() => setReportModalOpen(false)} title={`Progress Report for ${selectedStudentForReport?.name}`}>
                {selectedStudentForReport && (
                    <div className="space-y-4">
                        <div><span className="font-semibold">Student:</span> {selectedStudentForReport.name}</div>
                        <div><span className="font-semibold">Overall Progress:</span> {selectedStudentForReport.progress}%</div>
                        <div><span className="font-semibold">Average Score:</span> {(selectedStudentForReport.performance.reduce((acc, p) => acc + p.score, 0) / selectedStudentForReport.performance.length).toFixed(1)}%</div>
                        <div><span className="font-semibold">Average Focus Time:</span> {(selectedStudentForReport.performance.reduce((acc, p) => acc + p.focusTime, 0) / selectedStudentForReport.performance.length).toFixed(1)} minutes/session</div>
                        <div><span className="font-semibold">Fees Paid:</span> ${selectedStudentForReport.fees.paid} of ${selectedStudentForReport.fees.total}</div>
                        <h4 className="font-semibold pt-2 border-t mt-4">Teacher Comments:</h4>
                        {selectedStudentForReport.messages.length > 0 ? (
                             <ul className="list-disc list-inside text-sm">
                                {selectedStudentForReport.messages.map((msg, i) => <li key={i}>{msg}</li>)}
                            </ul>
                        ): <p className="text-sm text-gray-500">No comments from the teacher.</p>}
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default AdminDashboard;
