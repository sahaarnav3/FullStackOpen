const baseUrl = 'http://localhost:3001/anecdotes'

export const getAnecdotes = async () => {
    const response = await fetch(baseUrl)
    if (!response.ok)
        throw new Error('Failed to fetch anecdotes')
    return await response.json()
}

export const createAnecdote = async (content) => {
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    }

    const response = await fetch(baseUrl, options)
    // console.log('resoonsese', await response.json()) // to even get the error messgae you need to do response.json()
    if (!response.ok)
        throw new Error('Failed to create Anecdote')
    return await response.json()
}

export const updateAnecdote = async (anecdote) => {
    const options = {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ ...anecdote, votes: anecdote.votes + 1 })
    }

    const response = await fetch(`${baseUrl}/${anecdote.id}`, options)
    if (!response.ok)
        throw new Error('Failed to update votes')
    return await response.json()
}