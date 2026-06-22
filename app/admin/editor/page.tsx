'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2, Save, Send, X, LogOut, ListChecks } from 'lucide-react'

export default function VisualEditorPage() {
  const router = useRouter()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  
  const [pendingChanges, setPendingChanges] = useState<Record<string, any>>({})
  const [isSaving, setIsSaving] = useState(false)
  const [isPublishing, setIsPublishing] = useState(false)
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showPublishConfirm, setShowPublishConfirm] = useState(false)
  const [resultModal, setResultModal] = useState<{ show: boolean; type: 'success' | 'error'; message: string }>({ show: false, type: 'success', message: '' })
  
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
        setResultModal({ show: true, type: 'success', message: 'Draft saved successfully!' })
      } else {
        setResultModal({ show: true, type: 'error', message: 'Failed to save changes. Please ensure you are logged in.' })
      }
    } catch (err) {
      console.error(err)
      setResultModal({ show: true, type: 'error', message: 'An error occurred while saving.' })
    } finally {
      setIsSaving(false)
    }
  }

  const handlePublish = async () => {
    setShowPublishConfirm(true)
  }

  const confirmPublish = async () => {
    setShowPublishConfirm(false)
    
    setIsPublishing(true)
    try {
      const items = Object.values(pendingChanges)
      const res = await fetch('/api/editor/publish', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items }),
      })
      if (res.ok) {
        setResultModal({ show: true, type: 'success', message: 'Successfully published! Your changes are now live.' })
        setPendingChanges({})
        if (iframeRef.current && iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.postMessage({ type: 'RESET_STATE' }, window.location.origin)
        }
      } else {
        setResultModal({ show: true, type: 'error', message: 'Failed to publish. Please ensure you are logged in.' })
      }
    } catch (err) {
      console.error(err)
      setResultModal({ show: true, type: 'error', message: 'An error occurred while publishing.' })
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
      <div className="flex flex-col h-[100dvh] overflow-hidden bg-gray-50">
        {/* Editor Toolbar */}
        <div className="bg-white border-b border-gray-200 p-4 sm:px-6 sm:py-4 flex flex-col lg:flex-row lg:items-center justify-between shadow-sm z-10 shrink-0 gap-4">
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-gray-900 flex items-center gap-2 flex-wrap">
              Visual Website Editor
              <span className="text-[10px] sm:text-xs font-semibold bg-primary/10 text-primary px-2 py-0.5 rounded-full whitespace-nowrap">LIVE PREVIEW</span>
            </h1>
            <p className="text-xs sm:text-sm text-gray-500 mt-1 hidden sm:block">
              Click directly on text or images in the preview below to edit them.
            </p>
          </div>
          
          <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full lg:w-auto">
            <button 
              onClick={handleCancel}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200"
            >
              <X className="h-4 w-4 shrink-0" />
              <span className="hidden min-[400px]:inline">Cancel</span>
            </button>

            {pendingCount > 0 && (
              <button 
                onClick={() => setShowReviewModal(true)}
                className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-200"
              >
                <ListChecks className="h-4 w-4 shrink-0" />
                <span className="hidden min-[400px]:inline">Review Changes</span>
              </button>
            )}
            
            <button 
              onClick={handleSave}
              disabled={pendingCount === 0 || isSaving}
              className="flex-1 lg:flex-none flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Save className="h-4 w-4 shrink-0" />}
              <span className="hidden min-[400px]:inline">Save</span>
              <span className="hidden sm:inline"> Draft</span>
              {pendingCount > 0 && (
                <span className="ml-1 bg-white/20 text-white text-[10px] sm:text-xs font-bold px-1.5 py-0.5 rounded">
                  {pendingCount}
                </span>
              )}
            </button>
            
            <button 
              onClick={handlePublish}
              disabled={isPublishing}
              className="flex-1 lg:flex-none flex items-center justify-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-green-600 border border-transparent rounded-lg hover:bg-green-700 transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPublishing ? <Loader2 className="h-4 w-4 animate-spin shrink-0" /> : <Send className="h-4 w-4 shrink-0" />}
              Publish
            </button>

            <div className="h-8 w-px bg-gray-300 mx-1 hidden lg:block"></div>

            <button 
              onClick={handleLogout}
              className="flex items-center justify-center p-2.5 sm:px-3 sm:py-2.5 text-sm font-medium text-gray-600 hover:text-red-600 bg-gray-100 hover:bg-red-50 lg:bg-transparent lg:hover:bg-transparent transition-colors rounded-lg lg:rounded-none shrink-0"
              title="Log Out"
            >
              <LogOut className="h-4 w-4" />
              <span className="sr-only">Log out</span>
            </button>
          </div>
        </div>

        {/* Main Iframe Area */}
        <div className="flex-1 bg-gray-100 p-2 sm:p-4 overflow-hidden relative">
          <div className="w-full h-full bg-white rounded-lg sm:rounded-xl shadow-inner border border-gray-200 overflow-hidden relative">
            <iframe 
              ref={iframeRef}
              src="/?edit=true" 
              className="w-full h-full border-0"
              title="Website Preview"
            />
            
            {(isSaving || isPublishing) && (
              <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center z-20">
                <Loader2 className="h-8 w-8 sm:h-10 sm:w-10 text-primary animate-spin mb-4" />
                <p className="text-base sm:text-lg font-medium text-gray-900">
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

      {/* Review Changes Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-gray-900/50 backdrop-blur-sm p-4 animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-xl flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between bg-gray-50/50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 text-blue-600 rounded-lg">
                  <ListChecks className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-gray-900">Pending Changes</h3>
                  <p className="text-sm text-gray-500">You have {pendingCount} unsaved change{pendingCount === 1 ? '' : 's'}</p>
                </div>
              </div>
              <button 
                onClick={() => setShowReviewModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto flex-1">
              <div className="space-y-4">
                {Object.values(pendingChanges).map((change: any, i) => (
                  <div key={i} className="flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-gray-100 bg-gray-50/50">
                    <div className="sm:w-1/3 shrink-0">
                      <div className="text-xs font-semibold text-primary uppercase tracking-wider mb-1">{change.page} Page</div>
                      <div className="text-sm font-medium text-gray-900 capitalize">{change.section} Section</div>
                      <div className="text-xs text-gray-500 mt-0.5 font-mono bg-gray-200/50 inline-block px-1.5 py-0.5 rounded">{change.field_key}</div>
                    </div>
                    <div className="sm:w-2/3 border-t sm:border-t-0 sm:border-l border-gray-200 pt-3 sm:pt-0 sm:pl-4">
                      {change.content_type === 'image' ? (
                        <div className="flex items-center gap-3">
                          <img src={change.content_value} alt="New" className="h-16 w-16 object-cover rounded border border-gray-200 bg-white" />
                          <span className="text-sm text-gray-500 italic">Image Updated</span>
                        </div>
                      ) : (
                        <div>
                          <div className="text-xs text-gray-500 mb-1">New Value:</div>
                          <div className="text-sm text-gray-900 bg-white p-2 rounded border border-gray-100 break-words whitespace-pre-wrap">
                            {change.content_value || <span className="text-gray-400 italic">Empty</span>}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="px-6 py-4 border-t border-gray-100 bg-gray-50/80 flex items-center justify-end gap-3 shrink-0">
              <button
                onClick={() => setShowReviewModal(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-gray-700 bg-white border border-gray-300 hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
              <button
                onClick={() => {
                  setShowReviewModal(false)
                  handleSave()
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 transition-colors shadow-sm"
              >
                Save Draft
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Publish Confirmation Modal */}
      {showPublishConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setShowPublishConfirm(false)} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
            <div className="p-6 text-center sm:text-left">
              <div className="mx-auto sm:mx-0 flex h-12 w-12 items-center justify-center rounded-full bg-green-100 mb-4">
                <Send className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-bold text-gray-900 mb-2">Publish Changes?</h3>
              <p className="text-sm text-gray-500">
                Are you sure you want to publish your changes? This will push these specific edits to the live website.
              </p>
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:items-center sm:justify-end gap-2 border-t border-gray-100 bg-gray-50 px-6 py-4">
              <button
                onClick={() => setShowPublishConfirm(false)}
                className="w-full sm:w-auto rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-colors shadow-sm"
              >
                Cancel
              </button>
              <button
                onClick={confirmPublish}
                className="w-full sm:w-auto rounded-lg bg-green-600 px-4 py-2 text-sm font-semibold text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors shadow-sm"
              >
                Yes, Publish
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal (Success / Error) */}
      {resultModal.show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setResultModal(prev => ({ ...prev, show: false }))} />
          <div className="relative w-full max-w-sm overflow-hidden rounded-2xl bg-white shadow-2xl animate-in fade-in zoom-in-95 duration-200 border border-gray-200">
            <div className="p-6 text-center">
              <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full mb-4 ${
                resultModal.type === 'success' ? 'bg-green-100' : 'bg-red-100'
              }`}>
                {resultModal.type === 'success' ? (
                  <svg className="h-7 w-7 text-green-600" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" /></svg>
                ) : (
                  <X className="h-7 w-7 text-red-600" />
                )}
              </div>
              <h3 className={`text-lg font-bold mb-2 ${
                resultModal.type === 'success' ? 'text-green-800' : 'text-red-800'
              }`}>
                {resultModal.type === 'success' ? 'Success!' : 'Error'}
              </h3>
              <p className="text-sm text-gray-500">{resultModal.message}</p>
            </div>
            <div className="border-t border-gray-100 bg-gray-50 px-6 py-4 flex justify-center">
              <button
                onClick={() => setResultModal(prev => ({ ...prev, show: false }))}
                className={`w-full sm:w-auto rounded-lg px-6 py-2 text-sm font-semibold text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors shadow-sm ${
                  resultModal.type === 'success'
                    ? 'bg-green-600 hover:bg-green-700 focus:ring-green-500'
                    : 'bg-red-600 hover:bg-red-700 focus:ring-red-500'
                }`}
              >
                OK
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
