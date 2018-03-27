pipeline {
  agent any
  stages {
    stage('Lint') {
      steps {
        sh 'npm lint'
      }
    }
    stage('Test') {
      steps {
        sh 'npm test'
      }
    }
    stage('Integration Test') {
      steps {
        sh 'npm run integrationTest'
      }
    }
    stage('Publish Pact') {
      steps {
        sh 'npm run publishPacts'
      }
    }
  }
}