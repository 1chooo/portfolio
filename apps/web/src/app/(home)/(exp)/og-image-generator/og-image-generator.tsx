"use client";

import type React from "react";

import { useState } from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@1chooo/ui/components/card";
import { Input } from "@1chooo/ui/components/input";
import { Label } from "@1chooo/ui/components/label";
import { Textarea } from "@1chooo/ui/components/textarea";
import { Button } from "@1chooo/ui/components/button";
import { Badge } from "@1chooo/ui/components/badge";
import { Upload, Download, Eye } from "lucide-react";
import Image from "next/image";

export default function OGImageGenerator() {
  const [formData, setFormData] = useState({
    domain: "1chooo.com",
    fullName: "Chun-Ho (Hugo) Lin",
    description:
      "I'm Chun-Ho (Hugo) Lin, a student at University of Southern California (USC) 🎓. Previously, I obtained my Bachelor's degree from National Central University (NCU) 🎓.",
    coverImage: "/images/opengraph-image.png",
  });

  const [previewMode, setPreviewMode] = useState(false);

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFormData((prev) => ({
          ...prev,
          coverImage: e.target?.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const generateOGImage = () => {
    // In a real implementation, this would call an API to generate the OG image
    console.log("Generating OG image with:", formData);
    alert("OG Image generation would be implemented here!");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">
            Open Graph Image Generator
          </h1>
          <p className="text-slate-600">
            Customize your domain, name, description, and cover image to
            generate the perfect OG image
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form Section */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Customize Your OG Image
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="domain">Domain</Label>
                <Input
                  id="domain"
                  value={formData.domain}
                  onChange={(e) => handleInputChange("domain", e.target.value)}
                  placeholder="your-domain.com"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  value={formData.fullName}
                  onChange={(e) =>
                    handleInputChange("fullName", e.target.value)
                  }
                  placeholder="Your Full Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) =>
                    handleInputChange("description", e.target.value)
                  }
                  placeholder="Tell people about yourself..."
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="coverImage">Cover Image</Label>
                <div className="flex items-center gap-4">
                  <Input
                    id="coverImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="flex-1"
                  />
                  {formData.coverImage && (
                    <div className="w-16 h-16 rounded-lg overflow-hidden border">
                      <Image
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Cover preview"
                        width={64}
                        height={64}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  onClick={() => setPreviewMode(!previewMode)}
                  variant="outline"
                  className="flex-1"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {previewMode ? "Edit Mode" : "Preview"}
                </Button>
                <Button onClick={generateOGImage} className="flex-1">
                  <Download className="w-4 h-4 mr-2" />
                  Generate OG Image
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview</CardTitle>
              <p className="text-sm text-slate-600">
                This is how your Open Graph image will appear when shared on
                social media
              </p>
            </CardHeader>
            <CardContent>
              <div className="relative bg-gradient-to-br from-slate-800 to-slate-900 rounded-lg overflow-hidden aspect-[1.91/1] p-8 text-white">
                {/* Domain Badge */}
                <div className="absolute top-6 left-1/2 transform -translate-x-1/2">
                  <Badge
                    variant="secondary"
                    className="bg-slate-700/50 text-slate-200 px-4 py-1"
                  >
                    {formData.domain}
                  </Badge>
                </div>

                {/* Main Content */}
                <div className="flex flex-col items-center justify-center h-full text-center space-y-4">
                  <h1 className="text-3xl lg:text-4xl font-bold leading-tight">
                    {formData.fullName}
                  </h1>

                  <p className="text-slate-300 text-sm lg:text-base max-w-2xl leading-relaxed px-4">
                    {formData.description}
                  </p>
                </div>

                {/* Cover Image Overlay */}
                {formData.coverImage && (
                  <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2">
                    <div className="relative">
                      <Image
                        src={formData.coverImage || "/placeholder.svg"}
                        alt="Cover"
                        width={300}
                        height={150}
                        className="rounded-lg opacity-20 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 to-transparent rounded-lg" />
                      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-yellow-400 font-bold text-xl">
                        {formData.domain}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Meta Information */}
              <div className="mt-4 p-4 bg-slate-50 rounded-lg">
                <div className="text-sm space-y-1">
                  <div className="font-medium text-slate-900">
                    Dimensions: 1200 × 630px
                  </div>
                  <div className="text-slate-600">
                    Optimized for Facebook, Twitter, LinkedIn, and other social
                    platforms
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Implementation Guide */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>Implementation Guide</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Next.js Implementation</h3>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm">
                  <pre>{`// app/opengraph-image.tsx
import { ImageResponse } from 'next/og'

export default async function Image() {
  return new ImageResponse(
    (
      <div style={{
        background: 'linear-gradient(135deg, #1e293b, #0f172a)',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        fontFamily: 'system-ui',
      }}>
        <div style={{ 
          background: '#475569',
          padding: '8px 16px',
          borderRadius: '20px',
          marginBottom: '40px'
        }}>
          ${formData.domain}
        </div>
        <h1 style={{ 
          fontSize: '48px',
          fontWeight: 'bold',
          textAlign: 'center',
          margin: '0 0 20px 0'
        }}>
          ${formData.fullName}
        </h1>
        <p style={{
          fontSize: '18px',
          textAlign: 'center',
          maxWidth: '800px',
          color: '#cbd5e1',
          lineHeight: 1.4
        }}>
          ${formData.description}
        </p>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  )
}`}</pre>
                </div>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Metadata Configuration</h3>
                <div className="bg-slate-900 text-slate-100 p-4 rounded-lg text-sm">
                  <pre>{`// app/layout.tsx or app/page.tsx
export const metadata = {
  title: '${formData.fullName}',
  description: '${formData.description.slice(0, 100)}...',
  openGraph: {
    title: '${formData.fullName}',
    description: '${formData.description.slice(0, 100)}...',
    url: 'https://${formData.domain}',
    siteName: '${formData.domain}',
    images: [
      {
        url: '/opengraph-image',
        width: 1200,
        height: 630,
        alt: '${formData.fullName}',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
}`}</pre>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
