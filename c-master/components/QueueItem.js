import React from 'react';
import css from 'styled-jsx/css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table';

export default ({ index, item, session, onRemoveItem, onVoteUp }) => {
  const voteUp = item.voters && session.user && item.voters.filter(v => v.id === session.user.id).length === 0
    ? <button onClick={onVoteUp}>▲</button>
    : null;
  return (
    <table style={{border: '1'}}>
    <tr>
        <th></th>
        <th style={{textAlign: 'center'}}>No</th> 
        <th style={{textAlign: 'center'}}>Track</th>
        <th style={{textAlign: 'center'}}>Artist</th> 
        <th style={{textAlign: 'center'}}>User</th>
        <th></th>
   </tr>
    <tr>
      <td style={{ paddingRight: '10px' }}>
        <img src={item.track.album.images[2].url} width="40" height="40" />
      </td>
      <td style={{ paddingRight: '10px' }}>
        {index + 1}
      </td>
      <td style={{ paddingRight: '10px' }}>
        {item.track.name}
      </td>
      <td style={{ paddingRight: '10px' }}>
        {item.track.artists.map(a => a.name).join(', ')}
      </td>
      <td style={{ paddingRight: '10px' }}>
        {item.user && (item.user.display_name || item.user.id)}
      </td>
      <td>
        {item.user && session.user && item.user.id === session.user.id
          ? <button
              onClick={() => {
                onRemoveItem(item.id);
              }}
            >
              X
            </button>
          : voteUp}
      </td>
      <td>
        {item.voters && item.voters.length > 0
          ? <span>
              {item.voters.length === 1 ? '1 vote' : item.voters.length + ' votes'}
            </span>
          : ''}
      </td>
    </tr>
    </table>
  );
};
