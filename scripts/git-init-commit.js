import git from 'isomorphic-git';
import fs from 'fs';
import path from 'path';

const dir = path.resolve('.');

async function main() {
  console.log('--- Initializing Git Repository in', dir, '---');

  // 1. Initialize repo
  await git.init({ fs, dir });
  console.log('✅ Git repository initialized (.git directory created).');

  // 2. Set remote
  const remoteUrl = 'https://github.com/1991Rajib/AI-Content-Generator-for-Product-Cards.git';
  try {
    await git.addRemote({
      fs,
      dir,
      remote: 'origin',
      url: remoteUrl,
      force: true
    });
    console.log(`✅ Remote origin set to: ${remoteUrl}`);
  } catch (e) {
    console.log('Remote note:', e.message);
  }

  // 3. Check status matrix and stage files respecting .gitignore
  console.log('Staging files (strictly respecting .gitignore)...');
  const statusMatrix = await git.statusMatrix({ fs, dir });

  // Status matrix returns [filepath, headStatus, workdirStatus, stageStatus]
  // WorkdirStatus 0 means ignored, 2 means modified/untracked
  let stagedCount = 0;
  for (const [filepath, head, workdir] of statusMatrix) {
    // Double check that secret files are never added
    if (filepath.includes('.env') && !filepath.endsWith('.example')) {
      console.log(`🔒 SAFETY CHECK: Excluded sensitive file "${filepath}"`);
      continue;
    }

    if (workdir !== 0) { // Not ignored
      await git.add({ fs, dir, filepath });
      stagedCount++;
    }
  }

  console.log(`✅ Staged ${stagedCount} files.`);

  // 4. Create Commit
  const sha = await git.commit({
    fs,
    dir,
    author: {
      name: 'Rajib',
      email: '1991Rajib@users.noreply.github.com',
    },
    message: 'feat: AI Content Generator for Product Cards (Assignment 2 submission)'
  });

  console.log(`✅ Created initial commit: ${sha.substring(0, 7)}`);
  console.log('Repository is committed on local main/master branch.');
}

main().catch(err => {
  console.error('Git error:', err);
  process.exit(1);
});
