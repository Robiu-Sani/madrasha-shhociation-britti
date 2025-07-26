/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { toPng } from "html-to-image";
import axios from "axios";
import Image from "next/image";
import { Loader2, Download } from "lucide-react";
import { toast } from "react-hot-toast";

interface Exam {
  _id: string;
  name: string;
}

interface FormData {
  registerNo: string;
  examId: string;
}

interface StudentData {
  examInfo: {
    examId: string;
    examName: string;
    examDate: string;
  };
  studentInfo: {
    registerNo: string;
    roll: string;
    fatherName: string;
    motherName: string;
    branch: {
      name: string;
      address: string;
    };
    institution: {
      name: string;
      address: string;
    };
    class: {
      name: string;
    };
    center: string;
  };
  userInfo: {
    name: string;
    email: string;
    number: string;
    role: string;
    gender: string;
    dateOfBirth: string;
    address: {
      present: string;
      permanent: string;
    };
    image: string;
  };
}

export default function AdmitCardForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(false);
  const [studentData, setStudentData] = useState<StudentData | null>(null);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const targetRef = useRef<HTMLDivElement>(null);
  const [filename, setFilename] = useState("admit-card");

  // Fetch exams on component mount
  React.useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_V1}/exam/all/exam`
        );
        if (response.data.success) {
          setExams(response.data.data);
        }
      } catch (error) {
        console.log(error);
        toast.error("Failed to fetch exams");
      }
    };
    fetchExams();
  }, []);

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student/card`,
        data
      );
      if (response.data.success) {
        setStudentData(response.data.data);
        setFilename(`admit-card-${data.registerNo}`);
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Failed to fetch student data"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);
      if (targetRef.current) {
        const dataUrl = await toPng(targetRef.current, {
          cacheBust: true,
          pixelRatio: 2, // Higher quality for all devices
        });
        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `${filename}.png`;
        link.click();
      }
    } catch (error) {
      console.error("Image generation error:", error);
      toast.error("Failed to generate image. Please try again.");
    } finally {
      setIsGeneratingImage(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        {/* Form Section */}
        <div className="bg-white shadow rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Admit Card Generator
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label
                htmlFor="registerNo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Register Number
              </label>
              <input
                id="registerNo"
                type="text"
                {...register("registerNo", {
                  required: "Register number is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                placeholder="Enter register number"
              />
              {errors.registerNo && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.registerNo.message}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="examId"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Exam
              </label>
              <select
                id="examId"
                {...register("examId", {
                  required: "Exam selection is required",
                })}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="">Select an exam</option>
                {exams.map((exam) => (
                  <option key={exam._id} value={exam._id}>
                    {exam.name}
                  </option>
                ))}
              </select>
              {errors.examId && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.examId.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 disabled:opacity-50 flex justify-center items-center"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Processing...
                </>
              ) : (
                "Generate Admit Card"
              )}
            </button>
          </form>
        </div>

        {/* Admit Card Section */}
        {studentData && (
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-800">Admit Card</h2>
              <button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage}
                className="bg-emerald-600 text-white py-2 px-4 rounded-md hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 disabled:opacity-50 flex items-center"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="animate-spin mr-2 h-4 w-4" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Download className="mr-2 h-4 w-4" />
                    Download Card
                  </>
                )}
              </button>
            </div>

            {/* Admit Card Design */}
            <div
              ref={targetRef}
              className="relative w-full h-[500px] border-2 border-gray-200 rounded-lg overflow-hidden"
            >
              {/* Background with logo */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="absolute inset-0 flex items-center justify-center opacity-20">
                  <Image
                    src="/image/Logo.png"
                    alt="Institution Logo"
                    width={300}
                    height={300}
                    className="object-contain"
                  />
                </div>
              </div>

              {/* Card Content */}
              <div className="relative z-10 h-full p-8 flex flex-col">
                {/* Header */}
                <div className="text-center mb-6">
                  <h1 className="text-3xl font-bold text-blue-800 mb-2">
                    ADMIT CARD
                  </h1>
                  <p className="text-lg text-gray-700">
                    {studentData.studentInfo.institution.name}
                  </p>
                </div>

                <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Student Image */}
                  <div className="flex justify-center items-center">
                    <div className="relative w-40 h-40 border-4 border-white rounded-full shadow-lg overflow-hidden">
                      <Image
                        src={studentData.userInfo.image}
                        alt="Student Photo"
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Student Details */}
                  <div className="col-span-2">
                    <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-sm">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Student Information
                      </h2>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Name</p>
                          <p className="font-medium">
                            {studentData.userInfo.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Register No</p>
                          <p className="font-medium">
                            {studentData.studentInfo.registerNo}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Roll No</p>
                          <p className="font-medium">
                            {studentData.studentInfo.roll}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Class</p>
                          <p className="font-medium">
                            {studentData.studentInfo.class.name}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Father`s Name</p>
                          <p className="font-medium">
                            {studentData.studentInfo.fatherName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Mother`s Name</p>
                          <p className="font-medium">
                            {studentData.studentInfo.motherName}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Exam Details */}
                  <div className="col-span-3 mt-4">
                    <div className="bg-white bg-opacity-70 p-4 rounded-lg shadow-sm">
                      <h2 className="text-xl font-bold text-gray-800 mb-4">
                        Exam Information
                      </h2>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Exam Name</p>
                          <p className="font-medium">
                            {studentData.examInfo.examName}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Exam Date</p>
                          <p className="font-medium">
                            {new Date(
                              studentData.examInfo.examDate
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Center</p>
                          <p className="font-medium">
                            {studentData.studentInfo.center}
                          </p>
                        </div>
                        <div className="col-span-2 md:col-span-3">
                          <p className="text-sm text-gray-600">Address</p>
                          <p className="font-medium">
                            {studentData.studentInfo.institution.address}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-4 border-t border-gray-200 text-center text-sm text-gray-500">
                  <p>This admit card must be presented at the exam center</p>
                  <p className="mt-1">
                    © {new Date().getFullYear()} All Rights Reserved
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
