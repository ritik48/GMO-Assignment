import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import CircularProgress from "@mui/material/CircularProgress";

import Post from "../interfaces/Post";

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 50 },
    { field: "userId", headerName: "User Id", width: 60 },
    {
        field: "title",
        headerName: "Title",
        width: 150,
        flex: 0.5,
    },
    {
        field: "body",
        headerName: "Body",
        flex: 1,
    },
];

export default function AllPosts() {
    const [posts, setPosts] = useState<Post[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        async function fetchPosts() {
            try {
                const res = await fetch(
                    "https://jsonplaceholder.typicode.com/posts"
                );

                if (!res.ok) {
                    return alert("Error fetching posts");
                }
                const data: Post[] = await res.json();
                setPosts(data);
            } catch (err) {
                if (err instanceof Error) {
                    alert(err.message);
                } else {
                    console.log("Unexpected errro = ", err);
                }
            } finally {
                setIsLoading(false);
            }
        }
        fetchPosts();
    }, []);

    return (
        <Box
            sx={{
                height: 400,
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
            }}
        >
            {isLoading ? (
                <CircularProgress />
            ) : (
                <DataGrid
                    rows={posts}
                    columns={columns}
                    initialState={{
                        pagination: {
                            paginationModel: {
                                pageSize: 5,
                            },
                        },
                    }}
                    pageSizeOptions={[5]}
                    checkboxSelection
                    disableRowSelectionOnClick
                />
            )}
        </Box>
    );
}
