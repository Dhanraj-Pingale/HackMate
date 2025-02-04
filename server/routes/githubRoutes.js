// routes/github.js

import exprees from "express";
import axios from 'axios';
import dotenv from "dotenv"

const router = exprees.Router();
dotenv.config();

const GITHUB_API_URL = "https://api.github.com";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

// Get branches of a repository
router.get('/branches', async (req, res) => {
  const { username, reponame } = req.query;
  if (!username || !reponame) {
    return res.status(400).send("Username and repository name are required.");
  }

  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${username}/${reponame}/branches`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching branches");
  }
});

// Get commits of a repository
router.get('/commits', async (req, res) => {
  const { username, reponame, branch } = req.query;

  if (!username || !reponame || !branch) {
    return res.status(400).send("Username, repository name, and branch are required.");
  }

  try {
    // Fetch commits for the specific branch
    const response = await axios.get(
      `${GITHUB_API_URL}/repos/${username}/${reponame}/commits?sha=${branch}`, 
      {
        headers: {
          Authorization: `Bearer ${GITHUB_TOKEN}`,
          Accept: 'application/vnd.github.v3+json',
        },
      }
    );

    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching commits");
  }
});


// Get contents requests of a repository
router.get('/contents', async (req, res) => {
  const { username, reponame } = req.query;
  if (!username || !reponame) {
    return res.status(400).send("Username and repository name are required.");
  }

  try {
    const response = await axios.get(`${GITHUB_API_URL}/repos/${username}/${reponame}/contents`, {
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        Accept: 'application/vnd.github.v3+json',
      },
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching pull requests");
  }
});

export default router;
