pipeline {
    agent any

    environment {
        IMAGE_NAME = 'seemab00/todo-frontend' 
        DOCKERHUB  = credentials('dockerhub-creds') 
        // Aapka Sahi Docker Path
        DOCKER_EXE = 'C:\\Users\\Administrator\\AppData\\Local\\Programs\\DockerDesktop\\resources\\bin\\docker.exe'
    }

    stages {
        stage('Pull Code from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/Komal-atif/Todo-list.git' 
            }
        }
        
        stage('Build Docker Image') {
            steps {
                bat "\"${env.DOCKER_EXE}\" build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest ."
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                bat "echo %DOCKERHUB_PSW% | \"${env.DOCKER_EXE}\" login -u %DOCKERHUB_USR% --password-stdin"
                bat "\"${env.DOCKER_EXE}\" push %IMAGE_NAME%:%BUILD_NUMBER%"
                bat "\"${env.DOCKER_EXE}\" push %IMAGE_NAME%:latest"
            }
        }
    }
    
    post {
        always { 
            bat "\"${env.DOCKER_EXE}\" logout" 
        }
        success { 
            echo 'Pipeline successful' 
        }
        failure { 
            echo 'Pipeline failed' 
        }
    }
}
