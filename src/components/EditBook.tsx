import { zodResolver } from "@hookform/resolvers/zod";
import { Box, Typography, Stack, TextField, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { z } from "zod";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const schema = z.object({
  name: z
    .string()
    .min(3, "Minimum of 3 characters required for the title")
    .max(30, "Maximum of 30 characters allowed for the title"),
  price: z.number().min(1, "Price cannot be 0"),
  category: z
    .string()
    .min(3, "Minimum of 10 characters required for the category")
    .max(15, "Maximum of 15 characters allowed for the category"),
  description: z
    .string()
    .min(5, "Minimum of 5 characters required for the description")
    .max(30, "Maximum of 30 characters allowed for the description"),
});

export type EditItemSchema = z.infer<typeof schema>;

type EditBookProps = {
  data: EditItemSchema;
  onSubmit: (data: EditItemSchema) => void;
};

export default function EditBook({ data, onSubmit }: EditBookProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<EditItemSchema>({
    defaultValues: data,
    resolver: zodResolver(schema),
  });

  function handleInternalSubmit(data: EditItemSchema) {
    onSubmit(data);
    reset();
  }

  return (
    <Box sx={style}>
      <form onSubmit={handleSubmit(handleInternalSubmit)}>
        <Typography variant="body1" gutterBottom>
          Edit Book
        </Typography>
        <Stack spacing={1} direction="column">
          <TextField
            error={!!errors["name"]?.message}
            helperText={errors["name"]?.message}
            {...register("name")}
            label="name"
            variant="standard"
          />
          <TextField
            type="number"
            error={!!errors["price"]?.message}
            helperText={errors["price"]?.message}
            {...register("price", {
              valueAsNumber: true,
            })}
            label="price"
            variant="standard"
          />
          <TextField
            error={!!errors["category"]?.message}
            helperText={errors["category"]?.message}
            {...register("category")}
            label="category"
            variant="standard"
          />
          <TextField
            error={!!errors["description"]?.message}
            helperText={errors["description"]?.message}
            {...register("description")}
            label="description"
            variant="standard"
          />
        </Stack>
        <Button sx={{ marginTop: "2em" }} type="submit" variant="outlined">
          Save
        </Button>
      </form>
    </Box>
  );
}
