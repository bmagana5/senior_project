# Some Git commands
Git commands:

git clone https://github.com/repo_name.git  --  use this to clone entire repo to current working directory

git add file_name                           --  add specified file to 'staging area'
git rm file_name                            --  remove specified file from repo (also deletes it from working directory)
git commit -m "your message"                --  commits every staged file or file change. Message should give a brief detailing of work progress.
git push origin branch_name                 --  push your committed changes of branch_name to the remote location of your repo.

git branch new_branch                       --  creates a new_branch or pointer at your current commit (HEAD)
                                            --  note: this does not switch you to new_branch)

git checkout some_branch                    --  this changes your HEAD pointer to some_branch  
git switch some-branch

git checkout -b new_branch                  --  this creates a new_branch and switches to it
git switch -c new_branch                    --  this does the same thing (can also use --create flag)


CHECK OUT SPATIALCHAT ->    find out how they work. maybe this is something to consider with k-means clustering algorithm.