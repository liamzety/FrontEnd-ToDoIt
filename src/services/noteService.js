import httpService from "./httpService"

export const noteService = {
    update,
    remove,
    add
}

async function add(user) {
    console.log('adding',)
    const note = {
        title: "Untitled",
        body: "Write your ideas here!"
    }
    return await httpService.post('note', { note, user });
}
async function remove(noteId, user) {
    const updatedUser = await httpService.delete(`note/${noteId}`, { user })
    return updatedUser
}
function update(note, user) {
    httpService.put(`note/${note._id}`, { note, user })
}

