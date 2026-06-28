'use client'

import { motion } from 'framer-motion'
import { Mic, Sparkles, Copy, RefreshCw } from 'lucide-react'
import { useState } from 'react'

export default function AIToolsPage() {
  const [selectedTool, setSelectedTool] = useState<'voice' | 'social'>('voice')
  const [voiceTranscript, setVoiceTranscript] = useState('')
  const [generatedContent, setGeneratedContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleVoiceToText = async () => {
    setLoading(true)
    // Simulate voice processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    setVoiceTranscript(
      'I was recently in Dubai exploring the luxury beauty market. The demand for premium skincare is incredible there. I met with several distributors interested in our Bilas Beauty line. The market opportunity is substantial, especially for personalized treatments.'
    )
    setLoading(false)
  }

  const handleGenerateFromVoice = async () => {
    if (!voiceTranscript) return
    setLoading(true)
    // Simulate AI generation
    await new Promise(resolve => setTimeout(resolve, 2000))
    setGeneratedContent(
      `# Exploring Luxury Beauty Markets in Dubai

During my recent trip to Dubai, I discovered fascinating opportunities in the premium beauty sector that I&apos;m excited to share with you.

## The Dubai Beauty Landscape

Dubai&apos;s luxury beauty market is thriving with an increasingly sophisticated clientele seeking personalized and premium treatments. The demand for high-end skincare products and experiences has grown significantly, creating unique opportunities for innovative beauty entrepreneurs.

## Market Insights

My conversations with local distributors revealed strong interest in curated beauty collections that combine quality with exclusivity. Bilas Beauty&apos;s carefully selected products and Bilas Studio&apos;s personalized approach align perfectly with Dubai&apos;s luxury market expectations.

## Strategic Opportunities

The market opportunity is substantial, particularly for:
- Personalized beauty treatments tailored to regional preferences
- Premium product distribution networks
- Wellness-focused beauty experiences

This experience reinforces the value of global exploration in understanding emerging markets and building strategic partnerships.`
    )
    setLoading(false)
  }

  const handleGenerateSocialContent = async () => {
    if (!voiceTranscript) return
    setLoading(true)
    // Simulate social content generation
    await new Promise(resolve => setTimeout(resolve, 1800))
    setGeneratedContent(
      `🌟 Dubai is calling! Exploring the incredible luxury beauty market and discovering remarkable opportunities for partnerships. The demand for premium, personalized experiences is soaring. 

Excited to introduce Bilas Beauty to new markets that truly appreciate quality and craftsmanship. This is just the beginning of something beautiful.

#LuxuryBeauty #DubaiMarket #GlobalTrade #BeautyEntrepreneur #BialsBeauty`
    )
    setLoading(false)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
        <h2 className="text-3xl font-serif font-bold text-foreground mb-2 flex items-center gap-3">
          <Sparkles size={28} className="text-accent" />
          AI Tools
        </h2>
        <p className="text-muted-foreground">
          Generate content using AI. Powered by intelligent content creation.
        </p>
      </motion.div>

      {/* Tool Selector */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-4 mb-8"
      >
        <button
          onClick={() => setSelectedTool('voice')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
            selectedTool === 'voice'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card border border-border text-foreground hover:border-accent/50'
          }`}
        >
          <Mic size={20} />
          Voice to Blog
        </button>
        <button
          onClick={() => setSelectedTool('social')}
          className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition ${
            selectedTool === 'social'
              ? 'bg-accent text-accent-foreground'
              : 'bg-card border border-border text-foreground hover:border-accent/50'
          }`}
        >
          <Sparkles size={20} />
          Social Media
        </button>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Input Panel */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">
            {selectedTool === 'voice' ? 'Voice Recording' : 'Your Notes'}
          </h3>

          {/* Voice/Text Input */}
          <div className="mb-6">
            {selectedTool === 'voice' ? (
              <>
                <div className="min-h-32 bg-secondary border border-border rounded-lg p-4 mb-4">
                  <p className={voiceTranscript ? 'text-foreground' : 'text-muted-foreground'}>
                    {voiceTranscript || 'Your voice transcription will appear here...'}
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleVoiceToText}
                  disabled={loading}
                  className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Mic size={20} />
                      Record Voice Note
                    </>
                  )}
                </motion.button>
              </>
            ) : (
              <>
                <textarea
                  value={voiceTranscript}
                  onChange={e => setVoiceTranscript(e.target.value)}
                  placeholder="Paste your notes or ideas here..."
                  rows={6}
                  className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent transition resize-none"
                />
              </>
            )}
          </div>

          {/* Info */}
          <div className="p-4 bg-secondary/50 border border-border rounded-lg">
            <p className="text-xs text-muted-foreground">
              {selectedTool === 'voice'
                ? 'Click the button above to simulate recording a voice note. In production, this would use real speech-to-text.'
                : 'Enter your notes or ideas. AI will help transform them into polished content.'}
            </p>
          </div>
        </motion.div>

        {/* Output Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card border border-border rounded-lg p-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">
            {selectedTool === 'voice' ? 'Generated Article' : 'Social Media Post'}
          </h3>

          {/* Generated Content */}
          <div className="min-h-96 bg-secondary border border-border rounded-lg p-4 mb-4 overflow-auto max-h-96">
            <p
              className={generatedContent ? 'text-foreground text-sm leading-relaxed whitespace-pre-wrap' : 'text-muted-foreground'}
            >
              {generatedContent || 'Generated content will appear here...'}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={
                selectedTool === 'voice' ? handleGenerateFromVoice : handleGenerateSocialContent
              }
              disabled={!voiceTranscript || loading}
              className="flex-1 flex items-center justify-center gap-2 bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 border-2 border-accent-foreground border-t-transparent rounded-full animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Generate
                </>
              )}
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                navigator.clipboard.writeText(generatedContent)
                alert('Copied to clipboard!')
              }}
              disabled={!generatedContent}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-lg font-medium transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy size={20} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => {
                setGeneratedContent('')
                setVoiceTranscript('')
              }}
              className="flex items-center gap-2 bg-secondary hover:bg-secondary/80 text-foreground px-4 py-3 rounded-lg font-medium transition"
            >
              <RefreshCw size={20} />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
