'use client'

import type { Book } from '@/types'
import { useEffect, useMemo, useState } from 'react'







export default function IndexClientPage({books, genres} : {books: Book[], genres: Book['genre'][]}) {
  const [genre, setGenre] = useState<Book['genre']>('')
  const [readList, setReadList] = useState<Book['ISBN'][]>([])
  const matches = useMemo(() => {
    if (!genre) return books

    return books.filter((book) => {
      if (book.genre !== genre) return false

      return true
    })
  }, [genre, books])

  function handleBookClick(book: Book['ISBN']) {
    const draft = readList.includes(book)
      ? readList.filter((readingBook) => readingBook !== book)
      : [...readList, book]
    setReadList(draft)
    api.readList.update(draft)
  }

  const api = {
    readList: {
      update: (readList: Book['ISBN'][]) =>
        localStorage.setItem('readList', JSON.stringify(readList)),
      onChange: (callback: (readList: Book['ISBN'][]) => void) => {
        function getReadList() {
          const readList = JSON.parse(
            localStorage.getItem('readList') ?? '[]'
          ) as Book['ISBN'][]

          callback(readList)
        }

        window.addEventListener('storage', getReadList)

        getReadList()

        return () => window.removeEventListener('storage', getReadList)
      }
    }
  }

  useEffect(() => {
    const unsuscribe = api.readList.onChange(setReadList)

    return () => unsuscribe()
  }, [])

  return (
    <article className='grid gap-4'>
      <nav>
        <select
          value={genre}
          onChange={(event) => setGenre(event.target.value)}
        >
          <option value=''>Todos</option>
          {genres.map((genre) => {
            return (
              <option key={genre} value={genre}>
                {genre}
              </option>
            )
          })}
        </select>
      </nav>
      <ul className='grid grid-cols-[repeat(auto-fill,minmax(230px,1fr))] gap-4'>
        {matches.map((book) => {
          return (
            <li
              key={book.ISBN}
              className='grid gap-2'
              onClick={() => handleBookClick(book.ISBN)}
            >
              <img
                className='aspect-[9/14] object-cover'
                alt={book.title}
                src={book.cover}
              />
              <p>
                {readList.includes(book.ISBN) && <span>⭐ </span>}
                {book.title}
              </p>
            </li>
          )
        })}
      </ul>
    </article>
  )
}
