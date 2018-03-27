pipeline {
  agent any
  stages {
    stage('Lint') {
      steps {
        sh 'npm run lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Publish Pacts') {
      steps {
        sh 'npm run publishPacts'
      }
    }
  }
}