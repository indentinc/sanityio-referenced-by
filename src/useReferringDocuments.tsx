// @ts-nocheck
import documentStore from 'part:@sanity/base/datastore/document'
import { useEffect, useState } from 'react'

const useReferringDocuments = (documentId: string | undefined) => {
  const [state, setState] = useState({
    data: [],
    loading: true,
  })

  useEffect(() => {
    if (!documentId) return
    const query = documentStore.listenQuery(
      '*[references($documentId)]',
      { documentId },
      { tag: 'use-referring-documents' }
    )
    const observable = query.subscribe((d) => {
      setState((c) => ({ ...c, data: d, loading: false }))
    })
    return () => {
      observable.unsubscribe()
    }
  }, [documentId])

  return state
}

export default useReferringDocuments
