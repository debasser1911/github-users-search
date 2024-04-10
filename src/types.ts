export type UserItem = {
  login: string;
  followers: string;
  following: string;
  email: string;
  location: string;
  created_at: string;
  bio: string;
  avatar_url: string;
  repos_url: string;
  public_repos: number;
};

export type RepoItem = {
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  name: string;
};
