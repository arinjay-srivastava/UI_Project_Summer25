# NotePad

## What is NotePad?

NotePad is a simple web app where you can create, view, edit, and delete notes. You can also follow other users to connect with them. It’s built using HTML, CSS, JavaScript, and Node.js, with a MongoDB database to store your notes and user information.

## Features

- Sign up and log in to your account.
- Create, view, edit, and delete your notes.
- Follow other users.
- Works on both computers and phones.

## Database Structure

### ER-Diagram

 ![ERD](https://github.com/user-attachments/assets/c9d23877-de4d-44fa-be64-e37ed48d08c2)

This diagram shows how the app connects users, notes, and followers:

- **USER**: Stores user info like username and password.
- **NOTE**: Stores your notes, linked to the user who made them.
- **FOLLOWER**: Keeps track of who follows whom.

### Relations Diagram

![Relations Diagram](https://github.com/user-attachments/assets/e7e87626-cb08-4759-94b1-e76a93e5b7d2)

This shows the tables and their columns:

- **USER**: Has columns like `UserID`, `UserName`, `Email`.
- **NOTE**: Has columns like `NoteID`, `Content`, `UserID`.
- **FOLLOWER**: Has columns like `FollowerID`, `UserID`, `FollowingID`.
