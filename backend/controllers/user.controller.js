import User from "../models/user.model.js";


export const getUserProfileAndRepos = async (req, res) => {

  const { username } = req.params;
  try {
    // be careful with github_api_key ,it fckn caused me a lot of trouble 
    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      }
    });
    const userProfile = await userRes.json();
    if (!userProfile.repos_url) {
      throw new Error('User profile does not contain repos_url');
    }
    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      }
    });
    const repos = await repoRes.json();
    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const user = await User.findById(req.user._id.toString());
    const userToLike = await User.findOne({ username });
    if (!userToLike) {
      return res.status(404).json({ error: 'User is not a member of github' });
    }

    if (user.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: 'User already liked' });
    }

    userToLike.likedBy.push({ username: user.username, avatarUrl: user.avatarUrl, likedDate: Date.now() });
    user.likedProfiles.push(userToLike.username);

    await Promise.all([userToLike.save(), user.save()]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}