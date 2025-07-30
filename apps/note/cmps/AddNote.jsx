const { useState } = React

export function AddNote({ handleChange }) {

    if (!noteToSave) return <div className="loader">Loading...</div>
    return (
        <textarea
            name='txt'
            cols='30'
            rows='10'
            onChange={handleChange}
            placeholder="Enter text here"
        ></textarea>
        // <form onSubmit={addNote} className="new-note-form">
        //     <div className='review-modal'>
        //         <input
        //             onChange={handleChange}
        //             type='text'
        //             id='title'
        //             name='title'
        //             size='10'
        //             placeholder="Note Title"
        //         />
        //         <textarea
        //             name='txt'
        //             cols='30'
        //             rows='10'
        //             onChange={handleChange}
        //             placeholder="Enter text here"
        //         ></textarea>
        //         <button>Save</button>
        //     </div>
        // </form>
    )
}