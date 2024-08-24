import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Alert,
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const AdminDashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [recentActivity, setRecentActivity] = useState([]);

  const navigate = useNavigate(); // React Router's navigate function

  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8000/api/quizzes");
        console.log("Fetched quizzes:", response.data);

        if (Array.isArray(response.data)) {
          setQuizzes(response.data);
        } else if (response.data.quizzes && Array.isArray(response.data.quizzes)) {
          setQuizzes(response.data.quizzes);
        } else {
          throw new Error("Unexpected response format");
        }

        // Mock recent activity for demonstration purposes
        setRecentActivity([
          { id: 1, description: 'User John completed JavaScript Quiz' },
          { id: 2, description: 'User Jane started CSS Quiz' },
          { id: 3, description: 'User Mike submitted Python Quiz' },
          { id: 4, description: 'User Emily failed HTML Quiz' },
        ]);

        setLoading(false);
      } catch (err) {
        console.error("Error fetching quizzes:", err);
        setError("Failed to fetch quizzes");
        setLoading(false);
      }
    };
    fetchQuizzes();
  }, []);

  const handleQuizClick = (id) => {
    navigate(`quiz/${id}`);
  };

  // Limit the quizzes displayed to the first 10
  const limitedQuizzes = quizzes.slice(0, 10);

  // Static data for the charts
  const barData = [
    { name: 'Java', Submissions: 2400 },
    { name: 'CSS', Submissions: 1398 },
    { name: 'JavaScript', Submissions: 9800 },
    { name: 'HTML', Submissions: 3908 },
    { name: 'Python', Submissions: 4800 },
  ];

  const pieData = [
    { name: 'Completed', value: 400 },
    { name: 'Pending', value: 300 },
    { name: 'Failed', value: 300 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <div style={{ padding: "20px" }}>
      <Grid container justifyContent="space-between" alignItems="center" spacing={3}>
        {/* Title and Button on the right */}
        <Grid item xs={12} md={6}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
        </Grid>
        <Grid item xs={12} md={6} style={{ textAlign: "right" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => navigate("/admin/create-quiz")} // Update with the correct path
            sx={{ backgroundColor: "#ffdf00", color: "#000" }}
          >
            Create Quizz
          </Button>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Left side: Quiz Table */}
        <Grid item xs={12} md={6}>
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", margin: "20px 0" }}>
              <CircularProgress />
            </div>
          )}
          {error && <Alert severity="error">{error}</Alert>}

          {!loading && !error && (
            <>
              <TableContainer
                component={Paper}
                style={{ marginTop: "50px", maxHeight: 400, overflow: "auto" }}
              >
                <Table stickyHeader>
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }}>Quiz Title</TableCell>
                      <TableCell sx={{ fontWeight: 'bold', textAlign: 'center' }} align="center">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {limitedQuizzes && limitedQuizzes.length > 0 ? (
                      limitedQuizzes.map((quiz) => (
                        <TableRow
                          key={quiz._id}
                          hover
                          style={{ cursor: "pointer" }}
                        >
                          <TableCell sx={{ textAlign: 'center' }} component="th" scope="row">
                            {quiz.title}
                          </TableCell>
                          <TableCell sx={{ textAlign: 'center' }} align="center">
                            <IconButton
                              color="primary"
                              onClick={() => handleQuizClick(quiz._id)}
                            >
                              <ArrowForward />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={2} align="center">
                          No quizzes available.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Recent Activity Section */}
              <Box component={Paper} style={{ marginTop: "20px", padding: "20px", height: 375, overflowY: 'auto' }}>
                <Typography variant="h6">Recent Activity</Typography>
                <List>
                  {recentActivity.map((activity) => (
                    <ListItem key={activity.id}>
                      <ListItemText primary={activity.description} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </>
          )}
        </Grid>

        {/* Right side: Charts */}
        <Grid item xs={12} md={6}>
          <Paper style={{ padding: "20px", marginBottom: "28px", marginTop: "55px" }}>
            <Typography variant="h6" gutterBottom>
              Quiz Submissions Overview
            </Typography>
            <BarChart
              width={500}
              height={300}
              data={barData}
              margin={{
                top: 5, right: 30, left: 20, bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Submissions" fill="rgba(108, 18, 108, 0.9)" />
            </BarChart>
          </Paper>

          <Paper style={{ padding: "20px" }}>
            <Typography variant="h6" gutterBottom>
              Quiz Completion Status
            </Typography>
            <PieChart width={500} height={300}>
              <Pie
                data={pieData}
                cx={250}
                cy={150}
                labelLine={false}
                label
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default AdminDashboard;
