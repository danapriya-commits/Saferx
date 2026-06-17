'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type ContentMap = Record<string, Record<string, string>>

interface ContentContextType {
  content: ContentMap
  isEditing: boolean
  updateContent: (section: string, fieldKey: string, value: string, contentType?: string) => void
}

const ContentContext = createContext<ContentContextType>({
  content: {},
  isEditing: false,
  updateContent: () => {},
})

export function useContent() {
  return useContext(ContentContext)
}

export function ContentProvider({
  children,
  initialContent,
}: {
  children: React.ReactNode
  initialContent: ContentMap
}) {
  const [content, setContent] = useState<ContentMap>(initialContent || {})
  const [isEditing, setIsEditing] = useState(false)

  useEffect(() => {
    // Check if in edit mode
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      const isEditParam = urlParams.get('edit') === 'true'
      
      let shouldEdit = isEditParam
      
      // Persist in sessionStorage so navigation inside the iframe keeps edit mode
      if (isEditParam) {
        sessionStorage.setItem('saferx_is_editing', 'true')
      } else if (sessionStorage.getItem('saferx_is_editing') === 'true') {
        if (window.parent !== window) {
           shouldEdit = true
        } else {
           sessionStorage.removeItem('saferx_is_editing')
        }
      }

      const fetchDrafts = () => {
        fetch('/api/editor/content?status=draft')
          .then(res => res.json())
          .then(data => {
            if (data && Object.keys(data).length > 0) {
              setContent(data)
            } else {
              setContent(initialContent || {})
            }
          })
          .catch(err => console.error('Failed to fetch draft content:', err))
      }

      if (shouldEdit) {
        setIsEditing(true)
        fetchDrafts()
      } else {
        if (Object.keys(initialContent || {}).length === 0) {
          fetch('/api/editor/content?status=published')
            .then(res => res.json())
            .then(data => {
              if (data && Object.keys(data).length > 0) {
                setContent(data)
              }
            })
            .catch(err => console.error('Failed to fetch published content:', err))
        }
      }

      // Listen for RESET_STATE to avoid hard iframe reloads
      const handleMessage = (event: MessageEvent) => {
        if (event.data?.type === 'RESET_STATE') {
          if (shouldEdit) {
            fetchDrafts()
          } else {
            setContent(initialContent || {})
          }
        }
      }
      window.addEventListener('message', handleMessage)
      return () => window.removeEventListener('message', handleMessage)
    }
  }, [initialContent])

  const updateContent = (section: string, fieldKey: string, value: string, contentType = 'text') => {
    setContent((prev) => ({
      ...prev,
      [section]: {
        ...(prev[section] || {}),
        [fieldKey]: value,
      },
    }))

    // Notify parent window
    if (typeof window !== 'undefined' && window.parent !== window) {
      // We are in an iframe
      window.parent.postMessage({
        type: 'CONTENT_UPDATED',
        payload: {
          page: 'home', // or dynamic based on path
          section,
          fieldKey,
          value,
          contentType,
        }
      }, '*')
    }
  }

  return (
    <ContentContext.Provider value={{ content, isEditing, updateContent }}>
      {children}
    </ContentContext.Provider>
  )
}
