import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';

import { put } from '../services/api';

export default ({ id, data }) => {
  let [ tags, setTags ] = useState(data);
  let [ newTag, setNewTag ] = useState('');

  const addTag = async (e) => {
    e.preventDefault();
    console.log('e', e)
    setTags([ ...tags, newTag ]);
    try {
      await put(`/api/posts/elena/${id}/labels`, { label: newTag });
    } catch (err) {
      console.log(`Error adding tag`, err);
    }
    setNewTag('');
  }

  return (<div style={styles.container}>
    <div style={styles.tagsContainer}>
      {tags.map(d =>
        (<p key={d} style={styles.tag}>{d}</p>)
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
  tag: {
    display: 'inline-block',
    borderRadius: '50px',
    height: '2vh',
    width: 'auto',
    margin: '5px',
    padding: '5px',
    background: 'linear-gradient(135deg, #632B63 5%, #894ECF)',
    color: '#cccccc',
    fontSize: '0.9em',
    textAlign: 'left',
    paddingLeft: '10px',
    paddingRight: '10px',
    opacity: 0.7,
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
