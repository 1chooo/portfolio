"use client";

import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

import PageTitle from "@/components/page-title";
import config from "@/config";
import { Home, ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: `Not Found | ${config.title}`,
};

function NotFound() {
  return (
    <article>
      <PageTitle title="Page Not Found!" />

      <div className="flex flex-col items-center justify-center px-4 py-12">
        <div className="w-full max-w-3xl mx-auto text-center">
          <div className="relative w-64 h-64 mx-auto mb-6">
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-9xl font-bold text-light-gray">404</span>
            </div>
          </div>
          <h2 className="text-xl text-gray-500 dark:text-gray-400">
            Oops! The page you&apos;re looking for seems to have wandered off.
          </h2>
        </div>

        <div className="flex flex-col gap-6 mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-lg mx-auto w-full">
            <div className="flex items-center justify-center">
              <Link
                href="/"
                className="flex items-center border-none px-4 py-2 mx-1 cursor-pointer text-base bg-border-gradient-onyx hover:scale-105 active:scale-95 rounded-xl shadow-lg hover:bg-orange-yellow-crayola-dark duration-300 text-white-2 font-bold"
              >
                <Home className="mr-2 h-4 w-4" />
                <span>Return Home</span>
              </Link>
            </div>
            <div className="flex items-center justify-center">
              <button
                type="button"
                onClick={() => window.history.back()}
                className="flex items-center border-none px-4 py-2 mx-1 cursor-pointer text-base bg-border-gradient-onyx hover:scale-105 active:scale-95 rounded-xl shadow-lg hover:bg-orange-yellow-crayola-dark duration-300 text-orange-yellow-crayola font-bold"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                <span>Go Back</span>
              </button>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-gray-800 text-sm text-gray-500">
          <p>
            Still having trouble?{" "}
            <Link
              href="mailto:hugo@1chooo.com"
              className="text-primary underline underline-offset-2"
            >
              Contact me
            </Link>{" "}
            and I&apos;ll help you find what you&apos;re looking for.
          </p>
        </div>
      </div>
    </article>
  );
}

export default NotFound;
