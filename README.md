# ToDo List Application

A simple web-based To-Do List application for creating and managing tasks.

## Group Members

| Name        | Student ID | Role         |Contribution    |
| ----------- | ---------- | ------------ |                |
| Komal Atif  |      53635 | Team Leader  |                |
| Sadaf Iqbal |      56352 | Collaborator |Updated README  |
| Simaab Malik|      54910 | Collaborator |Updated README  |
| Nimra Tariq |      54909 | Collaborator |Updated README  |

| Wafa Aadil  |      74775 | Collaborator |Updated Readme  |

## Project Features

* Create custom to-do lists
* Add tasks
* Edit tasks
* Delete tasks
* Mark tasks as completed
* Manage tasks through a simple web interface

## Technologies Used

* HTML
* CSS
* JavaScript

## CI/CD Pipeline
A GitHub Actions workflow (`.github/workflows/ci-cd.yml`) runs automatically on every push or merge to `main`:
1. **Build:** builds the frontend and backend Docker images
2. **Test:** installs backend dependencies and checks `server.js`
3. **Push:** pushes both images to Docker Hub (credentials stored in GitHub Secrets)

Images are published on Docker Hub and can be deployed on SnapDeploy.

## Run and Deploy
- Run locally: `docker compose up --build`
- Add GitHub Secrets: `DOCKERHUB_USERNAME` and `DOCKERHUB_TOKEN`
- Push to `main`, and the pipeline builds and pushes the images automatically

## Changelog
- **2026-11-05:** Added GitHub Actions CI/CD workflow (build, test, push to Docker Hub)
- **2026-11-05:** Added CI/CD description and instructions to README
