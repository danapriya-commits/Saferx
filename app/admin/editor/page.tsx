'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Send, X, LogOut } from 'lucide-react'

export default function VisualEditorPage() {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  
  const pendingCount = Object.keys(pendingChanges).length

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // Security: Only accept messages from the same origin
      if (event.origin !== window.location.origin) return;

      if (event.data && event.data.type === 'CONTENT_UPDATED') {
        const { page, section, fieldKey, value, contentType } = event.data.payload
        const key = `${section}.${fieldKey}`
        
        setPendingChanges(prev => ({
          ...prev,
          [key]: {
            page: page,
            section: section,
            field_key: fieldKey,
            content_value: value,
            content_type: contentType || 'text'
          }
        }))
      }
    }

    window.addEventListener('message', handleMessage)
    return () => window.removeEventListener('message', handleMessage)
  }, [])

  const handleSave = async () => {
    if (pendingCount === 0) return
    setIsSaving(true)
    
    try {
      const items = Object.values(pendingChanges)
      const res = await fetch('/api/editor/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      
      if (res.ok) {
        setPendingChanges({})
      } else {
        alert('Failed to save changes. Please ensure you are logged in.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while saving.')
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    if (pendingCount === 0) return
    if (!confirm('Are you sure you want to publish your changes? This will push these specific edits to the live website.')) return
    
    setIsPublishing(true)
    try {
      const items = Object.values(pendingChanges)
      const res = await fetch('/api/editor/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (res.ok) {
        alert('Successfully published!')
        setPendingChanges({})
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage({ type: 'RESET_STATE' }, window.location.origin)
        }
      } else {
        alert('Failed to publish. Please ensure you are logged in.')
      }
    } catch (err) {
      console.error(err)
      alert('An error occurred while publishing.')
    } finally {
      setIsPublishing(false)
    }
  }

  const [showCancelConfirm, setShowCancelConfirm] = useState(false)

  const handleCancel = () => {
    if (pendingCount > 0) {
      setShowCancelConfirm(true)
      return
    }
    confirmCancel()
  }

  const confirmCancel = () => {
    setShowCancelConfirm(false)
    setPendingChanges({})
    if (iframeRef.current && iframeRef.current.contentWindow) {
      iframeRef.current.contentWindow.postMessage({ type: 'RESET_STATE' }, window.location.origin)
    }
  }

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' })
      router.push('/admin')
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <div className="flex flex-col h-screen overflow-hidden bg-gray-50">
        {/* Editor Toolbar */}
        <div className="bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm z-10 shrink-0">
          <div>
            <h1 className="text-xl font-bold text-gray-900 flex items-center gap-2">
              Visual Website Editor
              <span className="text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full">LIVE PREVIEW</span>
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Click directly on text or images in the preview below to edit them.
            </p>
          </div>
          
          <div className="flex items-center gap-4">
            <button 
              onClick={handleCancel}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              <X className="h-4 w-4" />
              Cancel
            </button>
            
            <button 
              onClick={handleSave}
              disabled={pendingCount === 0 || isSaving}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
              Save Draft
              {pendingCount > 0 && (
                <span className="ml-1 bg-white/20 text-white text-xs font-bold px-1.5 py-0.5 rounded">
                  {pendingCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={handlePublish}
              disabled={isPublishing || pendingCount === 0}
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              Publish
            </button>

            <div className="h-8 w-px bg-gray-300 mx-1"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-red-600 transition-colors"
              title="Log Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>

        {/* Main Iframe Area */}
        <div className="flex-1 bg-gray-100 p-4 overflow-hidden relative">
          <div className="w-full h-full bg-white rounded-xl shadow-inner border border-gray-200 overflow-hidden relative">
            <iframe 
              ref={iframeRef}
              src="/?edit=true" 
              className="w-full h-full border-0"
              title="Website Preview"
            />
            
            {(isSaving || isPublishing) && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                <p className="text-lg font-medium text-gray-900">
                  {isSaving ? 'Saving drafts...' : 'Publishing to live site...'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Custom Confirmation Dialog for Canceling Changes */}
      {showCancelConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowCancelConfirm(false)} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
            <div className="p-6 text-center sm:text-left">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Are you sure you want to cancel the changes?</h3>
              <p className="text-sm text-gray-500">
                Any modifications you made will be permanently lost.
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowCancelConfirm(false)}
                className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmCancel}
                className="w-full sm:w-auto rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-colors shadow-sm"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
