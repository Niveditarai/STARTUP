"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { 
  FileText, 
  Upload,
  CheckCircle,
  AlertTriangle,
  XCircle,
  Download,
  Sparkles,
  Target,
  Award,
  TrendingUp,
  ChevronRight
} from "lucide-react"
import { GlassCard, NeonButton, GradientText, ProgressRing } from "@/components/zentrix/ui-components"
import { Sidebar, TopNav } from "@/components/zentrix/navigation"

const analysisResults = {
  atsScore: 78,
  sections: [
    { name: "Contact Information", status: "good", feedback: "Complete and properly formatted" },
    { name: "Professional Summary", status: "warning", feedback: "Consider adding more keywords" },
    { name: "Work Experience", status: "good", feedback: "Well structured with metrics" },
    { name: "Skills Section", status: "warning", feedback: "Add more technical skills" },
    { name: "Education", status: "good", feedback: "Properly formatted" },
    { name: "Projects", status: "error", feedback: "Missing or incomplete" },
  ],
  keywords: {
    found: ["JavaScript", "React", "Node.js", "TypeScript", "Git"],
    missing: ["AWS", "Docker", "CI/CD", "System Design", "Agile"],
  },
  suggestions: [
    "Add a dedicated Projects section with 2-3 relevant projects",
    "Include metrics and quantifiable achievements in work experience",
    "Add missing keywords: AWS, Docker, CI/CD",
    "Consider adding certifications if available",
    "Optimize formatting for better ATS parsing",
  ]
}

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = e.target.files?.[0]
    if (uploadedFile) {
      setFile(uploadedFile)
    }
  }

  const analyzeResume = async () => {
    setIsAnalyzing(true)
    // Simulate analysis
    await new Promise(resolve => setTimeout(resolve, 2000))
    setIsAnalyzing(false)
    setShowResults(true)
  }

  return (
    <div className="min-h-screen gradient-bg">
      <Sidebar currentPath="/resume" />
      <div className="ml-64 transition-all duration-300">
        <TopNav userName="Alex" />
        
        <main className="p-6">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold mb-2">Resume <GradientText>Analyzer</GradientText></h1>
                <p className="text-muted-foreground">Get AI-powered insights to improve your resume</p>
              </div>
            </div>

            {!showResults ? (
              <>
                {/* Upload Section */}
                <GlassCard glowColor="cyan" hover={false}>
                  <div className="text-center py-12">
                    <input
                      type="file"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      className="hidden"
                    />
                    <label
                      htmlFor="resume-upload"
                      className={`block border-2 border-dashed rounded-xl p-12 cursor-pointer transition-all ${
                        file ? "border-primary bg-primary/5" : "border-border hover:border-primary/50 hover:bg-muted/30"
                      }`}
                    >
                      {file ? (
                        <div>
                          <div className="w-16 h-16 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                            <FileText className="w-8 h-8 text-primary" />
                          </div>
                          <p className="font-semibold mb-1">{file.name}</p>
                          <p className="text-sm text-muted-foreground">{(file.size / 1024).toFixed(1)} KB</p>
                        </div>
                      ) : (
                        <div>
                          <div className="w-16 h-16 rounded-xl bg-muted/50 flex items-center justify-center mx-auto mb-4">
                            <Upload className="w-8 h-8 text-muted-foreground" />
                          </div>
                          <p className="font-semibold mb-1">Upload your resume</p>
                          <p className="text-sm text-muted-foreground">PDF, DOC, or DOCX (max 5MB)</p>
                        </div>
                      )}
                    </label>

                    {file && (
                      <div className="mt-6">
                        <NeonButton 
                          variant="cyan" 
                          className="flex items-center gap-2 mx-auto"
                          onClick={analyzeResume}
                          disabled={isAnalyzing}
                        >
                          {isAnalyzing ? (
                            <>
                              <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                              Analyzing...
                            </>
                          ) : (
                            <>
                              <Sparkles className="w-5 h-5" />
                              Analyze Resume
                            </>
                          )}
                        </NeonButton>
                      </div>
                    )}
                  </div>
                </GlassCard>

                {/* How it Works */}
                <GlassCard glowColor="purple" hover={false}>
                  <h3 className="text-lg font-semibold mb-6">How it Works</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mx-auto mb-4">
                        <Upload className="w-6 h-6 text-primary" />
                      </div>
                      <h4 className="font-semibold mb-2">1. Upload</h4>
                      <p className="text-sm text-muted-foreground">Upload your resume in PDF or DOC format</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                        <Sparkles className="w-6 h-6 text-secondary" />
                      </div>
                      <h4 className="font-semibold mb-2">2. AI Analysis</h4>
                      <p className="text-sm text-muted-foreground">Our AI analyzes your resume for ATS compatibility</p>
                    </div>
                    <div className="text-center">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <TrendingUp className="w-6 h-6 text-emerald-400" />
                      </div>
                      <h4 className="font-semibold mb-2">3. Improve</h4>
                      <p className="text-sm text-muted-foreground">Get actionable suggestions to improve your resume</p>
                    </div>
                  </div>
                </GlassCard>
              </>
            ) : (
              <>
                {/* Results */}
                <div className="grid lg:grid-cols-3 gap-6">
                  {/* Main Score */}
                  <GlassCard glowColor="cyan" hover={false} className="lg:col-span-1">
                    <div className="text-center">
                      <h3 className="text-lg font-semibold mb-6">ATS Score</h3>
                      <ProgressRing 
                        progress={analysisResults.atsScore} 
                        size={180} 
                        strokeWidth={12}
                        color={analysisResults.atsScore >= 80 ? "cyan" : "purple"}
                      />
                      <p className="mt-4 text-muted-foreground">
                        {analysisResults.atsScore >= 80 ? "Great score!" : 
                         analysisResults.atsScore >= 60 ? "Good, but can improve" : 
                         "Needs improvement"}
                      </p>
                      <div className="mt-6 space-y-2">
                        <button className="w-full py-2 rounded-lg border border-border hover:bg-muted/50 transition-colors flex items-center justify-center gap-2">
                          <Download className="w-4 h-4" />
                          Download Report
                        </button>
                        <button 
                          onClick={() => { setShowResults(false); setFile(null); }}
                          className="w-full py-2 rounded-lg border border-primary text-primary hover:bg-primary/10 transition-colors"
                        >
                          Analyze Another
                        </button>
                      </div>
                    </div>
                  </GlassCard>

                  {/* Section Analysis */}
                  <GlassCard glowColor="purple" hover={false} className="lg:col-span-2">
                    <h3 className="text-lg font-semibold mb-4">Section Analysis</h3>
                    <div className="space-y-4">
                      {analysisResults.sections.map((section) => (
                        <div key={section.name} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30">
                          {section.status === "good" ? (
                            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
                          ) : section.status === "warning" ? (
                            <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0" />
                          ) : (
                            <XCircle className="w-5 h-5 text-red-400 shrink-0" />
                          )}
                          <div className="flex-1">
                            <p className="font-medium">{section.name}</p>
                            <p className="text-sm text-muted-foreground">{section.feedback}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Keywords */}
                <div className="grid lg:grid-cols-2 gap-6">
                  <GlassCard glowColor="cyan" hover={false}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <CheckCircle className="w-5 h-5 text-emerald-400" />
                      Keywords Found
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.keywords.found.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </GlassCard>

                  <GlassCard glowColor="purple" hover={false}>
                    <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                      <AlertTriangle className="w-5 h-5 text-amber-400" />
                      Missing Keywords
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {analysisResults.keywords.missing.map((keyword) => (
                        <span key={keyword} className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>

                {/* Suggestions */}
                <GlassCard glowColor="cyan" hover={false}>
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-primary" />
                    AI Suggestions
                  </h3>
                  <div className="space-y-3">
                    {analysisResults.suggestions.map((suggestion, idx) => (
                      <div key={idx} className="flex items-start gap-3 p-3 rounded-lg bg-muted/30">
                        <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center shrink-0 mt-0.5">
                          <span className="text-xs font-bold text-primary">{idx + 1}</span>
                        </div>
                        <p className="text-sm">{suggestion}</p>
                      </div>
                    ))}
                  </div>
                </GlassCard>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
