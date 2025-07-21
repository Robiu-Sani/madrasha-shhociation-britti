"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

interface Subject {
  name: string;
  totalNumber?: number;
  getNumber: number;
}

interface Exam {
  _id: string;
  name: string;
  subjects: string[];
}

interface Student {
  _id: string;
  registerNo: string;
  roll: string;
}

export default function AddResultForm() {
  const [exams, setExams] = useState<Exam[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedExam, setSelectedExam] = useState<string>("");
  const [selectedExamSubjects, setSelectedExamSubjects] = useState<string[]>(
    []
  );
  const [studentResults, setStudentResults] = useState<
    Record<string, Subject[]>
  >({});
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchExams();
    fetchStudents();
  }, []);

  const fetchExams = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/select/exam`
      );
      if (response.data.success) {
        setExams(response.data.data);
      }
    } catch (error) {
      toast.error("Failed to fetch exams");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student/result/all`
      );
      if (response.data.success) {
        setStudents(response.data.data);
        // Initialize student results
        const initialResults: Record<string, Subject[]> = {};
        response.data.data.forEach((student: Student) => {
          initialResults[student._id] = [];
        });
        setStudentResults(initialResults);
      }
    } catch (error) {
      toast.error("Failed to fetch students");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleExamChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const examId = e.target.value;
    setSelectedExam(examId);

    const selectedExam = exams.find((exam) => exam._id === examId);
    if (selectedExam) {
      setSelectedExamSubjects(selectedExam.subjects);

      // Initialize subject marks for all students
      const updatedResults: Record<string, Subject[]> = {};
      students.forEach((student) => {
        updatedResults[student._id] = selectedExam.subjects.map((subject) => ({
          name: subject,
          totalNumber: 100,
          getNumber: 0,
        }));
      });
      setStudentResults(updatedResults);
    }
  };

  const handleMarksChange = (
    studentId: string,
    subjectIndex: number,
    value: string
  ) => {
    const updatedResults = { ...studentResults };
    const numericValue = parseInt(value) || 0;

    updatedResults[studentId][subjectIndex].getNumber = numericValue;

    setStudentResults(updatedResults);
  };

  const calculateTotal = (subjects: Subject[]): number => {
    return subjects.reduce((sum, subject) => sum + (subject.getNumber || 0), 0);
  };

  const determineResultType = (total: number, subjectCount: number): string => {
    const percentage = (total / (subjectCount * 100)) * 100;

    if (percentage < 40) return "fail";
    if (percentage >= 90) return "rewarded";
    if (percentage >= 80) return "talentful";
    if (percentage >= 60) return "general";
    return "pass";
  };

  const handleSubmit = async () => {
    if (!selectedExam) {
      toast.error("Please select an exam");
      return;
    }

    const addedBy = JSON.parse(localStorage.getItem("user") || "{}").user?._id;
    if (!addedBy) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);
    const toastId = toast.loading("Submitting results...");

    try {
      // Process each student result one by one
      for (const student of students) {
        const subjects = studentResults[student._id];
        const total = calculateTotal(subjects);

        if (subjects.some((sub) => isNaN(sub.getNumber) || sub.getNumber < 0)) {
          toast.error(`Invalid marks for student ${student.roll}`);
          continue;
        }

        const resultData = {
          exam: selectedExam,
          student: student._id,
          addedBy,
          subjects,
          total,
          resultType: determineResultType(total, subjects.length),
        };

        await axios.post(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/result`,
          resultData
        );
      }

      toast.success("All results submitted successfully!", { id: toastId });
      // Reset form after successful submission
      setSelectedExam("");
      setSelectedExamSubjects([]);
      setStudentResults({});
    } catch (error) {
      console.error(error);
      toast.error("Failed to submit some results", { id: toastId });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Add Results</h1>

      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Select Exam
          </label>
          <select
            value={selectedExam}
            onChange={handleExamChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isSubmitting}
          >
            <option value="">Select an exam</option>
            {exams.map((exam) => (
              <option key={exam._id} value={exam._id}>
                {exam.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {selectedExam && (
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Student Results</h2>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Roll No.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Register No.
                  </th>
                  {selectedExamSubjects.map((subject, index) => (
                    <th
                      key={index}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {subject}
                    </th>
                  ))}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {students.map((student) => (
                  <tr key={student._id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {student.roll}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {student.registerNo}
                    </td>
                    {studentResults[student._id]?.map((subject, subIndex) => (
                      <td
                        key={subIndex}
                        className="px-6 py-4 whitespace-nowrap"
                      >
                        <input
                          type="number"
                          min="0"
                          max={subject.totalNumber}
                          value={subject.getNumber || ""}
                          onChange={(e) =>
                            handleMarksChange(
                              student._id,
                              subIndex,
                              e.target.value
                            )
                          }
                          className="w-20 p-1 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                          disabled={isSubmitting}
                        />
                      </td>
                    ))}
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {calculateTotal(studentResults[student._id] || [])}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={isSubmitting || !selectedExam}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? "Submitting..." : "Submit Results"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
