import * as React from 'react';
import Box from '@mui/material/Box';
import {
  GridToolbarContainer,
  GridToolbarColumnsButton,
  GridToolbarFilterButton,
  GridToolbarExport,
  GridToolbarDensitySelector,
} from '@mui/x-data-grid';

export default function DataGridToolbar (props) {

    return (
        <GridToolbarContainer>
          <GridToolbarColumnsButton />
          <GridToolbarFilterButton />
          <GridToolbarDensitySelector
            slotProps={{ tooltip: { title: 'Change density' } }}
          />
          <Box sx={{ flexGrow: 1 }} />
          <GridToolbarExport
            slotProps={{
              tooltip: { title: 'Export data' },
              button: { variant: 'outlined' },
            }}
          />
        </GridToolbarContainer>
      );
}