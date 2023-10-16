import axiosInstance from "@/_services/axiosInstance"
import { Category } from "@/types/dto";
import { NextResponse } from "next/server";

export async function GET() {
    const response = await axiosInstance.get('/Category/categories')
    const data: Category[] = await response.data;
   
    return NextResponse.json({data})
  }