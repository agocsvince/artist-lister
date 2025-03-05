import React from "react";
import { Avatar, List, ListItem, ListItemAvatar, ListItemText, Typography } from "@mui/material";

type artistType = { id: number, name: string, albumCount: number, portrait: string}

export default function ArtistList({artistList}: {artistList: artistType[]}) {

  return (
    <List>
      {artistList.map(artist => {
        return <ListItem alignItems="flex-start" key={artist.id}>
          <ListItemAvatar>
            <Avatar alt={artist.name} src={artist.portrait} />
          </ListItemAvatar>
          <ListItemText primary={artist.name} secondary={
          <React.Fragment>
            <Typography
              component="span"
              variant="body2"
              sx={{ color: 'gray', display: 'inline' }}
            >
              {artist.albumCount}
            </Typography>
          </React.Fragment>
        }/>
        </ListItem>
      })}
    </List>
  );
}