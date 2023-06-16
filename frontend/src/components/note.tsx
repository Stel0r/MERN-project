import { Card } from 'react-bootstrap'
import { Note as noteModel } from '../models/note'
import styles from '../styles/Note.module.css'
import styleUtils from '../styles/Utils.module.css'

import { formatDate } from '../utils/formatDate'
import {MdDelete} from 'react-icons/md'

interface NoteProps {
    note: noteModel
    className?:string
    onDelete:(note:noteModel) => void
    onNoteClick:(note:noteModel) => void
}

const Note = ({note,className,onDelete,onNoteClick}: NoteProps) => {

    const {title,description,createdAt,updatedAt} = note

    let noteTextDate:string
    if(updatedAt > createdAt){
        noteTextDate = "Updated: "+ formatDate(updatedAt)
    }else{
        noteTextDate = "Created: "+ formatDate(updatedAt)
    }

    return <Card className={`${styles.noteCard} ${className}`} onClick = {()=> onNoteClick(note)}>
        <Card.Body className={styles.cardBody}>
            <Card.Title className = {styleUtils.flexCenter}>
                {title}
                <MdDelete className='text-muted ms-auto' onClick= {(e) => {
                    onDelete(note)
                    e.stopPropagation()
                    }}/>
            </Card.Title>
            <Card.Text className= {styles.noteText}>{description}</Card.Text>
        </Card.Body>
        <Card.Footer className='text-muted'>{noteTextDate}</Card.Footer>
    </Card>
}

export default Note