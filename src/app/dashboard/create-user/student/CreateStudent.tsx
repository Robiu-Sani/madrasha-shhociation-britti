/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import toast from "react-hot-toast";
import {
  User,
  Users,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Building,
  ChevronDown,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import ImageUpload from "@/app/_default/ImageUpload";

interface FormData {
  name: string;
  number: string;
  email: string;
  group: string;
  gender: "male" | "female" | "other";
  dateOfBirth: string;
  address: {
    present: string;
    permanent: string;
  };
  fatherName?: string;
  motherName?: string;
  center?: string;
  image?: string;
  institution: string;
  branch: string;
  studentClass: string;
}

export default function CreateStudent({
  institution,
  branch,
  group,
  classes,
}: any) {
  const [image, setImage] = useState<string>("");
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      number: "",
      email: "",
      group: "",
      gender: "" as "male" | "female" | "other",
      dateOfBirth: "",
      address: {
        present: "",
        permanent: "",
      },
      fatherName: "",
      motherName: "",
      center: "",
      image: "",
      institution: "",
      branch: "",
      studentClass: "",
    },
  });

  const selectedBranch = watch("branch");

  // Filter institutions based on selected branch
  const filteredInstitutions = institution.filter(
    (inst: any) => inst.branch._id === selectedBranch
  );

  // Reset institution when branch changes
  useEffect(() => {
    if (selectedBranch) {
      setValue("institution", "");
    }
  }, [selectedBranch, setValue]);

  const onSubmit = async (data: FormData) => {
    try {
      const payload = {
        name: data.name,
        number: data.number,
        email: data.email,
        gender: data.gender,
        dateOfBirth: data.dateOfBirth,
        address: data.address,
        fatherName: data.fatherName || undefined,
        motherName: data.motherName || undefined,
        center: data.center || undefined,
        image:
          image ||
          "https://img.freepik.com/free-vector/user-blue-gradient_78370-4692.jpg",
        branch: data.branch,
        institution: data.institution,
        studentClass: data.studentClass,
      };

      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER_V1}/student`,
        payload
      );
      toast.success("Student created successfully!");
      reset();
      setImage("");
      return response.data;
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.message || "Failed to create student";
      toast.error(errorMessage);
      console.error("Create error:", error);
    }
  };

  const handleImageUpload = (url: string) => {
    setImage(url);
    setValue("image", url);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Create Student</h1>
            <p className="text-gray-600">Add a new student to the system</p>
          </div>
          <Link
            href="/dashboard"
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
          >
            Back to Dashboard
          </Link>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Branch */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" /> Branch
                </label>
                <div className="relative">
                  <Controller
                    name="branch"
                    control={control}
                    rules={{ required: "Branch is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.branch ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select branch</option>
                        {branch.map((b: any) => (
                          <option key={b._id} value={b._id}>
                            {b.name} ({b.id})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.branch && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.branch.message}
                  </p>
                )}
              </div>

              {/* Institution */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" /> Institution
                </label>
                <div className="relative">
                  <Controller
                    name="institution"
                    control={control}
                    rules={{ required: "Institution is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.institution
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                        disabled={!selectedBranch}
                      >
                        <option value="">Select institution</option>
                        {filteredInstitutions.map((inst: any) => (
                          <option key={inst._id} value={inst._id}>
                            {inst.name} ({inst.id})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.institution && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.institution.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" /> Group
                </label>
                <div className="relative">
                  <Controller
                    name="group"
                    control={control}
                    rules={{ required: "group is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.group ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select Group</option>
                        {group.map((g: any) => (
                          <option key={g._id} value={g._id}>
                            {g.name}
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.group && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.group.message}
                  </p>
                )}
              </div>

              {/* Class */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Building className="h-4 w-4 inline mr-1" /> Class
                </label>
                <div className="relative">
                  <Controller
                    name="studentClass"
                    control={control}
                    rules={{ required: "Class is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.studentClass
                            ? "border-red-500"
                            : "border-gray-300"
                        }`}
                      >
                        <option value="">Select class</option>
                        {classes.map((g: any) => (
                          <option key={g._id} value={g._id}>
                            {g.name} ({g.id})
                          </option>
                        ))}
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.studentClass && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.studentClass.message}
                  </p>
                )}
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Name
                </label>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: "Name is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.name ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter student name"
                    />
                  )}
                />
                {errors.name && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              {/* Phone Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Phone className="h-4 w-4 inline mr-1" /> Phone Number
                </label>
                <Controller
                  name="number"
                  control={control}
                  rules={{
                    required: "Phone number is required",
                    pattern: {
                      value: /^\+?[1-9]\d{1,14}$/,
                      message: "Invalid phone number format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="tel"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.number ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter phone number (e.g., +1234567890)"
                    />
                  )}
                />
                {errors.number && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.number.message}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Mail className="h-4 w-4 inline mr-1" /> Email
                </label>
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Invalid email format",
                    },
                  }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="email"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter email"
                    />
                  )}
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Gender */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Gender
                </label>
                <div className="relative">
                  <Controller
                    name="gender"
                    control={control}
                    rules={{ required: "Gender is required" }}
                    render={({ field }) => (
                      <select
                        {...field}
                        className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none ${
                          errors.gender ? "border-red-500" : "border-gray-300"
                        }`}
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                      </select>
                    )}
                  />
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                {errors.gender && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.gender.message}
                  </p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Calendar className="h-4 w-4 inline mr-1" /> Date of Birth
                </label>
                <Controller
                  name="dateOfBirth"
                  control={control}
                  rules={{ required: "Date of birth is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="date"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.dateOfBirth
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                    />
                  )}
                />
                {errors.dateOfBirth && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.dateOfBirth.message}
                  </p>
                )}
              </div>

              {/* Father's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-4 w-4 inline mr-1" /> Father&apos;s Name
                </label>
                <Controller
                  name="fatherName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.fatherName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter father's name (optional)"
                    />
                  )}
                />
                {errors.fatherName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.fatherName.message}
                  </p>
                )}
              </div>

              {/* Mother's Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <Users className="h-4 w-4 inline mr-1" /> Mother&apos;s Name
                </label>
                <Controller
                  name="motherName"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.motherName ? "border-red-500" : "border-gray-300"
                      }`}
                      placeholder="Enter mother's name (optional)"
                    />
                  )}
                />
                {errors.motherName && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.motherName.message}
                  </p>
                )}
              </div>

              {/* Center */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" /> Center (Optional)
                </label>
                <Controller
                  name="center"
                  control={control}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 border-gray-300"
                      placeholder="Enter center name"
                    />
                  )}
                />
              </div>

              {/* Present Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" /> Present Address
                </label>
                <Controller
                  name="address.present"
                  control={control}
                  rules={{ required: "Present address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address?.present
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter present address"
                    />
                  )}
                />
                {errors.address?.present && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.present.message}
                  </p>
                )}
              </div>

              {/* Permanent Address */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <MapPin className="h-4 w-4 inline mr-1" /> Permanent Address
                </label>
                <Controller
                  name="address.permanent"
                  control={control}
                  rules={{ required: "Permanent address is required" }}
                  render={({ field }) => (
                    <input
                      {...field}
                      type="text"
                      className={`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        errors.address?.permanent
                          ? "border-red-500"
                          : "border-gray-300"
                      }`}
                      placeholder="Enter permanent address"
                    />
                  )}
                />
                {errors.address?.permanent && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.permanent.message}
                  </p>
                )}
              </div>

              {/* Image Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  <User className="h-4 w-4 inline mr-1" /> Profile Image
                  (Optional)
                </label>
                <div className="flex flex-wrap gap-3">
                  {image && (
                    <div className="h-[135px]">
                      <Image
                        width={135}
                        height={135}
                        src={image}
                        alt="Student profile photo"
                        className="h-[135px] w-[135px] object-cover rounded-xl"
                      />
                    </div>
                  )}
                  <div className="flex items-center gap-4">
                    <ImageUpload onUpload={handleImageUpload} />
                  </div>
                </div>
                {errors.image && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.image.message}
                  </p>
                )}
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <Link
                href="/dashboard"
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition"
              >
                Cancel
              </Link>
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-4 py-2 rounded-md text-white flex items-center ${
                  isSubmitting ? "bg-blue-400" : "bg-blue-600 hover:bg-blue-700"
                } transition`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="animate-spin h-5 w-5 mr-2" />
                    Creating...
                  </>
                ) : (
                  "Create Student"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
