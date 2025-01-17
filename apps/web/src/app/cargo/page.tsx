import { Button, Container, Typography, Box } from "@mui/material";
import Header from "rc/components/shared/Header";
import Footer from "rc/components/shared/Footer";
import CargoList from "./components/CargoList";
import { fetchApi } from "rc/utils/api.utils";
import { Cargo } from "@prisma/client";

export default async function CargoPage() {
  const cargoData = await fetchApi<Cargo[]>("api/cargos");
  console.log(cargoData);

  // // const router = useRouter();
  // const [cargos, setCargos] = useState([]);
  // const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchCargos = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch("/api/cargos");
  //       const data = await response.json();
  //       setCargos(data);
  //     } catch (error) {
  //       console.error("Error fetching cargos:", error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCargos();
  // }, []);

  // const handleSelectCargo = async (cargoId) => {
  //   const updatedCargo = await fetch(`/api/cargos/${cargoId}`, {
  //     method: "PUT",
  //     body: JSON.stringify({
  //       status: "IN_TRANSIT",
  //       assignedToId: session?.user?.id,
  //     }),
  //   });
  //   const updatedData = await updatedCargo.json();
  //   setCargos((prev) =>
  //     prev.map((cargo) =>
  //       cargo.id === updatedData.id ? { ...cargo, status: "IN_TRANSIT" } : cargo
  //     )
  //   );
  //   // router.push(`/cargo/${cargoId}`); // Redirect to the cargo details page
  // };

  return (
    <Box>
      <Header
        title="Cargo List"
        buttons={[{ title: "Dashboard", to: "/driver" }]}
      />
      <Container sx={{ marginTop: 4 }}>
        {/* Add New Cargo Button */}
        <Box
          sx={{
            marginBottom: 2,
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h4">Available Cargos</Typography>
          <Button variant="contained" color="primary" href="/cargo/create">
            Add New Cargo
          </Button>
        </Box>
        {/* Filter Section */}
        <CargoList data={cargoData} />
      </Container>
      <Footer />
    </Box>
  );
}
