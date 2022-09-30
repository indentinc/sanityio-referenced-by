import {ReferencedByView} from 'part:@indent-oss/sanityio-referenced-by'
import S from '@sanity/desk-tool/structure-builder'

export const getDefaultDocumentNode = () => {
  return S.document().views([
    S.view.form(),
    S.view.component(ReferencedByView).title('Referenced by'),
  ])
}

export default () => S.list().title('Base').items(S.documentTypeListItems())
