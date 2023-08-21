import type { Book } from '@/types'
// import IndexClientPage from './client'
import dynamic from 'next/dynamic'
import IndexLoading from './loading'

const IndexClientPage = dynamic(() => import('./client'), {
  ssr: false,
  loading: IndexLoading
})

const api = {
  book: {
    list: async (): Promise<Book[]> =>
      import('../books.json').then((data) =>
        data.library.map((data) => data.book)
      )
  }
}

export default async function IndexPage() {
  //   const books: Book[] = await import('../books.json').then((data) =>
  //     data.library.map((data) => data.book)
  //   )

  const books = await api.book.list()

  const genres: string[] = Array.from(new Set(books.map((book) => book.genre)))

  return <IndexClientPage books={books} genres={genres} />
}
