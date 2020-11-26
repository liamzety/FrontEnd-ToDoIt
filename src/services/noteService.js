import httpService from "./httpService"

export const noteService = {
    update,
    remove,
    add
}

async function add(user) {
    const note = {
        title: "Untitled",
        body: ""
    }
    return await httpService.post('note', { note, user });
}
async function remove(noteId, user) {
    const updatedUser = await httpService.delete(`note/${noteId}`, { user })
    return updatedUser
}
async function update(note, user) {
    return await httpService.put(`note/${note._id}`, { note, user })
}

