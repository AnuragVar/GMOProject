import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";

interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}

export default function Firstcomponent() {
  const [items, setItems] = React.useState<Post[]>([]);
  const [loading, setLoading] = React.useState<boolean>(true);

  React.useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch(`https://jsonplaceholder.typicode.com/posts`);
        if (!res.ok) {
          throw new Error("Network response was not ok.");
        }
        const data: Post[] = await res.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Handle error state if needed
      } finally {
        setLoading(false);
      }
    }

    fetchPosts();
  }, []);

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "userId", headerName: "User ID", width: 150, editable: true },
    { field: "title", headerName: "Title", width: 400, editable: true },
    { field: "body", headerName: "Body", width: 600 },
  ];

  return (
    <div>
      {loading && (
        <h1
          className="text-3xl p-5 text-blue-600
      "
        >
          Loading...
        </h1>
      )}
      <h1 className="text-3xl p-5 font-bold">First Component -</h1>
      <Box sx={{ height: 400, width: "100%" }}>
        <DataGrid
          rows={items}
          columns={columns}
          loading={loading}
          checkboxSelection
          disableSelectionOnClick
        />
      </Box>
    </div>
  );
}
