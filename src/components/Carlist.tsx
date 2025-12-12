import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getCars, deleteCar } from '../api/carapi';
import { DataGrid, GridColDef, GridCellParams, GridToolbar } from '@mui/x-data-grid';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import Button from '@mui/material/Button';          // <-- добавили
import DeleteIcon from '@mui/icons-material/Delete';
import AddCar from './AddCar';
import EditCar from './EditCar';

// Объявляем тип пропсов
interface CarlistProps {
  logOut: () => void;
}

function Carlist({ logOut }: CarlistProps) {
  const [open, setOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, error, isSuccess } = useQuery({
    queryKey: ["cars"],
    queryFn: getCars
  });

  const { mutate } = useMutation(deleteCar, {
    onSuccess: () => {
      setOpen(true);
      queryClient.invalidateQueries({ queryKey: ['cars'] });
    },
    onError: (err) => {
      console.error(err);
    },
  });

  const columns: GridColDef[] = [
    { field: 'brand', headerName: 'Brand', width: 200 },
    { field: 'model', headerName: 'Model', width: 200 },
    { field: 'color', headerName: 'Color', width: 200 },
    { field: 'registrationNumber', headerName: 'Reg.nr.', width: 150 },
    { field: 'modelYear', headerName: 'Model Year', width: 150 },
    { field: 'price', headerName: 'Price', width: 150 },
    {
      field: 'edit',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => <EditCar cardata={params.row} />
    },
    {
      field: 'delete',
      headerName: '',
      width: 90,
      sortable: false,
      filterable: false,
      disableColumnMenu: true,
      renderCell: (params: GridCellParams) => (
        <IconButton
          aria-label="delete"
          size="small"
          onClick={() => {
            if (window.confirm(`Are you sure you want to delete ${params.row.brand} ${params.row.model}?`)) {
              mutate(params.row._links.car.href);
            }
          }}
        >
          <DeleteIcon fontSize="small" />
        </IconButton>
      ),
    },
  ];

  // Если данные ещё не загружены или произошла ошибка
  if (!isSuccess) return <span>Loading...</span>;
  if (error) return <span>Error when fetching cars...</span>;

  return (
    <>
      {/* Панель с кнопкой добавления и кнопкой выхода */}
      <div style={{ margin: '20px 10px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <AddCar />
        <Button variant="outlined" color="error" onClick={logOut}>
          Выйти
        </Button>
      </div>

      <div style={{ height: 600, width: '100%' }}>
        <DataGrid
          rows={data ?? []}
          columns={columns}
          disableRowSelectionOnClick
          getRowId={row => row._links.self.href}
          slots={{ toolbar: GridToolbar }}
        />

        <Snackbar
          open={open}
          autoHideDuration={2000}
          onClose={() => setOpen(false)}
          message="Car deleted successfully"
        />
      </div>
    </>
  );
}

export default Carlist;