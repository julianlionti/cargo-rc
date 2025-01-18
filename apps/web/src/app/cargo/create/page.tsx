import { Container, Typography, Grid2 } from "@mui/material";
import Header from "rc/components/shared/Header";
import { CargoForm } from "../components/CargoForm";

export default function CreateCargo() {
  // const [cargoDetails, setCargoDetails] = useState({
  //   title: "",
  //   origin: "",
  //   destination: "",
  //   weight: 0,
  //   reward: 0,
  //   size: "SMALL",
  //   urgency: "LOW",
  // });

  // const handleChange = (e) => {
  //   setCargoDetails({
  //     ...cargoDetails,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch("/api/cargos", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(cargoDetails),
  //     });

  //     if (response.ok) {
  //       // router.push("/cargo"); // Redirect to the Cargo List page
  //     } else {
  //       console.error("Failed to create cargo");
  //     }
  //   } catch (error) {
  //     console.error("Error creating cargo:", error);
  //   }
  // };

  return (
    <>
      <Header title="" buttons={[]} />
      <Container sx={{ marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Add New Cargo
        </Typography>
        <Grid2 container spacing={3}>
          <Grid2 size={{ xs: 12 }}>
            <CargoForm />
          </Grid2>
        </Grid2>
      </Container>
    </>
  );
}
