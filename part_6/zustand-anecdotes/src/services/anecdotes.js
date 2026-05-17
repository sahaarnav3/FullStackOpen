const baseurl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
    const response = await fetch(baseurl)
    if (!response.ok)
        throw new Error('Failed to fetch anecdotes')
    return await response.json()
}

const createNew = async (content) => {
    const response = await fetch(baseurl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content, votes: 0 })
    })

    if (!response.ok)
        throw new Error('Failed to create anecdote')

    return await response.json()
}

const update = async (id, content) => {
    const response = await fetch(`${baseurl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(content)
    })

    if (!response.ok)
        throw new Error('Failed to update anecdote')

    return await response.json()
}

const deleteAnecdote = async(id) => {
    const response = await fetch(`${baseurl}/${id}`, {
        method: 'DELETE'
    })

    if (!response.ok)
        throw new Error('Failed to delete anecdote')

    return await response.json()
}

export default { getAll, createNew, update, deleteAnecdote }