import Link from "@mui/material/Link";

import { Box, Container, Typography } from "@mui/material";

export default function Footer() {
    return (
        <Box
            sx={{
                position: "absolute",
                bottom: 0,
                width: "100%",
            }}
        >
            <Container maxWidth="lg">
                <Typography color="black" sx={{ textAlign: "center" }}>
                    <Link href="https://github.com/ritik48" target={"_blank"}>
                        Made by Ritik
                    </Link>
                </Typography>
            </Container>
        </Box>
    );
}
