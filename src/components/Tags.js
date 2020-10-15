import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';

import { put, _delete } from '../services/api';

export default ({ id, data }) => {
  let [ tags, setTags ] = useState(data);
  let [ newTag, setNewTag ] = useState('');

  const addTag = async (e) => {
    e.preventDefault();
    setTags([ ...tags, newTag ]);
    try {
      await put(`/api/posts/elena/${id}/labels`, { label: newTag });
    } catch (err) {
      console.log(`Error adding tag`, err);
    }
    setNewTag('');
  }

  const deleteTag = async (tag) => {
    console.log('tag to delete', tag)
    setTags(tags.filter(t => t !== tag));
    try {
      await _delete(`/api/posts/elena/${id}/labels/${tag}`);
    } catch (err) {
      console.log(`Error adding tag`, err);
    }
  }

  return (<div style={styles.container}>
    <div style={styles.tagsContainer}>
      {tags.map(d =>
        (<div key={d} style={styles.tagDiv}>
          <p style={styles.tagText}>{d}</p>
          <ClearIcon className='pointerHover' style={{ backgroundColor: '#dddddd', fontSize: '0.8em', marginLeft: '5px', borderRadius: '10px' }} onClick={() => deleteTag(d)}/>
        </div>)
      )}
    </div>
    <form onSubmit={addTag} style={{ width: '100%', padding: '0px', display: 'flex' }}>
      <TextField
        value={newTag} onChange={(e) => setNewTag(e.target.value)} onClick={e => e.stopPropagation()}
        style={styles.input} InputProps={{ disableUnderline: true }} placeholder='Add tag...'
      />
    </form>
  </div>);
}

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
  },
  tagsContainer: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  tagDiv: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    borderRadius: '50px',
    height: '2vh',
    width: 'auto',
    margin: '5px',
    padding: '5px',
    background: 'linear-gradient(135deg, #632B63 5%, #894ECF)',
    paddingLeft: '10px',
    paddingRight: '10px',
    opacity: 0.7,
  },
  tagText: {
    color: '#cccccc',
    fontSize: '0.9em',
    textAlign: 'left',
    margin: 0,
  },
  input: {
    opacity: 0.7,
    marginLeft: '5px',
    marginRight: '5px',
    marginBottom: '5px',
    backgroundColor: '#dddddd',
    borderRadius: '50px',
    paddingLeft: '10px',
    paddingRight: '10px',
    fontSize: '0.9em',
  }
};
