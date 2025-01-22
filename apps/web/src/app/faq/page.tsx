import { Box, Container, Typography } from "@mui/material";
import FullPage from "rc/components/shared/Layout/FullPage";
import { fetchApi } from "rc/utils/fetchApi";
import { Faq } from "../api/faq/route";

export default async function FaqPage() {
  const faqs = await fetchApi<Faq[]>("api/faq");

  return (
    <FullPage>
      <Container>
        <Typography variant="h1" align="center" sx={{ mt: 2, mb: 4 }}>
          Frequently Asked Questions
        </Typography>
        {faqs.map((faq) => (
          <Box key={faq.question} sx={{ mb: 3 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              {faq.question}
            </Typography>
            <Typography variant="body1">{faq.answer}</Typography>
          </Box>
        ))}
      </Container>
    </FullPage>
  );
}
