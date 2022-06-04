// @ts-nocheck
import { SanityDocument } from '@sanity/client'
import React from 'react'
import styles from './ReferencedByView.css'
import ReferringDocumentsList from './ReferringDocumentsList'
import useReferringDocuments from './useReferringDocuments'

export type ReferencedByViewProps = {
  document: {
    draft: SanityDocument | null
    displayed: Partial<SanityDocument>
    historical: Partial<SanityDocument> | null
    published: SanityDocument | null
  }
}

const ReferencedByView = (props: ReferencedByViewProps) => {
  let document: SanityDocument | null = null
  if (!document && props?.document?.published?._id) {
    document = props.document.published
  }
  if (!document && props?.document?.draft?._id) {
    document = props.document.draft
  }

  const referringDocuments = useReferringDocuments(document?._id)

  if (!document) return null

  return (
    <div className={styles.container}>
      <div className={styles['inner-container']}>
        <h3 className={styles.title}>
          Documents which reference this document (
          {referringDocuments?.data?.length || 0})
        </h3>{' '}
        <ReferringDocumentsList
          loading={referringDocuments?.loading}
          referringDocuments={referringDocuments?.data || []}
        />
      </div>
    </div>
  )
}

export default ReferencedByView
