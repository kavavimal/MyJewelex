import React from "react";
import PatternForm from "./components/PatternForm";
import prisma from "@/lib/prisma";

const getPatterns = () => prisma.pattern.findMany();

const patterns = async () => {
  const patterns = await getPatterns();
  return <PatternForm patterns={patterns} />;
};

export default patterns;
