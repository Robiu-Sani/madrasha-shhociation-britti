"use client";
import React from "react";
import "animate.css";
import {
  BookOpen,
  Hash,
  ClipboardList,
  ChevronDown,
  Search,
} from "lucide-react";

const ExamResultForm = () => {
  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-xl animate__animated animate__fadeInUp">
      {/* Header */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <BookOpen className="w-8 h-8 text-blue-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">
          Check Your Results
        </h2>
        <p className="text-gray-500">Enter your details to view exam results</p>
      </div>

      {/* Form */}
      <form className="space-y-5">
        {/* Exam Selection */}
        <div className="relative">
          <label
            htmlFor="exam"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Select Exam
          </label>
          <div className="relative">
            <select
              id="exam"
              className="appearance-none block w-full pl-10 pr-10 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500 bg-white"
            >
              <option value="">-- Select Exam --</option>
              <option value="final">Final Examination 2023</option>
              <option value="mid">Mid-Term Examination 2023</option>
              <option value="test">Monthly Test</option>
            </select>
            <div className="absolute left-3 top-3 text-gray-400">
              <ClipboardList className="w-5 h-5" />
            </div>
            <div className="absolute right-3 top-3 text-gray-400">
              <ChevronDown className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Student Roll */}
        <div className="relative">
          <label
            htmlFor="roll"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Student Roll Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="roll"
              placeholder="Enter your roll number"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <Hash className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Registration Number */}
        <div className="relative">
          <label
            htmlFor="reg"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Registration Number
          </label>
          <div className="relative">
            <input
              type="text"
              id="reg"
              placeholder="Enter registration number"
              className="block w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
            <div className="absolute left-3 top-3 text-gray-400">
              <ClipboardList className="w-5 h-5" />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium rounded-lg shadow-md hover:from-blue-700 hover:to-indigo-700 transition-all animate__animated animate__pulse animate__infinite"
        >
          <Search className="w-5 h-5 mr-2" />
          Search Results
        </button>
      </form>

      {/* Footer Note */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>Having trouble? Contact exam department</p>
      </div>
    </div>
  );
};

export default ExamResultForm;
