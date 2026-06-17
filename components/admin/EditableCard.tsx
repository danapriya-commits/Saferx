'use client'

import React, { useState } from 'react'
import { useContent } from './ContentProvider'
import { EditableCardModal, CardField } from './EditableCardModal'

interface EditableCardProps {
  section: string
  cardId: string
  fields: CardField[]
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  [key: string]: any
}

export function EditableCard({
  section,
  cardId,
  fields,
  children,
  className = '',
  as: Component = 'div',
  ...props
}: EditableCardProps) {
  const { isEditing } = useContent()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (!isEditing) {
    return <Component className={className} {...props}>{children}</Component>
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setIsModalOpen(true)
  }

  return (
    <>
      <Component
        className={`relative cursor-pointer hover:outline hover:outline-2 hover:outline-blue-500 hover:outline-dashed transition-all outline-offset-4 focus:outline-blue-600 focus:bg-blue-50/10 focus:outline-solid ${className}`}
        onClick={handleClick}
        title="Click to edit card"
        {...props}
      >
        {children}
      </Component>

      {isModalOpen && (
        <EditableCardModal
          section={section}
          cardId={cardId}
          fields={fields}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  )
}
