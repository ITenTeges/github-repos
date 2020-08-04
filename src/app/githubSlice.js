import { createSlice } from '@reduxjs/toolkit';
import { Octokit } from "@octokit/core";

const octokit = new Octokit({ auth: process.env.REACT_APP_AUTH });
export const usersSlice = createSlice({
  name: 'github',
  initialState: {
    users: [],
    repositories: [],
  },
  reducers: {
    setUsers: (state, action) => {
      state.users = action.payload
    },
    setRepositories: (state, action) => {
      state.repositories = action.payload
    },
  },
});

export const { setUsers, setRepositories } = usersSlice.actions;
export const getUser = username => async dispatch => {
  try {
    const result = await octokit.request("GET /search/users", {
      q: username,
      per_page: 5
    });
    dispatch(setUsers(result.data.items.map(user => ({
      username: user.login
    }))))
  } catch(e) {
    return new Error(e)
  }
};

export const getRepositories = username => async dispatch => {
  try {
    const result = await octokit.request("GET /users/:user/repos", {
      user: username
    });
    dispatch(setRepositories(result.data.map(repo => ({
      title: repo.name,
      description: repo.description,
      stars: repo.stargazers_count,
      url: repo.html_url
    }))))
  } catch(e) {
    return new Error(e)
  }
};

export default usersSlice.reducer;
