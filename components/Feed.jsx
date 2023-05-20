'use client'
import { useState, useEffect } from 'react'
import PromptCard from './PromptCard'

const PromptCardList = ({ data, handleTagClick }) => {
    return (
        <div className='mt-16 prompt_layout'>
            {data.map((post) => (
                <PromptCard
                    key={post._id}
                    post={post}
                    handleTagClick={handleTagClick}
                />
            ))}
        </div>
    )
}

const Feed = () => {
    const [posts, setPosts] = useState([])
    // search logic
    const [searchText, setSearchText] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(null)
    const [searchedResults, setSearchedResults] = useState([])

    // fetch posts
    const fetchPosts = async () => {
        const response = await fetch('/api/prompt')
        const data = await response.json()
        setPosts(data)
    }

    const filterPrompts = (searchtext) => {
        const regex = new RegExp(searchtext, 'i') // 'i' flag for case-insensitive search
        return posts.filter(
            (item) =>
                regex.test(item.creator.username) ||
                regex.test(item.tag) ||
                regex.test(item.prompt)
        )
    }

    const handleSearchChange = (e) => {
        clearTimeout(searchTimeout)
        setSearchText(e.target.value)

        // debounce method
        setSearchTimeout(
            setTimeout(() => {
                const searchResult = filterPrompts(e.target.value)
                setSearchedResults(searchResult)
            }, 500)
        )
    }

    const handleTagClick = (tagName) => {
        setSearchText(tagName)

        const searchResult = filterPrompts(tagName)
        setSearchedResults(searchResult)
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <section className='feed'>
            <form className='relative w-full flex-center'>
                <input
                    type='text'
                    placeholder='Search...'
                    value={searchText}
                    onChange={handleSearchChange}
                    required
                    className='search_input peer'
                />
            </form>

            {searchText ? (
                <PromptCardList
                    data={searchedResults}
                    handleTagClick={handleTagClick}
                />
            ) : (
                <PromptCardList
                    data={posts}
                    handleTagClick={handleTagClick}
                />
            )}
        </section>
    )
}

export default Feed
