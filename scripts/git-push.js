import git from 'isomorphic-git';
import http from 'isomorphic-git/http/node/index.js';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');

async function push() {
  const token = process.argv[2] || process.env.GITHUB_TOKEN;

  if (!token) {
    console.log(`
ℹ️  How to push to GitHub:

Option A (Recommended):
Run the following standard Git command in your terminal/Git Bash:
    git push -u origin main

Option B (Using this script with a GitHub Personal Access Token):
    node scripts/git-push.js <YOUR_GITHUB_PERSONAL_ACCESS_TOKEN>

    (Generate a token at: https://github.com/settings/tokens with 'repo' scope)
`);
    process.exit(0);
  }

  console.log('Pushing to https://github.com/1991Rajib/AI-Content-Generator-for-Product-Cards.git...');

  try {
    const pushResult = await git.push({
      fs,
      http,
      dir,
      remote: 'origin',
      ref: 'main',
      force: true,
      onAuth: () => ({
        username: token,
        password: ''
      })
    });

    console.log('🎉 Successfully pushed to GitHub!');
    console.log(pushResult);
  } catch (err) {
    console.error('❌ Push error:', err.message);
  }
}

push();
