export const getUserProfileAndRepos = async (req, res) => {

  const { username } = req.params;
  try {
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${import.meta.env.VITE_GITHUB_API_KEY}`,
      }
    });
    const userProfile = await userRes.json();
    setUserProfile(userProfile);

    const repoRes = await fetch(userProfile.repos_url);
    const repos = await repoRes.json();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}