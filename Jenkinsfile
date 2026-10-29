pipeline {
    agent any

    environment {
        IMAGE_NAME = 'seemab00/todo-frontend' // Yahan apna Docker Hub username/image name likhein
        DOCKERHUB  = credentials('dockerhub-creds') // Step 2 wali ID
    }

    stages {
        stage('Pull Code from GitHub') {
            steps {
                git branch: 'main', url: 'https://github.com/AAPKA_USERNAME/AAPKI_REPO.git' // Yahan apni repo ka URL dalein
            }
        }
        
        stage('Build Docker Image') {
            steps {
                sh 'docker build -t $IMAGE_NAME:$BUILD_NUMBER -t $IMAGE_NAME:latest .'
            }
        }
        
        stage('Push to Docker Hub') {
            steps {
                sh 'echo $DOCKERHUB_PSW | docker login -u $DOCKERHUB_USR --password-stdin'
                sh 'docker push $IMAGE_NAME:$BUILD_NUMBER'
                sh 'docker push $IMAGE_NAME:latest'
            }
        }
    }
    
    post {
        always { sh 'docker logout' }
        success { echo 'Pipeline successful' }
        failure { echo 'Pipeline failed' }
    }
}
