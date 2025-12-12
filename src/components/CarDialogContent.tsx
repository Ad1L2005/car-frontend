// CarDialogContent.tsx — финальная версия как в книге
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import DialogContent from '@mui/material/DialogContent';
import { Car } from '../types';

type DialogFormProps = {
  car: Car;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

function CarDialogContent({ car, handleChange }: DialogFormProps) {
  return (
    <DialogContent>
      <Stack spacing={2} mt={2}>
        <TextField label="Brand"             name="brand"             value={car.brand}             onChange={handleChange} />
        <TextField label="Model"             name="model"             value={car.model}             onChange={handleChange} />
        <TextField label="Color"             name="color"             value={car.color}             onChange={handleChange} />
        <TextField label="Model Year"        name="modelYear"         value={car.modelYear}         onChange={handleChange} type="number" />
        <TextField label="Registration No."  name="registrationNumber"value={car.registrationNumber}onChange={handleChange} />
        <TextField label="Price"             name="price"             value={car.price}             onChange={handleChange} type="number" />
      </Stack>
    </DialogContent>
  );
}

export default CarDialogContent;