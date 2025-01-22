import { Box, Container, Typography } from "@mui/material";
import FullBody from "rc/components/shared/FullBody";
import FullPage from "rc/components/shared/FullPage";
import { fetchApi } from "rc/utils/fetchApi";
import { Faq } from "../api/faq/route";

export default async function FaqPage() {
  const faqs = await fetchApi<Faq[]>("api/faq");

  return (
    <FullPage>
      <FullBody>
        <Container>
          <Typography variant="h3" align="center" sx={{ mb: 4 }}>
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
      </FullBody>
    </FullPage>
  );
}
