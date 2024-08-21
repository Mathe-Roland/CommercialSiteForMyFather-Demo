import React from 'react';
import { MenuItem } from '@mui/material';
import Link from 'next/link';

const LazyMenuItems = ({ items }) => {
  return (
    <>
      {items.map((e, index) => (
        e !== "Acasa" ? (
          index === 1 ? null : (
            <MenuItem
              key={e}
              component="a"
              href={e.toLowerCase().split(" ").join("-")}
              value={e}
            >
              {e}
            </MenuItem>
          )
        ) : (
          <MenuItem
            key={e}
            component="a"
            href={"/"}
            value={e}
          >
            {e}
          </MenuItem>
        )
      ))}
    </>
  );
};

export default LazyMenuItems;
