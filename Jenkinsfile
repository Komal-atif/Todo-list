pipeline {
    agent any

    environment {
        IMAGE_NAME = 'seemab00/todo-frontend' // Apna Docker Hub username/image name likhein
        DOCKERHUB  = credentials('dockerhub-creds') 
    }

    stages {
        stage('Pull Code from GitHub') {
            steps {
                // Galti 1 theek ki: Asli URL dala hai
                git branch: 'main', url: 'https://github.com/Komal-atif/Todo-list.git' 
            }
        }
        
        stage('Build Docker Image') {
            steps {
                // Galti 2 theek ki: sh ki jagah bat use kiya (Windows ke liye)
                bat 'docker build -t %IMAGE_NAME%:%BUILD_NUMBER% -t %IMAGE_NAME%:latest .'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                // Galti 2 theek ki: sh ki jagah bat use kiya, aur Windows variables ka format use kiya
                bat 'echo %DOCKERHUB_PSW% | docker login -u %DOCKERHUB_USR% --password-stdin'
                bat 'docker push %IMAGE_NAME%:%BUILD_NUMBER%'
                bat 'docker push %IMAGE_NAME%:latest'
            }
        }
    }
    
    post {
        always { 
            bat 'docker logout' 
        }
        success { 
            echo 'Pipeline successful' 
        }
        failure { 
            echo 'Pipeline failed' 
        }
    }
}
