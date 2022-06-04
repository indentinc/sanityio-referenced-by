// @ts-nocheck
import Preview from 'part:@sanity/base/preview'
import { IntentLink } from 'part:@sanity/base/router'
import schema from 'part:@sanity/base/schema'
import {
  Item as DefaultItem,
  List as DefaultList,
} from 'part:@sanity/components/lists/default'
import Spinner from 'part:@sanity/components/loading/spinner'
import React from 'react'
import styles from './ReferringDocumentsList.css'

type ReferringDocumentsListProps = {
  referringDocuments?: Record<string, any>[]
  loading?: boolean
}

const ReferringDocumentsList = ({
  referringDocuments,
  loading,
}: ReferringDocumentsListProps) => {
  if (loading) {
    return (
      <Spinner
        className={styles.spinner}
        message="Loading referring documents…"
      />
    )
  }

  if (!(referringDocuments?.length > 0)) {
    return <div className={styles['no-document']}>No documents</div>
  }

  return (
    <DefaultList className={styles.root}>
      {referringDocuments.map((document) => {
        const schemaType = schema.get(document._type)
        if (!schemaType) {
          return (
            <DefaultItem key={document._id} className={styles.item}>
              <div>
                A document of the unknown type <em>{document._type}</em>
              </div>
            </DefaultItem>
          )
        }

        return (
          <IntentLink
            key={document._id}
            className={styles.link}
            intent="edit"
            params={{ id: document._id, type: document._type }}
          >
            <DefaultItem
              className={[styles.item, styles['item-active']].join(' ')}
            >
              <h5 className={styles['schema-title']}>{schemaType.title}</h5>
              <Preview value={document} type={schemaType} />
            </DefaultItem>
          </IntentLink>
        )
      })}
    </DefaultList>
  )
}

export default ReferringDocumentsList
