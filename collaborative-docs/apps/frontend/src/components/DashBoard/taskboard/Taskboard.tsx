import React, { useState } from 'react'
import plus from '../../../assets/images/plus.png'
import './Taskboard.css'
import Docs from '../../Document/Docs'
import EditDocs from '../../Edits/EditDocs'


const Taskboard: React.FC = () => {
  const [isEdit, setIsEdit] = useState(false)

  const handleEdit = () => {
    setIsEdit(!isEdit)
  }
  if(isEdit) return < EditDocs handleEdit= {handleEdit}/>

  return (
    <section>
      <div className='new-document'>
        <p>Start New Document</p>
        <div className='document-card'>
          <img src={ plus } alt="plus-icon" onClick={handleEdit}/>
        </div>
        <p className='blank'>Blank Document</p>
      </div>
      <div className='documents'>
        < Docs/>
      </div>
    </section>
  )
}

export default Taskboard