
import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import Card from '../../components/common/Card';
import Modal from '../../components/common/Modal';
import Spinner from '../../components/common/Spinner';
import { MOCK_STUDY_MATERIALS } from '../../services/mockDataService';
import { summarizeContent, generateQuizQuestion } from '../../services/geminiService';
import { QuizQuestion, StudyMaterial } from '../../types';
import { BookOpen, Camera, Lightbulb, FileImage, Clipboard, XCircle } from 'lucide-react';

const fileToBase64 = (file: File): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve((reader.result as string).split(',')[1]);
    reader.onerror = (error) => reject(error);
  });


const StudySession: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [material, setMaterial] = useState<StudyMaterial | null>(null);
    const [isSummaryModalOpen, setSummaryModalOpen] = useState(false);
    const [summary, setSummary] = useState('');
    const [isSummarizing, setIsSummarizing] = useState(false);
    const [isQuizModalOpen, setQuizModalOpen] = useState(false);
    const [quizQuestion, setQuizQuestion] = useState<QuizQuestion | null>(null);
    const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);
    const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
    const webcamRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        const foundMaterial = MOCK_STUDY_MATERIALS.find(m => m.id === id);
        if (foundMaterial) {
            setMaterial(foundMaterial);
        } else {
            navigate('/student');
        }
    }, [id, navigate]);
    
    useEffect(() => {
      // Webcam logic
      const enableWebcam = async () => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true });
          if (webcamRef.current) {
            webcamRef.current.srcObject = stream;
          }
        } catch (err) {
          console.error("Error accessing webcam:", err);
        }
      };
      enableWebcam();

      // Quiz popup logic
      const quizTimer = setInterval(() => {
          handleGenerateQuiz();
      }, 60000); // Every 60 seconds

      return () => {
          clearInterval(quizTimer);
          if (webcamRef.current && webcamRef.current.srcObject) {
              const stream = webcamRef.current.srcObject as MediaStream;
              stream.getTracks().forEach(track => track.stop());
          }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSummarize = async () => {
        setIsSummarizing(true);
        setSummaryModalOpen(true);
        let result = '';
        if (screenshotFile) {
            const base64 = await fileToBase64(screenshotFile);
            result = await summarizeContent('Summarize this screenshot.', base64, screenshotFile.type);
        } else if (material?.content) {
            result = await summarizeContent(material.content);
        } else {
            result = "No content available to summarize.";
        }
        setSummary(result);
        setIsSummarizing(false);
    };

    const handleGenerateQuiz = async () => {
        if (!material?.content) return;
        setIsGeneratingQuiz(true);
        setQuizModalOpen(true);
        setSelectedAnswer(null);
        setIsAnswerCorrect(null);
        const question = await generateQuizQuestion(material.content);
        setQuizQuestion(question);
        setIsGeneratingQuiz(false);
    };
    
    const handleAnswerSubmit = () => {
        if(selectedAnswer === quizQuestion?.correctAnswer) {
            setIsAnswerCorrect(true);
        } else {
            setIsAnswerCorrect(false);
        }
    };
    
    const handleScreenshotChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(e.target.files && e.target.files[0]){
            setScreenshotFile(e.target.files[0]);
        }
    };

    if (!material) return <Layout title="Loading..."><Spinner /></Layout>;

    return (
        <Layout title={`Studying: ${material.title}`}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <Card title="Content" icon={<BookOpen />}>
                        {material.type === 'video' && (
                            <iframe className="w-full aspect-video rounded-md" src={material.url} title={material.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
                        )}
                        {material.type === 'pdf' && (
                           <div className="text-center p-8 bg-gray-100 dark:bg-gray-700 rounded-lg">
                             <p className="mb-4">PDF content would be displayed here.</p>
                             <a href={material.url} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">Open PDF</a>
                           </div>
                        )}
                        {material.type === 'animation' && (
                            <img src={material.url} alt={material.title} className="w-full h-auto rounded-md" />
                        )}
                        {material.content && <p className="mt-4 text-gray-700 dark:text-gray-300">{material.content}</p>}
                    </Card>
                </div>
                <div className="space-y-6">
                    <Card title="Webcam Monitoring" icon={<Camera />}>
                        <div className="bg-black rounded-lg overflow-hidden">
                           <video ref={webcamRef} autoPlay playsInline muted className="w-full h-auto" />
                        </div>
                        <p className="text-xs text-center mt-2 text-gray-500 dark:text-gray-400">
                            *This is a simulation. Eye tracking and sentiment analysis would happen server-side.
                        </p>
                    </Card>
                     <Card title="AI Tools" icon={<Lightbulb />}>
                        <div className="space-y-4">
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Summarize Screenshot:</label>
                             <div className="flex items-center space-x-2">
                                <input type="file" accept="image/*" onChange={handleScreenshotChange} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"/>
                                {screenshotFile && <button onClick={() => setScreenshotFile(null)}><XCircle className="h-5 w-5 text-red-500"/></button>}
                             </div>

                            <button onClick={handleSummarize} className="w-full flex justify-center items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300">
                                <Clipboard className="h-5 w-5 mr-2" /> {screenshotFile ? 'Summarize Screenshot' : 'Summarize Content'}
                            </button>
                            <button onClick={handleGenerateQuiz} className="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700">
                                <Lightbulb className="h-5 w-5 mr-2" /> Flash Quiz
                            </button>
                        </div>
                    </Card>
                </div>
            </div>

            {/* Summary Modal */}
            <Modal isOpen={isSummaryModalOpen} onClose={() => setSummaryModalOpen(false)} title="AI Summary">
                {isSummarizing ? <Spinner /> : <div className="prose prose-sm dark:prose-invert" dangerouslySetInnerHTML={{__html: summary.replace(/\n/g, '<br/>')}}></div>}
            </Modal>
            
            {/* Quiz Modal */}
            <Modal isOpen={isQuizModalOpen} onClose={() => setQuizModalOpen(false)} title="Quick Quiz!">
                {isGeneratingQuiz && <Spinner />}
                {quizQuestion && (
                    <div>
                        <p className="font-semibold mb-4">{quizQuestion.question}</p>
                        <div className="space-y-2">
                            {quizQuestion.options.map((opt, i) => (
                                <button key={i} onClick={() => setSelectedAnswer(opt)} disabled={isAnswerCorrect !== null}
                                    className={`block w-full text-left p-3 rounded-lg border-2 transition-colors ${
                                        selectedAnswer === opt ? 'border-indigo-500 bg-indigo-100 dark:bg-indigo-900/50' : 'border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700'
                                    } ${
                                       isAnswerCorrect !== null && opt === quizQuestion.correctAnswer ? 'bg-green-100 dark:bg-green-900/50 border-green-500' : '' 
                                    } ${
                                       isAnswerCorrect === false && selectedAnswer === opt ? 'bg-red-100 dark:bg-red-900/50 border-red-500' : ''
                                    }`}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                        <button onClick={handleAnswerSubmit} disabled={!selectedAnswer || isAnswerCorrect !== null} className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-indigo-300 w-full">Submit</button>
                        {isAnswerCorrect === true && <p className="mt-2 text-center text-green-600">Correct!</p>}
                        {isAnswerCorrect === false && <p className="mt-2 text-center text-red-600">Not quite. The correct answer was: {quizQuestion.correctAnswer}</p>}
                    </div>
                )}
            </Modal>
        </Layout>
    );
};

export default StudySession;
