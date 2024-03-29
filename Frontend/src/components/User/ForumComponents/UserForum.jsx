import React from 'react'
import ForumHeader from './ForumHeader'
import ForumBody from './ForumBody'

function UserForum() {
  return (
    <>
      <div className='container h-full flex flex-col gap-3'>
        <header className='flex-none'>
          <ForumHeader />
        </header>
        <main className='flex-1 scroll-auto'>
          <ForumBody />
        </main>
      </div>
    </>

  )
}

export default UserForum